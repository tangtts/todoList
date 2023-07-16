import { CommonEntity } from "src/shared/entities/common.entiry";
import {
  Entity,
  Column,
  Unique,
  UpdateDateColumn,
  ObjectIdColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ObjectID,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { TaskEntity } from "./task.entity";
import { UserEntity } from "./user.entity";

@Entity("taskList")
export class TaskListEntity extends CommonEntity {
  // 所属任务id
  @PrimaryGeneratedColumn()
  taskId: number;

  // //用户关联
  @ManyToOne(()=>UserEntity,(task)=>task.taskList)
  user: UserEntity;


  @Column({nullable: true})
  userId:number

  //任务名称
  @Column({
    // unique:true
  })
  taskName: string;

  // 一个侧边栏有很多小的项目
  @OneToMany(() => TaskEntity, task => task.taskNameList, {
    cascade: true,
    onDelete:"CASCADE"
  })
  taskItemList: TaskEntity[];
}
