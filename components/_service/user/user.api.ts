"use server";

import { IUser } from "@/components/_model/user/user";
import { instance, userInstance } from "@/components/config/axios-config";

export const userLogoutApi = async () => {
  try {
    const response = await instance().get(`/auth/logout`);

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

export const localLoginAPI = async (user: IUser) => {
  console.log(`Parameter in loginAPI: ${JSON.stringify(user)}`);
  try {
    const response = await instance().post(`auth/login/local`, user);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const locaJoinAPI = async (user: IUser) => {
  try {
    console.log(`Parameter in joinAPI: ${JSON.stringify(user)}`);
    const response = await userInstance().post(`/auth/save`, user);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const existsEmailAPI = async (email: string) => {
  try {
    const response = await userInstance().get(`/searchEmail`, {
      params: { email },
    });
    console.log("existsEmailAPI resulted: " + response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateUserAPI = async (id: number) => {
  try {
    const response = await userInstance().put(`/${id}`, { params: { id } });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteUserAPI = async (id: number) => {
  try {
    const response = await userInstance().delete(`/${id}`, { params: { id } });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
