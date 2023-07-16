import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  sideTxt: string;
  chosenId:number,
  hasDeleteSide:boolean,
  sideNum:number,
  markedNum:number,
  deleteSideId:number,
  hasNewRightItem:boolean
}
const initialState: CounterState = {
  sideTxt: "",
  chosenId:0,
  hasDeleteSide:false,
  sideNum:0,
  markedNum:0,
  deleteSideId:0,
  hasNewRightItem:false
};

export const TaskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    changeSideTxt: (state, { payload }) => {
      state.sideTxt = payload;
    },
    setChosenId:(state, { payload })=>{
      state.chosenId = payload;
    },
    deleteSideId(state, { payload }){
      state.deleteSideId = payload
    },
    changeRightTxt(state, { payload }){
      state.hasNewRightItem = payload
    },
  },
});

export const { changeSideTxt,setChosenId,deleteSideId,changeRightTxt } = TaskSlice.actions;

export default TaskSlice.reducer;
