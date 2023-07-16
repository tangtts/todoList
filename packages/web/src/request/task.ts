import { requset } from ".";
import { FilterTaskItemResponse, FilterTaskResponse, ITaskItem } from "../types";
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
    method:"Post",
    data
  })
}


export function fetchFilterTask(data:{taskName:string}){
  return requset<FilterTaskResponse>({
    url:TaskUrl.filterTaskUrl,
    method:"Post",
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

export function fetchChangeTaskStatus(data:
  Pick<ITaskItem,'isComplated' | 'isMarked' | 'taskItemId'> ){
  return requset<FilterTaskResponse>({
    url:TaskUrl.toggleTaskItemStatusUrl,
    method:"Post",
    data
  })
}

export function fetchComplatedTask(){
  return requset<any>({
    url:TaskUrl.getComplatedUrl
  })
}

export function fetchMarkedTask(){
  return requset<any>({
    url:TaskUrl.getAllMarkedUrl
  })
}

export function deleteOneTask(data){
  return requset<any>({
    url:TaskUrl.deleteOneTaskUrl,
    method:"Post",
    data
  })
}


export function deleteTaskList(data){
  return requset<any>({
    url:TaskUrl.deleteTaskList,
    method:"Post",
    data
  })
}

  


