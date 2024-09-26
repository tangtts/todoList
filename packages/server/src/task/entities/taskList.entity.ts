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

@Entity("task_list")
export class TaskListEntity extends CommonEntity {
  // 所属任务id
  @PrimaryGeneratedColumn()
  id: number;

  //任务名称
  @Column({
    nullable: false
  })
  taskName: string;
}
