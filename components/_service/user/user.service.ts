import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserByIdApi, userLogoutApi } from "./user.api";

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
