import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCaseLawListApi } from "./judicial.api";

export const getCaseLawList: any = createAsyncThunk(
  "judicial/getCaseLawList",
  async () => {
    const data: any = await getCaseLawListApi();
    return data;
  }
);
