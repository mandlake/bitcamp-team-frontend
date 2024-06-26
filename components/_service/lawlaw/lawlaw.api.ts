"use client";

import instance from "@/components/config/axios-config";

export const tempApi = async (all: any) => {
  try {
    const response = await instance().post("/chats/temp", all);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
