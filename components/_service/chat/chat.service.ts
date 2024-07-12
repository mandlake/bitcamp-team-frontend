import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveChatApi, tempApi } from "./chat.api";
import { IChat } from "@/components/_model/chat/chat";

export const temp: any = createAsyncThunk("chat/temp", async () => {
  const data: any = await tempApi();
  return data;
});

export const saveChat: any = createAsyncThunk(
  "chat/saveChat",
  async (chat: IChat) => {
    const data: any = await saveChatApi(chat);
    return data;
  }
);
