import { UserEntity } from 'src/user/entities/user.entity';
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
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { TaskListEntity } from "./taskList.entity";

@Entity("taskDetails")
export class TaskEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  taskItemId:number

  //任务名称
  @Column("text")
  taskItemName: string;

  // 是否完成
  @Column("boolean",{default:false})
  isComplated: boolean;
  
  // 是否被标记
  @Column("boolean",{default:false})
  isMarked: boolean;

  //用户id
  @ManyToOne(()=>UserEntity,(user)=>user.taskItemId)
  userId: number;

  //taskid
  @ManyToOne(()=>TaskListEntity,(task)=>task.taskId)
  taskId: number;

  // 父级元素删除，自己也要跟随删除
  @ManyToOne(()=>TaskListEntity,{
    onDelete:"CASCADE"
  })
  taskNameList:TaskListEntity
}
