import { UpdateTodoDTO } from "./../dtos/todo.update.dto";
import { TaskListEntity } from "../entities/taskList.entity";
import { TaskItemEntity } from "../entities/item.entity";
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, MongoRepository } from "typeorm";
import { TodoItemDTO } from "../dtos/Item.dto";
import { UserEntity } from "../../user/entities/user.entity";
import { ObjectId } from "mongodb";
import { UserTaskEntity } from "../entities/user_task.entity";
import { TaskListItemEntity } from "../entities/task_item";
import { TaskListItemDTO } from "../dtos/taskListItem.dto";
import { UpdateTaskListItemDTO } from "../dtos/taskListItem.update.dto";
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: MongoRepository<UserEntity>,

    @InjectRepository(TaskListEntity)
    private readonly taskListRepository: MongoRepository<TaskListEntity>,

    @InjectRepository(UserTaskEntity)
    private readonly userTaskEntityRepository: MongoRepository<UserTaskEntity>,

    @InjectRepository(TaskListItemEntity)
    private readonly taskListItemEntityRepository: MongoRepository<TaskListItemEntity>,


    @InjectRepository(TaskItemEntity)
    private readonly taskItemEntityRepository: MongoRepository<TaskItemEntity>

  ) { }



  // 添加侧边属性
  async addTask(userId: number, taskName: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { userId },
    });

    if (!user) {
      throw new NotFoundException("用户不存在");
    }

    // 保存到list_item表中
    let t1 = new TaskListEntity()
    t1.taskName = taskName;
    let r = await this.taskListRepository.save(t1);

    // 保存到 user_task 中
    let t = new UserTaskEntity();
    t.userId = userId;
    t.taskId = r.id;


    await this.userTaskEntityRepository.save(t);

    return "success"
  }

  /**
   *
   * @description 根据分组添加到子任务
   * @memberof TaskService
   */
  async addTaskItem(userId, todoItem: TodoItemDTO): Promise<string> {

    const taskEntity = new TaskItemEntity();
    taskEntity.taskItemName = todoItem.taskItemName;

    let r = await this.taskItemEntityRepository.save(taskEntity);

    // 保存到list_item表中
    let t = new TaskListItemEntity();
    t.taskId = todoItem.taskId;
    t.taskItemId = r.id;

    await this.taskListItemEntityRepository.save(t);
    return "success"
  }

  /**
   *
   * @description 根据 taskid 找到所有的任务
   * @param {number} taskId
   * @memberof TaskService
   */
  async findAllTaskItem(taskId: number) {
    const taskList = await this.taskListItemEntityRepository.findBy({
      taskId,
    });
    let res = [];
    for (const iterator of taskList) {
      let r = await this.taskItemEntityRepository.findOneBy({
        id: iterator.taskItemId
      });
      res.push(r);
    }
    return res;
  }

  /**
  *
  * @description 根据 taskName 找到所有的任务
  * @param {string} taskName
  * @memberof TaskService
  */
  async searchTask(userId: number, taskName: string) {
    let taskList = await this.taskListRepository.find({
      where: {
        userId,
        taskName: Like(`%${taskName}%`)
      }
    })
    return taskList;
  }

  /**
   * @description 获取所有的任务
   * @param {number} userId
   * @return {*} 
   * @memberof TaskService
   */
  async getAllTask(userId: number) {
    let r = await this.userTaskEntityRepository.find({
      where: {
        userId
      },
    });
    let res: any[] = [];
    for (const iterator of r) {
      let t = await this.taskListRepository.findOneBy({
        id: iterator.taskId
      })
      let count = await this.taskListItemEntityRepository.countBy({
        taskId: t.id
      });
      console.log(count, "count")
      res.push({
        ...t,
        count
      })
    }
    return res;
  }

  /**
   *
   * @description 获取已经完成的
   * @param {string} userId
   * @return {*}
   * @memberof TaskService
   */
  async getAllComplated(userId: number) {
    let [tasks, count] = await this.userTaskEntityRepository.findAndCount({
      where: {
        userId,
      },
    });
    return {
      tasks,
      total: count,
    };
  }

  /**
   * @description 获取被标记的
   * @param {string} userId
   * @memberof TaskService
   */
  async getAllMarked(userId: number) {
    let [tasks, count] = await this.userTaskEntityRepository.find({
      where: {
        userId,
      },
    });
    console.log(tasks)

    return {
      tasks,
      total: count,
    };
  }


  /**
   * @description 更新任务
   * @param {number} userId
   * @param {*} todoItem
   * @memberof TaskService
   */
  async updateTaskItem(todoItem: UpdateTodoDTO) {

    // 更新item 表
    let r = await this.taskItemEntityRepository.update(todoItem.id, {
      isComplated: todoItem.isComplated,
      isMarked: todoItem.isMarked,
    });
    if (r.affected == 1) {
      return "success"
    } else {
      throw new HttpException("更新失败", HttpStatus.BAD_REQUEST);
    }
  }


  /**
   * @description 删除某一项具体任务
   * @param {number} [taskItemId=26]
   * @return {*} 
   * @memberof TaskService
   */
  async deleteOneTask(taskItemId: number) {
    let r = await this.taskItemEntityRepository.delete({ id: taskItemId })
    // 关联表删除
    this.taskListItemEntityRepository.delete({ taskItemId });
    return r.affected == 1
  }

  /**
   * @description 删除任务组
   * @param {number} taskId
   * @return {*} 
   * @memberof TaskService
   */
  async deleteTaskList(taskId: number) {
    let r = await this.taskListRepository.delete({ id: taskId });
    // 用户关联表删除
    await this.userTaskEntityRepository.delete({ taskId });
    return r.affected == 1;
  }


  async updateTaskList(todoItem: UpdateTaskListItemDTO) {
    let r = await this.taskListRepository.update(todoItem.id, {
      taskName: todoItem.taskName,
    });
    return r.affected == 1;
  }

}
