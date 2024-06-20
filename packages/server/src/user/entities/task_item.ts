
import { CommonEntity } from "src/shared/entities/common.entiry";
import { Column, Entity } from "typeorm";

// user 表与侧边list 关联表
@Entity("taskList_item")
export class TaskList_ItemEntity extends CommonEntity {
  @Column({
    type: "varchar",
    length: 50,
    comment: "侧边taskId",
  })
  taskId: string;

  @Column({
    type: "varchar",
    length: 50,
    comment: "具体任务列表",
  })
  taskItemId: string;
}