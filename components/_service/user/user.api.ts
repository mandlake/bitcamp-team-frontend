"use server";

import { IUser } from "@/components/_model/user/user";
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

export const getUserByIdApi = async (id: number) => {
  try {
    const response = await userInstance().get(`/${id}`);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateUserByIdApi = async (user: IUser) => {
  try {
    const response = await userInstance().put(`/${user.id}`, user);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
