import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCaseLawBySerialNoApi,
  getCaseLawListApi,
  getsearchCaseLawsApi,
} from "./judicial.api";
import { ISerialNumber } from "@/components/_model/manage/manage";

export const getCaseLawList: any = createAsyncThunk(
  "judicial/getCaseLawList",
  async () => {
    const data: any = await getCaseLawListApi();
    return data;
  }
);

export const getCaseLawBySerialNo: any = createAsyncThunk(
  "judicial/getCaseLawBySerialNo",
  async (serialNo: string) => {
    const data: any = await getCaseLawBySerialNoApi(serialNo);
    return data;
  }
);

export const getsearchCaseLaws: any = createAsyncThunk(
  "judicial/getsearchCaseLaws",
  async (numbers: ISerialNumber) => {
    const data: any = await getsearchCaseLawsApi(numbers);
    return data;
  }
);
