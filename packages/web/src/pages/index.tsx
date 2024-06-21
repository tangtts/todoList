import React, { useEffect, useRef, useState } from "react"
import Search from "antd/es/input/Search";
import { Divider, Dropdown, Input, InputRef, MenuProps, message } from "antd";
import { ISideItem, ITaskItem, ITaskSide } from "../types";
import { ArrowDownOutlined, ArrowRightOutlined, CalendarTwoTone, CheckCircleOutlined, ClockCircleOutlined, PlusOutlined, StarFilled, StarOutlined, ToolFilled } from "@ant-design/icons";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  deleteTaskList,
  fetchAddTask,
  fetchChangeTaskMarked, fetchChangeTaskStatus, fetchComplatedTask,
  fetchMarkedTask, deleteOneTask, fetchAddTaskItem, fetchFindAllTaskItem, fetchAllTask
} from "../request/task"
type ISideChoose = Pick<ITaskSide, 'id' | "taskName">
const IndexPage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  // 初始化
  const init = () => {
    fetchTaskList()
    fetchComplatedList()
    fetchMarkedList()
  }

  useEffect(() => {
    init()
  }, [])


  // 侧边
  const [sideList, setSideList] = useState<ITaskSide[]>([]);

  // 设置单个item
  const [toDoData, setToDoData] = useState<ITaskItem[]>([])
  const [doneData, setDoneData] = useState<ITaskItem[]>([])

  const [chooseTask, setChooseTask] = useState<ISideChoose>();
  // 在标记的时候不需要使用动画
  const [useAnimate, setUseAnimate] = useState<boolean>(true)
  const [complatedCount, setComplatedCount] = useState<number>(0)
  const [markedCount, setMarkedCount] = useState<number>(0)


  // 输入框的任务名
  const [taskItemName, setItemTaskName] = useState('')

  // 已完成 汉字翻转
  const [isFold, setFold] = useState(false)
  // 每一个side 的输入框
  const inputRef = useRef<InputRef>(null)
  // 侧边输入框状态
  const [sideInputStatus, setSideInputStatus] = useState(false)

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

  /**
   *
   * 查询侧边任务
   * @param {string} [taskName='']
   */
  function fetchTaskList(taskName = '') {
    fetchAllTask({ taskName }).then(res => {
      if (res.code == 200) {
        setSideList(res.data)
      }
    });
  }



  const handleMenuClick = (e, taskId) => {
    if (e.key == 1) {
      deleteTaskList({ taskId }).then(res => {
        if (res.code == 200) {
          init()
        }
      })
    } else if (e.key == 2) {
      setSideInputStatus(true)
      inputRef.current?.focus({
        cursor: 'end'
      })
    }
  }

  /**
   *
   * 选择侧边的一个
   * @param {ISideChoose} task
   */
  const menuClick = (task: ISideChoose) => {
    console.log("🚀 ~ menuClick ~ task:", task);
    setChooseTask(task)
    getFilterTask()
  }


  // 起始列表第一项
  const index = useRef(0);
  const addList = () => {
    let o = {
      taskName: `任务列表${index.current++}`,
    };
    fetchAddTask(o).then(res => {
      if (res.code == 200) {
        // 重新调一次获取所有侧边
        fetchTaskList()
      }
    });
  };


  function checkShouldOperate() {
    if (chooseTask?.id) {
      return ![1, 2].includes(chooseTask?.id)
    }
    return true
  }




  /**
   *
   * 删除一个 item
   * @param {*} taskItemId
   */
  const handleTodoItemClick = (taskItemId) => {
    if (!checkShouldOperate()) return
    deleteOneTask({ taskItemId }).then(res => {
      if (res.code == 200) {
        getFilterTask()
        init()

      }
    })
  }

  /**
   *
   * 切换 单个item 的完成状态
   * @param {ITaskItem} chosenItem
   */
  const changeStatus = (
    chosenItem: Pick<ITaskItem, 'isComplated' | 'isMarked' | 'id'>,
    type: "complated" | 'marked'
  ) => {
    // if (!checkShouldOperate()) return
    setUseAnimate(true)
    fetchChangeTaskStatus({
      id: chosenItem.id,
      isComplated: type == "complated" ? !chosenItem.isComplated : chosenItem.isComplated,
      isMarked: type == "marked" ? !chosenItem.isMarked : chosenItem.isMarked,
    }).then(res => {
      if (res.code == 200) {
        getFilterTask()
      }
    })
  }

  useEffect(() => {
    if (checkShouldOperate()) {
      getFilterTask()
    }
  }, [
    chooseTask?.id
  ])

  /**
  * @description 根据id获取对应的最新右边task
  */
  const getFilterTask = () => {
    console.log("🚀 ~ getFilterTask ~ chooseTask:", chooseTask);
    if (!chooseTask?.id) return;
    fetchFindAllTaskItem({ taskId: chooseTask.id }).then(res => {
      if (res.code == 200) {
        const data = res.data;
        setToDoData(data.filter(item => !item.isComplated))
        setDoneData(data.filter(item => item.isComplated))
      }
    })
  }

  /**
 * @description 新增任务
 */
  const addTaskItem = () => {
    if (!taskItemName.trim()) {
      return messageApi.open({
        type: 'warning',
        content: '请输入任务名称！',
      });
    }

    if (chooseTask?.id) {
      fetchAddTaskItem({
        taskItemName,
        taskId: chooseTask?.id
      }).then(res => {
        if (res.code == 200) {
          // 获取最新的任务列表
          getFilterTask()
          
          // 更新侧边
          fetchTaskList()
          // 更新侧边栏
          setItemTaskName('')
        }
      })
    }
  }

  const fetchComplatedList = () => {
    // 应该初始化是完成
    fetchComplatedTask().then(res => {
      setChooseTask({
        id: 1,
        taskName: "完成"
      })
      // 当点击完成时，todoData清空
      setToDoData([])
      setDoneData(res.data.tasks)
      setComplatedCount(res.data.total)
    })
  }

  const fetchMarkedList = (isClick = false) => {
    if (isClick) {
      fetchMarkedTask().then(res => {
        setChooseTask({
          id: 2,
          taskName: "标记"
        })
        setToDoData([])
        setDoneData(res.data.tasks)
        setMarkedCount(res.data.total)
      })
    } else {
      fetchMarkedTask().then(res => {
        setMarkedCount(res.data.total)
      })
    }
  }


  const blur = (e: React.FocusEvent<HTMLInputElement, Element>, todo: ISideChoose) => {
    setSideInputStatus(false)
  }

  const enter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setSideInputStatus(true)
  }

  return (
    <div className="h-full flex">
      <div className="w-30 bg-[#f4f4f4] py-5 px-4 relative">
        <Search
          placeholder="input search text"
          size="large"
          allowClear
          onSearch={(taskName) => fetchTaskList(taskName)}
        />
        <Divider className="divider"></Divider>

        <div>
          {/* 已完成 */}
          <div className="side"
            style={{
              backgroundColor:
                chooseTask?.id == 1 ?
                  'rgb(96 165 250)' :
                  "rgb(191,219,254)"
            }}
            onClick={() => fetchComplatedList()}
          >
            <div className="w-[4px] h-4/5 mr-2 bg-blue-300 rounded-md"></div>
            <div className="flex items-center">
              <CalendarTwoTone />
              <p className="ml-4">已完成</p>
            </div>
            <span className="bg-gray-200 ml-auto mr-2 rounded-full flex items-center justify-center w-6 font-thin aspect-square">
              {complatedCount}</span>
          </div>

          {/* 标记 */}
          <div className="side"
            style={{
              backgroundColor:
                chooseTask?.id == 2 ?
                  'rgb(96 165 250)' :
                  "rgb(191,219,254)"
            }}
            onClick={() => fetchMarkedList(true)}
          >
            <div className="w-[4px] h-4/5 mr-2 bg-blue-300 rounded-md"></div>
            <div className="flex items-center">
              <CalendarTwoTone />
              <p className="ml-4">标记</p>
            </div>
            <span className="bg-gray-200 ml-auto mr-2 rounded-full flex items-center justify-center w-6 font-thin aspect-square">
              {markedCount}</span>
          </div>


          <Divider className="divider"></Divider>
          {/* 任务列表 */}
          <div>
            <TransitionGroup>
              {sideList?.map((todo,index) => (
                <CSSTransition
                  key={index}
                  timeout={500}
                  classNames="translateY">
                  <>
                    <Dropdown
                      menu={{
                        items: menuSide,
                        onClick: (e) => handleMenuClick(e, todo.id)
                      }}
                      trigger={['contextMenu']}>
                      <div className="side"
                        style={{
                          backgroundColor:
                            chooseTask?.id == todo.id ?
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
                            sideInputStatus
                              ? <Input defaultValue={todo.taskName} onPressEnter={(e) => enter(e)} onBlur={(e) => blur(e, todo)} ref={inputRef}></Input>
                              : <p className="ml-4">{todo.taskName}</p>
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
            onClick={addList}>
            <PlusOutlined />
            <span className="ml-2">新建列表</span>
          </div>
        </div>
      </div>
      {/* 右侧 */}
      <div className="flex-1">
        {contextHolder}
        <div className="bg-[#5f73c1] p-8 flex flex-col h-full rounded-md">
          <header className="text-white text-2xl">{chooseTask?.taskName}</header>
          <main>
            {/* todoData */}
            <TransitionGroup>   {
              toDoData.map(todo => {
                return <CSSTransition
                  timeout={500}
                  classNames={useAnimate ? 'toggleVisable' : ''}
                  key={todo.taskItemId}>
                  <Dropdown menu={{
                    items: [
                      {
                        label: '删除',
                        key: '1',
                      }
                    ], onClick: () => handleTodoItemClick(todo.taskItemId),
                    disabled: !checkShouldOperate()
                  }} trigger={['contextMenu']}>
                    <div
                      className="taskItem"
                    >
                      {/* 左边的圆球 */}
                      <div >
                        {
                          todo.isComplated ? <CheckCircleOutlined /> : <ClockCircleOutlined />
                        }
                      </div>
                      <p className="ml-4 flex-1"
                        onClick={() => changeStatus(todo, 'complated')}
                      >{todo.taskItemName}</p>

                      <div className="ml-auto"
                        onClick={(e) => {
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
                  <header className="ml-4">已完成({doneData.length})</header>
                </div>
              }

              <TransitionGroup>
                {!isFold &&
                  doneData.map(done => {
                    return (

                      <CSSTransition
                        timeout={500}
                        classNames={useAnimate ? 'toggleVisable' : ''}
                        key={done.taskItemId}>
                        <Dropdown menu={{
                          items: [
                            {
                              label: '删除',
                              key: '1',
                            }
                          ], onClick: () => handleTodoItemClick(done.taskItemId), disabled: !checkShouldOperate()
                        }} trigger={['contextMenu']}>
                          <div
                            className="taskItem"
                          >
                            {/* 左边的圆球 */}
                            <div className="">
                              {
                                done.isComplated ? <CheckCircleOutlined /> : <ClockCircleOutlined />
                              }
                            </div>
                            <p className="ml-4 flex-1 leading-10"
                              onClick={() => changeStatus(done, 'complated')}
                            >{done.taskItemName}</p>

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
              <Input size="large" value={taskItemName}
                onChange={(e) => setItemTaskName(e.target.value)}
                onPressEnter={addTaskItem}></Input>
            </footer>
          }
        </div>
      </div>
    </div>
  )
}


export default IndexPage
