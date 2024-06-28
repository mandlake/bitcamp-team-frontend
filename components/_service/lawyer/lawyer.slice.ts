import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "@/components/_model/user/userState.init";

export const lawyerSlice = createSlice({
  name: "lawyers",
  initialState,
  reducers: {},
});

export const {} = lawyerSlice.actions;

export default lawyerSlice.reducer;
