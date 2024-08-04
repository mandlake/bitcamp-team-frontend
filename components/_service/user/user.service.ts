import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserByIdApi, updateUserByIdApi, userLogoutApi } from "./user.api";
import { IUser } from "@/components/_model/user/user";

export const userLogout: any = createAsyncThunk("user/userLogout", async () => {
  const data: any = await userLogoutApi();
  return data;
});

export const getUserById: any = createAsyncThunk(
  "user/getUserById",
  async (id: number) => {
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
