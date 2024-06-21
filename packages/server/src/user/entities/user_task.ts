import { generatePrime } from "crypto";
import { CommonEntity } from "src/shared/entities/common.entiry";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// user 表与侧边list 关联表
@Entity("user_taskList")
export class User_TaskListEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;



  @Column({
    type: "varchar",
    length: 50,
    comment: "用户id",
  })
  userId: string;

  @Column({
    type: "varchar",
    length: 50,
    comment: "侧边taskId",
  })
  taskId: string;
}
