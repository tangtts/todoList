import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
  IsDateString,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  Validate,
} from "class-validator";
import { IsConfirmed } from "src/shared/rules/isSamePassword.rule";
export class TaskItemDTO {
  @ApiProperty({ example: "任务1" })
  @IsNotEmpty()
  txt: string;

  @ApiProperty({example:1}) 
  @IsNotEmpty()
  @IsOptional()  
  taskId:string
}
