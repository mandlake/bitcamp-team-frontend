import { createAsyncThunk } from "@reduxjs/toolkit";
import { userLogoutApi } from "./user.api";

export const userLogout: any = createAsyncThunk("user/userLogout", async () => {
  const data: any = await userLogoutApi();
  return data;
});
