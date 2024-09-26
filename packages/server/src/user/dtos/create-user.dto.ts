

import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length, Matches, Validate} from "class-validator"
import { IsConfirmed } from "src/shared/rules/isSamePassword.rule";
export class CreateUserDTO {

  @ApiProperty({example:"好大鸭"})
  @IsString()
  nickName:string;

  @ApiProperty({example:"18623816694"})
  @IsPhoneNumber("CN")
  readonly phoneNumber:string;

  @ApiProperty({example:"123456"})
  @Length(3,6)
  // 自定义 校验器
  @Validate(IsConfirmed,{message:"两次密码不一致"})
  password:string
 
  @ApiProperty({
    example:"123456",
    description:"确认密码"
  })
  @Length(3,6)
  password_confirmed:string
  

  // @ApiProperty({
  //   example:"",
  //   description:"头像地址"
  // })
  // avatar:string

  // 不展示
//  @ApiHideProperty()
//   salt:string
}