import { UpdateTodoDTO } from "./../dtos/todo.update.dto";
import { TaskItemDTO } from "./../dtos/task-item.dto";
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
  Request,
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
import { TaskService } from "../services/task.service";
import { TodoDTO } from "../dtos/todo.dto";

@ApiTags("任务模块")
@Controller("task")
export default class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({
    summary: "新增侧边任务",
  })
  @ApiBearerAuth("JWT")
  @UseGuards(AuthGuard)
  @Post("add")
  add(@Req() req: any, @Body("taskName") taskName) {
    return this.taskService.addTask(req.user.id, taskName);
  }

  /**
   *
   * @description 添加任务列表
   * @param {*} req
   * @param {TaskItemDTO} updateUserDTO
   * @return {*}
   */
  @ApiBearerAuth("JWT")
  @ApiOperation({
    summary: "添加任务列表",
  })
  @Post("addTaskItem")
  @UseGuards(AuthGuard)
  addTaskItem(@Request() req, @Body() addToDoDTO: TodoDTO) {
    return this.taskService.addTaskItem(req.user.id, addToDoDTO);
  }

  /**
   *
   * @description 根据taskId 找到所有的任务列表
   * @param {*} req
   * @param {TaskItemDTO} updateUserDTO
   * @return {*}
   */
  @ApiBearerAuth("JWT")
  @ApiOperation({
    summary: "找到所有的任务列表",
  })
  @Post("findAllTaskItem")
  @UseGuards(AuthGuard)
  findAllTaskItem(@Body("taskId") taskId: Number) {
    return this.taskService.findAllTaskItem(taskId);
  }


  @ApiOperation({
    summary: "选择任务",
  })
  @ApiBearerAuth("JWT")
  @UseGuards(AuthGuard)
  @Post("filter")
  filter(@Req() req: any, @Body("taskName") taskName = "") {
    return this.taskService.filterTask(taskName);
  }

  @ApiOperation({
    summary: "获取已经完成的所有任务",
  })
  @ApiBearerAuth("JWT")
  @UseGuards(AuthGuard)
  @Get("getAllComplated")
  getAllComplated(@Req() req: any) {
    return this.taskService.getAllComplated(req.user.id);
  }

  @ApiOperation({
    summary: "获取已经标记的任务",
  })
  @ApiBearerAuth("JWT")
  @UseGuards(AuthGuard)
  @Get("getAllMarked")
  getAllMarked(@Req() req: any) {
    return this.taskService.getAllMarked(req.user.id);
  }

  @ApiOperation({
    summary: "删除某一项任务",
  })
  @ApiBearerAuth("JWT")
  @UseGuards(AuthGuard)
  @Post("deleteOneTask")
  deleteOneTask(@Body("taskItemId") taskItemId) {
    return this.taskService.deleteOneTask(taskItemId);
  }

  @ApiOperation({
    summary: "删除某一组任务",
  })
  @ApiBearerAuth("JWT")
  @UseGuards(AuthGuard)
  @Post("deleteTaskList")
  deleteTaskList(@Body("taskId") taskId) {
    return this.taskService.deleteTaskList(taskId);
  }

  @ApiOperation({
    summary: "修改某一组任务",
  })
  @ApiBearerAuth("JWT")
  @UseGuards(AuthGuard)
  @Post("updateTaskList")
  updateTaskList(@Request() req, @Body() updateTaskDTO: TaskItemDTO) {
    const token = req.user.id;
    return this.taskService.updateTaskList(token, updateTaskDTO);
  }

  @ApiOperation({
    summary: "修改某一个任务的状态",
  })
  @ApiBearerAuth("JWT")
  @UseGuards(AuthGuard)
  @Post("toggleTaskItemStatus")
  toggleTaskItemStatus(@Request() req, @Body() updateUserDTO:
   any) {
    const token = req.user.id;
    return this.taskService.updateTaskItem(token, updateUserDTO);
  }
}
