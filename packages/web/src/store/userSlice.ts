import { createSlice } from "@reduxjs/toolkit";

export interface UserSliceState {
  token: string;
}
const initialState: UserSliceState = {
  token: localStorage.getItem("token") || "",
};

export const UserSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
      localStorage.setItem("token", payload); // 保存到本地存储
    },
  },
});

export const { setToken } = UserSlice.actions;

export default UserSlice.reducer;
