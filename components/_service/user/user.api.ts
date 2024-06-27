"use server";

import { userInstance } from "@/components/config/axios-config";
import { IUser } from "@/components/_model/user/user";

export const joinApi = async (user: IUser) => {
  try {
    const response = await userInstance().post("/users/save", user);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginApi = async (user: IUser) => {
  try {
    const response = await userInstance().post("/users/login", user);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const logoutApi = async ({ authorization }: any) => {
  try {
    const response = await userInstance().get("/users/logout", authorization);
    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserByIdApi = async ({ id }: any) => {
  try {
    const response = await userInstance().get("/users/exists", id);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserByEmailApi = async ({ email }: any) => {
  try {
    const response = await userInstance().get("/users/existsEmail", email);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserDetailApi = async ({ id }: any) => {
  try {
    const response = await userInstance().get("/users/detail", id);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteUserApi = async ({ id }: any) => {
  try {
    const response = await userInstance().delete("/users/delete", id);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
