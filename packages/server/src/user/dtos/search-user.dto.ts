
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length, Matches, Validate} from "class-validator"
export class SearchUserDTO {
  @ApiProperty({example:"任务类型1"})
  @IsString()
  taskName:string;
}