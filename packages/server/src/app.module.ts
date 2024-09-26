import { Module } from '@nestjs/common';
import {UserModule} from './user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configModuleOptions } from './configs/module-options';
import { UserEntity } from './user/entities/user.entity';
import { TaskListEntity } from './task/entities/taskList.entity';
import { TaskModule } from './task/task.module';
import { TaskItemEntity } from './task/entities/item.entity';
import { TaskListItemEntity } from './task/entities/task_item';
import { UserTaskEntity } from './task/entities/user_task.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ 
    UserModule,
    TaskModule,
   JwtModule.register({
    global:true,
    secret: 'secret', // 密钥
    signOptions: { expiresIn: '30d' } // 过期时间
   }),
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      password: "123456",
      logging:false,
      database: "todo",
      entities: [
        UserEntity,
        TaskListEntity,
        TaskItemEntity,
        TaskListItemEntity,
        UserTaskEntity
      ],
      synchronize: true,
    }),
  ], 
  controllers: [],
  providers: [], 
})
export class AppModule {}