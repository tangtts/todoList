import { CreateUserDTO } from "./../dtos/create-user.dto";
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import UserService from "../services/user.service";
import { LoginDTO } from "../dtos/login-user.dto";
import { AuthGuard } from "src/shared/guard/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadDTO } from "../dtos/upload.dto";
import { UpdateUserDTO } from "../dtos/update-user.dto";
import { SearchUserDTO } from "../dtos/search-user.dto";


import * as multer from "multer";
import * as fs from 'fs';
import * as path from "path";
import { log } from "console";
import { join } from "path";

@ApiTags("用户模块")
@Controller("user")
export default class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({
    summary: "用户注册",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateUserDTO,
  })
  @Post("register")
  register(@Body() user: CreateUserDTO) {
    return this.userService.register(user);
  }

  @ApiOperation({
    summary: "用户登录",
  })
  @Post("login")
  login(@Body() login: LoginDTO) {
    return this.userService.login(login);
  }

  @ApiBearerAuth("JWT")
  @ApiOperation({
    summary: "用户信息",
  })
  @Get("info")
  @UseGuards(AuthGuard)
  info(@Req() req: any) {
    const token = req.user.id;
    return this.userService.info(token);
  }

  /**
   *
   * @description 更新用户
   * @param {*} req
   * @param {UpdateUserDTO} updateUserDTO
   * @return {*}
   * @memberof UserController
   */
  @ApiBearerAuth("JWT")
  @ApiOperation({
    summary: "更新用户",
  })
  @Post("update")
  @UseGuards(AuthGuard)
  update(@Request() req, @Body() updateUserDTO: UpdateUserDTO) {
    const token = req.user.id;
    return this.userService.update(token, updateUserDTO);
  }

  
  @ApiOperation({
    summary: "上传头像",
  })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileInterceptor("file",)
  )
  @Post("upload")
  async upload(
    @Req() req: UploadDTO,
    @Body() uploadDTO: UploadDTO,
    @UploadedFile() file:Express.Multer.File
  ) {
    return await this.userService.uploadAvatar(file);
  }
}
