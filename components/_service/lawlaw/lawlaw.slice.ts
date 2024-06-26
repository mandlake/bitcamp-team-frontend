import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "@/components/_model/lawlaw/init/lawlawState.init";

export const lawlawSlice = createSlice({
  name: "judicial",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = lawlawSlice.actions;

export const getTemp = (state: any) => state.lawlaw.array;

export default lawlawSlice.reducer;
