import { CreateUserDTO } from "./create-user.dto";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  Validate,
} from "class-validator";

import { PartialType } from "@nestjs/mapped-types";

export class UpdateUserDTO extends PartialType(CreateUserDTO){};
export class UpdateUserDTO2 {
  @ApiProperty({ example: "好大鸭" })
  @IsString()
  nickName: string;

  @ApiProperty({ example: "123456", description: "旧密码" })
  @IsString()
  @Length(3, 6)
  @IsOptional()
  oldPassword?: string;

  @ApiProperty({ example: "123457", description: "新密码" })
  @IsString()
  @Length(3, 6)
  @IsOptional()
  newPassword?: string;

  @ApiProperty({
    example: "",
    description: "头像地址",
  })
  avatar: string;
}
