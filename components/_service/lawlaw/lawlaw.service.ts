import { createAsyncThunk } from "@reduxjs/toolkit";
import { tempApi } from "./lawlaw.api";

export const temp: any = createAsyncThunk("lawlaw/temp", async (all: any) => {
  const data: any = await tempApi(all);
  return data;
});
