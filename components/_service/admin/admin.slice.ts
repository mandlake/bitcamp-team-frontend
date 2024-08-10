import { initialState } from "@/components/_model/admin/adminState.init";
import { createSlice } from "@reduxjs/toolkit";
import { save } from "./admin.service";

export const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(save.fulfilled, (state: any, { payload }: any) => {
      state.array = payload;
      return state;
    });
    return;
  },
});

export const {} = adminSlice.actions;

export default adminSlice.reducer;
