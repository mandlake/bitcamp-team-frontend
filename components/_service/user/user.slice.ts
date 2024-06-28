import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "@/components/_model/user/userState.init";

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export const getJoinId = (state: any) => state.user.array;

export default userSlice.reducer;
