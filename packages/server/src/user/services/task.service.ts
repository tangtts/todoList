import { UpdateTodoDTO } from "./../dtos/todo.update.dto";
import { TaskListEntity } from "./../entities/taskList.entity";
import { TaskEntity } from "./../entities/task.entity";
import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, MongoRepository } from "typeorm";
import { TodoDTO } from "../dtos/todo.dto";
import { UserEntity } from "../entities/user.entity";
import { ObjectId } from "mongodb";
import { TaskItemDTO } from "../dtos/task-item.dto";
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: MongoRepository<UserEntity>,

    @InjectRepository(TaskEntity)
    private readonly taskRepository: MongoRepository<TaskEntity>,

    @InjectRepository(TaskListEntity)
    private readonly taskListRepository: MongoRepository<TaskListEntity>
  ) {}

  // 添加侧边属性
  async addTask(userId, taskName: string): Promise<TaskListEntity> {
    let t = new TaskListEntity();
    t.taskName = taskName;
    t.userId = userId;
    await this.taskListRepository.save(t);
    return t;
  }

  /**
   *
   * @description 添加侧边栏任务
   * @memberof TaskService
   */
  async addTaskItem(userId, todoItem: TodoDTO) {
    const taskEntity = new TaskEntity();
    taskEntity.taskId = todoItem.taskId;
    taskEntity.taskItemName = todoItem.taskName;
    taskEntity.userId = userId;

    const taskListEntity = await this.taskListRepository.findOne({
      where: { taskId: todoItem.taskId },
      relations: ["taskItemList"],
    });

    if (taskListEntity.taskItemList) {
      taskListEntity.taskItemList.push(taskEntity);
    } else {
      taskListEntity.taskItemList = [taskEntity];
    }

    await this.taskListRepository.save(taskListEntity);
    return await this.taskRepository.save(taskEntity);
  }

  /**
   *
   * @description 根据 id 找到所有的任务
   * @param {number} taskId
   * @memberof TaskService
   */
  async findAllTaskItem(taskId) {
    let f = await this.taskListRepository.findOne({
      where: { taskId },
      relations: ["taskItemList"],
    });
    return f.taskItemList;
  }

  async filterTask(taskName) {
    // let obj = [];
    // const taskList = await this.taskListRepository.findBy({
    //   taskName: Like(`%${taskName}`),
    // });

    // for await (const task of taskList) {
    //   let t = await this.taskRepository.find({
    //     where: {
    //       taskId: task.taskId,
    //     },
    //   });
    //   obj.push({ ...task, taskLength: t.length });
    // }

    // console.log(obj);

    const taskList = await this.taskListRepository
      .createQueryBuilder("taskList")
      .leftJoinAndSelect("taskList.taskItemList", "taskItem")
      .where("taskList.taskName LIKE :taskName", { taskName: `%${taskName}%` })
      .getMany();

    const promises = taskList.map(async task => {
      const taskLength = task.taskItemList.length;
      return { ...task, taskLength };
    });

    const obj = await Promise.all(promises);
    return obj;
  }

  /**
   *
   * @description 获取已经完成的
   * @param {string} userId
   * @return {*}
   * @memberof TaskService
   */
  async getAllComplated(userId: string) {
    let [tasks, count] = await this.taskRepository.findAndCount({
      where: {
        isComplated: true,
      },
    });
    return {
      tasks,
      total: count,
    };
  }

  /**
   *
   * @description 获取被标记的
   * @param {string} userId
   * @return {*}
   * @memberof TaskService
   */
  async getAllMarked(userId: string) {
    let [tasks, count] = await this.taskRepository.findAndCount({
      where: {
        isMarked: true,
      },
    });
    return {
      tasks,
      total: count,
    };
  }

  async deleteOneTask(taskItemId: number = 26) {
    let r = await this.taskRepository.delete(taskItemId)
    return r.affected == 1
  }

  async deleteTaskList(taskId: number = 1) {
    let r = await this.taskListRepository.delete({ taskId });
    return r.affected == 1;
  }

  async updateTaskList(userId: number, todoItem: TaskItemDTO) {
    let r = await this.taskListRepository.update(todoItem.taskId, {
      taskName: todoItem.txt,
    });
    return r.affected == 1;
  }

  async updateTaskItem(userId: number, todoItem: any) {
    let r = await this.taskRepository.update(todoItem.taskItemId, {
      isComplated: todoItem.isComplated,
      isMarked: todoItem.isMarked,
    });
    return r.affected == 1;
  }
}
