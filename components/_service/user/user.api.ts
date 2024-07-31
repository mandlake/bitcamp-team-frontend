"use server";

import { userInstance } from "@/components/config/axios-config";

export const userLogoutApi = async () => {
  try {
    const response = await userInstance().get("/logout");

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
