

import { PartialType } from "@nestjs/mapped-types";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude, Transform } from "class-transformer";
import { IsBoolean, IsDateString, isNotEmpty, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPhoneNumber, IsString, Length, Matches, Validate } from "class-validator"
import { TaskListItemDTO } from "./taskListItem.dto";

export class UpdateTaskListItemDTO extends PartialType(TaskListItemDTO) {
  id:number
 }