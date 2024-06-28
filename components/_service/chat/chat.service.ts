import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewChatApi,
  chatDateHistoryApi,
  chattingListApi,
  createRoomApi,
  deleteChatApi,
  messageOrderHistoryApi,
  saveChatApi,
  tempApi,
} from "./chat.api";
import { IChat } from "@/components/_model/chat/chat";

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

export const addNewChat: any = createAsyncThunk(
  "chat/addNewChat",
  async (userId: number) => {
    const data: any = await addNewChatApi(userId);
    return data;
  }
);

export const chattingList: any = createAsyncThunk(
  "chat/chattingList",
  async (userId: number) => {
    const data: any = await chattingListApi(userId);
    return data;
  }
);

export const messageOrderHistory: any = createAsyncThunk(
  "chat/messageOrderHistory",
  async (chat: IChat) => {
    const data: any = await messageOrderHistoryApi(chat);
    return data;
  }
);

export const chatDateHistory: any = createAsyncThunk(
  "chat/chatDateHistory",
  async (chat: IChat) => {
    const data: any = await chatDateHistoryApi(chat);
    return data;
  }
);
