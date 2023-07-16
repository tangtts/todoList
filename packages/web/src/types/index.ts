export interface LoginParmas {
  phoneNumber:string
  password:string
}

export interface RegisterParams{
  nickName: string,
  phoneNumber: string,
  password: string,
  password_confirmed: string,
  avatar: string
}

export type UpdateParams  =  Omit<RegisterParams,'password' | 'password_confirmed'>



interface CommonResponse<T = unknown>  {
  code:number
  data:T
}

export type LoginResponse = CommonResponse<{token:string}>

export type InfoResponse = CommonResponse<{
  _id:string
  nickName:string,
  avatar:string,
  phoneNumber:string,
  id:number,
  complatedCount:number
  markedCount:number
  taskList:Omit<ISideItem,'updateItemTxt'>[]
}>

export type TaskResponse = CommonResponse<Omit<ISideItem,'updateItemTxt'>
>

export type TaskListResponse = CommonResponse<Array<Omit<ISideItem,'updateItemTxt'>>
>

export type UploadResponse = CommonResponse<{
  path:string
}>




export interface ISideItem {
  icon?: React.ReactNode,
  txt: string,
  num: number
  id:number
  updateItemTxt?:(id:ISideItem['id'],todo:ISideItem['txt'])=>void,
}

// 过滤任务
export type FilterTaskResponse  = CommonResponse<ITaskSide[]>; 


// 过滤任务
export type FilterTaskItemResponse  = CommonResponse<ITaskItem[]>; 
export interface ITaskSide {
  taskId:number,
  taskName: string,
  taskLength:number
  icon?:React.ReactNode,
}


export interface ITaskItem {
  taskItemId:number
  taskId:number,
  taskItemName: string,
  isComplated: boolean,
  isMarked: boolean,
}