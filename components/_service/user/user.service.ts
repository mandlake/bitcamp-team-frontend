import { createAsyncThunk } from "@reduxjs/toolkit";
import { joinApi, loginApi, logoutApi } from "./user.api";
import { IUser } from "@/components/_model/user/user";

export const joinId: any = createAsyncThunk(
  "user/join",
  async (user: IUser) => {
    try {
      const response = joinApi(user);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const loginId: any = createAsyncThunk(
  "user/login",
  async (user: IUser) => {
    try {
      const response = loginApi(user);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const logout: any = createAsyncThunk(
  "user/logout",
  async (accessToken: string) => {
    try {
      const response = logoutApi(accessToken);
      return response;
    } catch (error) {
      return error;
    }
  }
);
