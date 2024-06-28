import { initialState } from "@/components/_model/chat/chatState.init";
import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = chatSlice.actions;

export default chatSlice.reducer;
