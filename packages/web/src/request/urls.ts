import {AxiosInstance} from "."
export namespace UserUrl {

  export const LoginUrl = 'user/login'
  export const RegisterUrl = 'user/register'
  export const InfoUrl = 'user/info'

  export const taskSearchItemUrl = 'user/searchTaskItem'
  export const uploadUrl =  AxiosInstance.defaults.baseURL + '/user/upload'
  export const updateUrl =  'user/update'
  
  
} 
export namespace TaskUrl{
  
  export const addTaskUrl =  'task/add'
  export const findAllTaskItemUrl =  'task/findAllTaskItem'

  export const taskUpdateListUrl = 'task/updateTaskList'

  export const taskAddItemUrl = 'task/addTaskItem'
  export const filterTaskUrl =  'task/filter'
  export const changeTaskMarkedUrl =  'task/mark'
  export const toggleTaskItemStatusUrl =  'task/toggleTaskItemStatus'
  export const getComplatedUrl =  'task/getAllComplated'
  export const getAllMarkedUrl =  'task/getAllMarked'
  export const deleteOneTaskUrl =  'task/deleteOneTask'
  export const deleteTaskList =  'task/deleteTaskList'
}