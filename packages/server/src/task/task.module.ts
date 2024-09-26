import { TaskService } from '../task/services/task.service';
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import TaskController from "./controllers/task.controller";
import { TaskListEntity } from '../task/entities/taskList.entity';
import { UserTaskEntity } from './entities/user_task.entity';
import { TaskListItemEntity } from './entities/task_item';
import { TaskItemEntity } from './entities/item.entity';
import { UserEntity } from 'src/user/entities/user.entity';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      UserEntity, 
      TaskListEntity,
      UserTaskEntity,
      TaskListItemEntity,
      TaskItemEntity
    ]),
  ],
  controllers: [TaskController],
  providers:[TaskService],
})
export class TaskModule {}