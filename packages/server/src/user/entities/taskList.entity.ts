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
  @PrimaryGeneratedColumn("uuid")
  taskId: string;

  //任务名称
  @Column({
    nullable: false
  })
  taskName: string;
}
