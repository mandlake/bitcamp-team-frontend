import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteUserAPI,
  existsEmailAPI,
  getUserByIdApi,
  locaJoinAPI,
  localLoginAPI,
  updateUserByIdApi,
  userLogoutApi,
} from "./user.api";
import { IUser } from "@/components/_model/user/user";

export const userLogout: any = createAsyncThunk("user/userLogout", async () => {
  const data: any = await userLogoutApi();
  return data;
});

export const getUserById: any = createAsyncThunk(
  "user/getUserById",
  async (id: string) => {
    const data: any = await getUserByIdApi(id);
    return data;
  }
);

export const updateUserById: any = createAsyncThunk(
  "user/updateUserById",
  async (user: IUser) => {
    const data: any = await updateUserByIdApi(user);
    return data;
  }
);

export const localLogin: any = createAsyncThunk(
  "users/login",
  async (user: IUser) => await localLoginAPI(user)
);

export const localJoin: any = createAsyncThunk(
  "users/join",
  async (user: IUser) => await locaJoinAPI(user)
);

export const findAllUsers: any = createAsyncThunk(
  "users/findAllUsers",
  async (page: number) => await findAllUsers(page)
);

export const findUserByEmail: any = createAsyncThunk(
  "users/findByEmail",
  async (email: string) => {
    const data = await findUserByEmail(email);
    console.log(data);
    return data;
  }
);

export const existsEmail: any = createAsyncThunk(
  "users/existsEmail",
  async (email: string) => {
    const data = await existsEmailAPI(email);
    console.log(data);
    return data;
  }
);

export const deleteUser: any = createAsyncThunk(
  "users/delete",
  async (id: number) => await deleteUserAPI(id)
);
