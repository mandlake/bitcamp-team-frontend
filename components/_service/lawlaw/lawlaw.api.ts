"use client";

import { chatInstance } from "@/components/config/axios-config";

export const tempApi = async (all: any) => {
  try {
    const response = await chatInstance().post("/temp", all);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
