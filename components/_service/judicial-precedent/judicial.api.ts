"use client";

import { manageInstance } from "@/components/config/axios-config";

export const getCaseLawListApi = async () => {
  try {
    const response = await manageInstance().get("/list", {});

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
