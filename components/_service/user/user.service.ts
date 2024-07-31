import { createAsyncThunk } from "@reduxjs/toolkit";
import { userLogoutApi } from "./user.api";

export const userLogout: any = createAsyncThunk(
  "user/userLogout",
  async (token: any) => {
    const data: any = await userLogoutApi(token);
    return data;
  }
);
