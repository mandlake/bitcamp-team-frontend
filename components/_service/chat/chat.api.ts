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

export const createRoomApi = async (id: number) => {
  try {
    const response = await chatInstance().get(`/createRoom/${id}`, {});

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const saveChatApi = async (chat: IChat) => {
  try {
    const response = await chatInstance().post(`/saveChat`, chat);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteChatApi = async () => {
  try {
    const response = await chatInstance().delete(`/delete`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
