

import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude, Transform } from "class-transformer";
import { IsBoolean, IsDateString, isNotEmpty, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPhoneNumber, IsString, Length, Matches, Validate } from "class-validator"
export class TaskListItemDTO {

  @ApiProperty({ example: "吃喝玩乐",description: "任务组名称"})
  @IsNotEmpty()
  @IsString()
  taskName: string
}