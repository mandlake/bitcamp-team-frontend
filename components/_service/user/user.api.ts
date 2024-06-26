"use server";

import { PrismaClient } from "@prisma/client";
import instance from "@/components/config/axios-config";
import { IUser } from "@/components/_model/user/user";

const prisma = new PrismaClient();

export const joinApi = async (user: IUser) => {
  try {
    const response = await instance().post("/users/users/save", user);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginApi = async (user: IUser) => {
  try {
    const response = await instance().post("/users/users/login", user);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const logoutApi = async ({ authorization }: any) => {
  try {
    const response = await instance().get("/users/users/logout", authorization);
    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserByIdApi = async ({ id }: any) => {
  try {
    const response = await instance().get("/users/users/exists", id);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserByEmailApi = async ({ email }: any) => {
  try {
    const response = await instance().get("/users/users/existsEmail", email);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserDetailApi = async ({ id }: any) => {
  try {
    const response = await instance().get("/users/users/detail", id);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteUserApi = async ({ id }: any) => {
  try {
    const response = await instance().delete("/users/users/delete", id);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
