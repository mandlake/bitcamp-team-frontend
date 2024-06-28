import { createAsyncThunk } from "@reduxjs/toolkit";
import { createRoomApi, deleteChatApi, saveChatApi, tempApi } from "./chat.api";

export const temp: any = createAsyncThunk("chat/temp", async () => {
  const data: any = await tempApi();
  return data;
});

export const createRoom: any = createAsyncThunk(
  "chat/createRoom",
  async (id: number) => {
    const data: any = await createRoomApi(id);
    return data;
  }
);

export const saveChat: any = createAsyncThunk(
  "chat/saveChat",
  async (chat: any) => {
    const data: any = await saveChatApi(chat);
    return data;
  }
);

export const deleteChat: any = createAsyncThunk("chat/deleteChat", async () => {
  const data: any = await deleteChatApi();
  return data;
});
