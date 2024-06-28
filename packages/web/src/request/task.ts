import { requset } from ".";
import { FilterTaskItemResponse, FilterTaskResponse, ITodo } from "../types";
import { TaskUrl } from "./urls";


export function fetchAddTask(data:any){
  return requset<FilterTaskResponse>({
    url:TaskUrl.addTaskUrl,
    method:"Post",
    data
  })
}

export function fetchAddTaskItem(data:any){
  return requset<FilterTaskResponse>({
    url:TaskUrl.taskAddItemUrl,
    method:"Post",
    data
  })
}

/**
 *
 * @description 根据 taskId 找到所有任务
 * @param {object} - { taskId:number }
 * @return {*} 
 */
export function fetchFindAllTaskItem(data:any){
  return requset<FilterTaskItemResponse>({
    url:TaskUrl.findAllTaskItemUrl,
    method:"GET",
    data
  })
}


export function fetchAllComplete(){
  return requset<FilterTaskItemResponse>({
    url:TaskUrl.getAllComplete,
    method:"GET",
  })
}

export function fetchAllMarked(){
  return requset<FilterTaskItemResponse>({
    url:TaskUrl.getAllMarked,
    method:"GET",
  })
}





export function fetchGroup(data:{groupName:string}){
  return requset<FilterTaskResponse>({
    url:TaskUrl.getAllTask,
    method:"Get",
    data
  })
}

export function fetchChangeTaskMarked(data:{id:number,isMarked:boolean}){
  return requset<any>({
    url:TaskUrl.changeTaskMarkedUrl,
    method:"Post",
    data
  })
}

export function fetchChangeStatus(data: any
  ){
  return requset<FilterTaskResponse>({
    url:TaskUrl.toggleGroupStatus,
    method:"get",
    data
  })
}



export function deleteOneTodo(data){
  return requset<any>({
    url:TaskUrl.deleteOneTodo,
    method:"get",
    data
  })
}


export function deleteOneGroup(data){
  return requset<any>({
    url:TaskUrl.deleteOneGroup,
    method:"get",
    data
  })
}

  


