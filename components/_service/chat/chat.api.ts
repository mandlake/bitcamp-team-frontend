"use server";

import { IChat } from "@/components/_model/chat/chat";
import { chatInstance } from "@/components/config/axios-config";

export const tempApi = async () => {
  try {
    const response = await chatInstance().get("/temp", {});

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const saveChatApi = async (chat: any) => {
  try {
    const response = await chatInstance().post("/save", chat);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteChatApi = async () => {
  try {
    const response = await chatInstance().delete("/delete");

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getChatApi = async (userId: number) => {
  try {
    const response = await chatInstance().get(`/list/${userId}`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const newRoomIdApi = async (userId: number) => {
  try {
    const response = await chatInstance().get(`/newRoom/${userId}`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getChatHistoryApi = async (chat: IChat) => {
  try {
    const response = await chatInstance().post("/history/message-order", chat);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getChatHistoryByChatDateApi = async (chat: IChat) => {
  try {
    const response = await chatInstance().post("/history/chat-date", chat);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
