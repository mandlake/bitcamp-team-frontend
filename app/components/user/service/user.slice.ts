import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword, forgotUsername, joinId } from "./user.service";
import { initialState } from "../init/userState.init";

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(joinId.fulfilled, (state: any, { payload }: any) => {
        state.array = payload;
      })
      .addCase(forgotUsername.rejected, (state: any, { payload }: any) => {
        state.array = payload;
      })
      .addCase(forgotPassword.rejected, (state: any, { payload }: any) => {
        state.array = payload;
      });
  },
});

export const {} = userSlice.actions;

export const getJoinId = (state: any) => state.user.array;

export default userSlice.reducer;
