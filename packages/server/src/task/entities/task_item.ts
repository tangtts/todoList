
import { CommonEntity } from "src/shared/entities/common.entiry";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 侧边list 关联与item
@Entity("task_list_item")
export class TaskListItemEntity extends CommonEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: "侧边taskId",
  })
  taskId: number;

  @Column({
    comment: "具体任务列表id",
  })
  taskItemId: number;
}