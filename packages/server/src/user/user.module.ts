import { TaskService } from '../task/services/task.service';
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserController from "./controllers/user.controller";
import { UserEntity } from "./entities/user.entity";
import UserService from "./services/user.service";
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret,jwtSignOptions } from "src/constants";
import { UploadService } from "src/shared/upload/upload.service";
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: jwtSecret,
      signOptions:jwtSignOptions,
    })
  ],
  controllers: [UserController],
  providers:[UserService,UploadService],
})
export class UserModule {}