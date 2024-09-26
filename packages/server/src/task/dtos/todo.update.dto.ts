import { TodoItemDTO } from "./Item.dto";
import { IntersectionType, PartialType, PickType } from "@nestjs/mapped-types";

export class UpdateTodoDTO extends PartialType(TodoItemDTO) {
  id:number
 }
