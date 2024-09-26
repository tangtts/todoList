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

@Entity("item")
export class TaskItemEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "varchar",
    length: 50,
    comment: "任务名称"
  })
  taskItemName: string;

  // 是否完成
  @Column({
    type: "boolean",
    default: false,
    comment: "是否完成"
  })
  isComplated: boolean;

  @Column({
    type: "boolean",
    default: false,
    comment: "是否被标记"
  })
  isMarked: boolean;
}
