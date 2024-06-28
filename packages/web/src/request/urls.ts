import { AxiosInstance } from "."
export namespace UserUrl {

  export const LoginUrl = 'user/login'
  export const RegisterUrl = 'user/register'
  export const InfoUrl = 'user/info'

  export const taskSearchItemUrl = 'user/searchTaskItem'
  export const uploadUrl = AxiosInstance.defaults.baseURL + '/user/upload'
  export const updateUrl = 'user/update'


}
export namespace TaskUrl {

  export const addTaskUrl = 'group/addGroup'
  export const findAllTaskItemUrl = 'todo/getTodo'
  export const getAllTask = 'group/getGroup'
  export const taskUpdateListUrl = 'group/updateGroup'
  export const getAllComplete = 'group/getAllComplete'
  export const getAllMarked = 'group/getAllMarked'
  
  export const deleteOneGroup = 'group/deleteGroup'

  

  export const taskAddItemUrl = 'todo/addTodo'
  export const toggleGroupStatus = 'todo/toggleStatus'
  export const deleteOneTodo = 'todo/deleteTodo'

  export const changeTaskMarkedUrl = 'task/mark'
}