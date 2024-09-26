
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

@Entity("user_task")
export class UserTaskEntity extends CommonEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    comment: "所属任务id"
  })
  taskId: number;

  @Column({
    nullable: false,
    comment: "用户id"
  })
  userId: number;
}
