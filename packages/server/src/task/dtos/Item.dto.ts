

import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude, Transform } from "class-transformer";
import { IsBoolean, IsDateString, isNotEmpty, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPhoneNumber, IsString, Length, Matches, Validate } from "class-validator"
export class TodoItemDTO {
  @ApiProperty({ example: false })
  @IsBoolean()
  isComplated: boolean = false

  @ApiProperty({ example: false })
  @IsBoolean()
  isMarked: boolean = false

  @ApiProperty({ example: "吃喝玩乐",description: "具体任务名称"})
  @IsNotEmpty()
  @IsString()
  taskItemName: string

  @ApiProperty({ example: "吃喝玩乐",description: "侧边任务id"})
  @IsNumber()
  @IsNotEmpty()
  taskId: number
}