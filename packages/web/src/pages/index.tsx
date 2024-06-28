import React, { useEffect, useRef, useState } from "react"
import Search from "antd/es/input/Search";
import { Button, Divider, Dropdown, Input, InputRef, MenuProps, Space, message, } from "antd";
import { Spin } from "antd";
import { ISideItem, ITodo, IGroup } from "../types";
import { ArrowDownOutlined, ArrowRightOutlined, CalendarTwoTone, CheckCircleOutlined, ClockCircleOutlined, PlusOutlined, StarFilled, StarOutlined, ToolFilled } from "@ant-design/icons";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  deleteOneGroup,
  fetchAddTask,
  fetchAllMarked, fetchChangeStatus,
  deleteOneTodo, fetchAddTaskItem, fetchFindAllTaskItem, fetchGroup,
  fetchAllComplete
} from "../request/task"

type IGroupChoose = Pick<IGroup, 'groupId' | "groupName">;

const IndexPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    getGroup()
    // 获取所有已完成任务
    getAllComplete(true)
    getAllMarked(true)
  }, [])

  const menuSide: MenuProps['items'] = [
    {
      label: '修改',
      key: '2',
    },
    {
      label: '删除',
      key: '1',
    }
  ];

  // 侧边todoGroup
  const [group, setGroup] = useState<IGroup[]>([]);

  const [toDoData, setToDoData] = useState<ITodo[]>([])
  // 选择的哪个任务
  const [chooseTask, setChooseTask] = useState<IGroupChoose>();
  // 在标记的时候不需要使用动画
  const [useAnimate, setUseAnimate] = useState(true)

  const [completeCount, setCompleteCount] = useState(0)
  const [markedCount, setMarkedCount] = useState(0)
  
  const [loading, setLoadiong] = useState<boolean>(false)

  // 输入框的任务名
  const [todoContent, setTodoContent] = useState('')
  // 分组名
  const [groupName, setGroupName] = useState('')
  // 已完成 汉字翻转
  const [isFold, setFold] = useState(false)
  // 每一个side 的输入框
  const inputRef = useRef<InputRef>(null)
  // 侧边输入框状态
  const [groupInputStatus, setGroupInputStatus] = useState(false)

  /**
   *
   * 查询分组任务
   * @param {string} [groupName='']
   */
  function getGroup(groupName: string = '') {
    fetchGroup({ groupName }).then(res => {
      if (res.code == 200) {
        setGroup(res.data)
      }
    });
  }

  //  如果是 初始化，无需调用todo,只需要获取数量
  //  如果是 点击分组，需要调用todo
  function getAllComplete(isInit = false) {
    fetchAllComplete().then(res => {
      if (res.code == 200) {
        if (isInit) {
          setToDoData(res.data)
        }
        setCompleteCount(res.data.length)
      }
    })
  }

 
  function getAllMarked(isInit = false) {
    fetchAllMarked().then(res => {
      if (res.code == 200) {
        if (isInit) {
          setToDoData(res.data)
        }
        setMarkedCount(res.data.length)
      }
    })
  }





  const handleMenuClick = (e, groupId: number, index: number) => {
    if (e.key == 1) {
      deleteOneGroup({ groupId }).then(res => {
        if (res.code == 200) {
          messageApi.success('删除成功');
          getGroup()
          setToDoData([]);
          getAllComplete();
          // 如果还有分组，则直接跳转到下一个分组
          if (group.length) {
            setChooseTask({ groupId: group[index + 1].groupId, groupName: group[index + 1].groupName });
          }
        }
      })
    } else if (e.key == 2) {
      setGroupInputStatus(true)
      inputRef.current?.focus({
        cursor: 'end'
      })
    }
  }

  /**
   *
   * 选择分组
   * @param {IGroupChoose} task
   */
  const menuClick = (task: IGroupChoose) => {
    setChooseTask(task)
  }

  const addGroup = () => {
    fetchAddTask({ groupName }).then(res => {
      if (res.code == 200) {
        getGroup()
        setGroupName('')
      }
    });
  };


  function checkShouldOperate(): boolean {
    return true
  }

  /**
   *
   * 删除一个 item
   * @param {number} todoId
   */
  const handleTodoItemClick = (todoId: number) => {
    if (!checkShouldOperate()) return
    deleteOneTodo({ todoId }).then(res => {
      if (res.code == 200) {
        getTodoListByGroupId();
        getAllComplete()
        getGroup()
      }
    })
  }

  /**
   *
   * 切换 单个item 的完成状态
   * @param {ITodo} chosenItem
   */
  const changeStatus = (
    chosenItem: Pick<ITodo, 'isCompleted' | 'isMarked' | 'todoId'>,
    type: "completed" | 'marked'
  ) => {
    setUseAnimate(true)
    fetchChangeStatus({
      todoId: chosenItem.todoId,
      type: type == "completed" ? 1 : 2
    }).then(res => {
      if (res.code == 200) {
        getTodoListByGroupId()
        if(type == "completed"){
          getAllComplete()
        }else if(type == "marked") {
          getAllMarked()
        }
      }
    })
  }

  useEffect(() => {
    getTodoListByGroupId()
  }, [
    chooseTask?.groupId
  ])

  /**
  * @description 根据id获取对应的todo
  */
  const getTodoListByGroupId = () => {
    setLoadiong(true)
    if (!chooseTask?.groupId) return;
    fetchFindAllTaskItem({ groupId: chooseTask.groupId }).then(res => {
      if (res.code == 200) {
        const data = res.data;
        setToDoData(data);
      }
    }).finally(() => {
      setLoadiong(false)
    })
  }

  /**
 * @description 新增任务
 */
  const addTodo = () => {
    if (!todoContent.trim()) {
      return messageApi.open({
        type: 'warning',
        content: '请输入任务名称！',
      });
    }

    if (chooseTask?.groupId) {
      fetchAddTaskItem({
        todoContent: todoContent,
        groupId: chooseTask.groupId
      }).then(res => {
        if (res.code == 200) {
          // 获取最新的任务列表
          getTodoListByGroupId()
          // 更新侧边
          getGroup()
          // 更新侧边栏
          setTodoContent('')
        }
      })
    }
  }

  const blur = (e: React.FocusEvent<HTMLInputElement, Element>, todo: IGroupChoose) => {
    setGroupInputStatus(false)
  }

  const enter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setGroupInputStatus(true)
  }

  return (
    <div className="h-full flex">
      <div className="w-30 bg-[#f4f4f4] py-5 px-4 relative">
        <Search
          placeholder="input search text"
          size="large"
          allowClear
          onSearch={(taskName) => getGroup(taskName)}
        />
        <Divider className="divider"></Divider>

        <div>
          {/* 已完成 */}

          {/* style={{
              backgroundColor:
                chooseTask?.groupId == 1 ?
                  'rgb(96 165 250)' :
                  "rgb(191,219,254)"
            }} */}
          <div className="side"
            onClick={() => getAllComplete()}
          >
            <div className="w-[4px] h-4/5 mr-2 bg-blue-300 rounded-md"></div>
            <div className="flex items-center">
              <CalendarTwoTone />
              <p className="ml-4">已完成</p>
            </div>
            <span className="bg-gray-200 ml-auto mr-2 rounded-full flex items-center justify-center w-6 font-thin aspect-square">
              {completeCount}</span>
          </div>

          {/* 标记 */}
          <div className="side"
            style={{
              backgroundColor:
                chooseTask?.groupId == 2 ?
                  'rgb(96 165 250)' :
                  "rgb(191,219,254)"
            }}
            onClick={() => getAllMarked(true)}
          >
            <div className="w-[4px] h-4/5 mr-2 bg-blue-300 rounded-md"></div>
            <div className="flex items-center">
              <CalendarTwoTone />
              <p className="ml-4">标记</p>
            </div>
            <span className="bg-gray-200 ml-auto mr-2 rounded-full flex items-center justify-center w-6 font-thin aspect-square">
              {markedCount}
            </span>
          </div>


          <Divider className="divider"></Divider>
          {/* 任务列表 */}
          <div>
            <TransitionGroup>
              {group?.map((todo, index) => (
                <CSSTransition
                  key={index}
                  timeout={500}
                  classNames="translateY">
                  <>
                    <Dropdown
                      menu={{
                        items: menuSide,
                        onClick: (e) => handleMenuClick(e, todo.groupId, index)
                      }}
                      trigger={['contextMenu']}>
                      <div className="side"
                        style={{
                          backgroundColor:
                            chooseTask?.groupId == todo.groupId ?
                              'rgb(96 165 250)' :
                              "rgb(191,219,254)"
                        }}
                        onClick={() => menuClick(todo)}
                      >
                        <div className="w-[4px] h-4/5 mr-2 bg-blue-300 rounded-md">

                        </div>
                        <div className="flex items-center">
                          <CalendarTwoTone />
                          {
                            groupInputStatus
                              ? <Input defaultValue={todo.groupName} onPressEnter={(e) => enter(e)} onBlur={(e) => blur(e, todo)} ref={inputRef}></Input>
                              : <p className="ml-4">{todo.groupName}</p>
                          }
                        </div>
                        <span className="bg-gray-200 ml-auto mr-2 rounded-full flex items-center justify-center w-6 font-thin aspect-square">
                          {todo.count}</span>
                      </div>
                    </Dropdown>
                    <Divider className="divider"></Divider>
                  </>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
          {/* 尾部 */}
          <div
            className="addList"
          >
            <Space.Compact>
              <Input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                onPressEnter={addGroup}></Input>
              <Button className="bg-[#5f73c1]" type="primary" onClick={addGroup}>新建列表</Button>
            </Space.Compact>
          </div>
        </div>
      </div>
      {/* 右侧 */}
      <div className="flex-1">
        {contextHolder}

        <div className="bg-[#5f73c1] p-8 flex flex-col h-full rounded-md">
          <header className="text-white text-2xl">{chooseTask?.groupName}</header>
          <main>
            <TransitionGroup>   {
              toDoData.filter(item => item.isCompleted == 0).map(todo => {
                return <CSSTransition
                  timeout={500}
                  classNames={useAnimate ? 'toggleVisable' : ''}
                  key={todo.todoId}>
                  <Dropdown menu={{
                    items: [
                      {
                        label: '删除',
                        key: '1',
                      }
                    ], onClick: () => handleTodoItemClick(todo.todoId),
                    disabled: !checkShouldOperate()
                  }} trigger={['contextMenu']}>
                    <div
                      className="taskItem"
                    >
                      {/* 左边的圆球 */}
                      <div >
                        {
                          todo.isCompleted ? <CheckCircleOutlined /> : <ClockCircleOutlined />
                        }
                      </div>
                      <p className="ml-4 flex-1"
                        onClick={() => changeStatus(todo, 'completed')}
                      >{todo.todoContent}</p>

                      <div className="ml-auto"
                        onClick={() => {
                          changeStatus(todo, 'marked')
                        }}>
                        {
                          todo.isMarked ? <StarFilled /> : <StarOutlined />
                        }
                      </div>
                    </div>
                  </Dropdown>
                </CSSTransition>
              })
            }
            </TransitionGroup>

            {/* 中间的箭头 */}
            <div className="mt-4">
              {
                checkShouldOperate() && <div className="arrawContainer" onClick={() => setFold(!isFold)}>
                  {
                    isFold ? <ArrowRightOutlined className="text-xl" /> : <ArrowDownOutlined className="text-xl" />
                  }
                  <header className="ml-4">已完成({toDoData.filter(item => item.isCompleted == 1).length})</header>
                </div>
              }

              <TransitionGroup>
                {!isFold &&
                  toDoData.filter(item => item.isCompleted == 1).map(done => {
                    return (

                      <CSSTransition
                        timeout={500}
                        classNames={useAnimate ? 'toggleVisable' : ''}
                        key={done.todoId}>
                        <Dropdown menu={{
                          items: [
                            {
                              label: '删除',
                              key: '1',
                            }
                          ], onClick: () => handleTodoItemClick(done.todoId), disabled: !checkShouldOperate()
                        }} trigger={['contextMenu']}>
                          <div
                            className="taskItem"
                          >
                            <div className="">
                              {
                                done.isCompleted ? <CheckCircleOutlined /> : <ClockCircleOutlined />
                              }
                            </div>
                            <p className="ml-4 flex-1 leading-10"
                              onClick={() => changeStatus(done, 'completed')}
                            >{done.todoContent}</p>

                            <div className="ml-auto  px-4"
                              onClick={(e) => {
                                changeStatus(done, 'marked')
                              }}>
                              {
                                done.isMarked ? <StarFilled /> : <StarOutlined />
                              }
                            </div>
                          </div>
                        </Dropdown>
                      </CSSTransition>
                    )
                  })
                }
              </TransitionGroup>
            </div>
          </main>
          {
            <footer className="mt-auto">
              <Input size="large" value={todoContent}
                onChange={(e) => setTodoContent(e.target.value)}
                onPressEnter={addTodo}></Input>
            </footer>
          }
        </div>
      </div>
    </div>
  )
}
export default IndexPage
