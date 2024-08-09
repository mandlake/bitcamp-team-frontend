import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCaseLawsApi,
  getCaseLawBySerialNoApi,
  getCaseLawDetailApi,
  getCaseLawListApi,
  getsearchCaseLawsApi,
  getUserStatsByDateApi,
  getUserStatsByMonthApi,
  getUserStatsByYearApi,
  saveUserStatsApi,
  searchCaseLawsApi,
} from "./judicial.api";
import {
  ISerialNumber,
  SearchCriteriaDto,
} from "@/components/_model/manage/manage";

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

export const getAllCaseLaws: any = createAsyncThunk(
  "judicial/getAllCaseLaws",
  async ({ page, pageSize }: any) => {
    const data: any = await getAllCaseLawsApi(page, pageSize);
    return data;
  }
);

export const getCaseLawDetail: any = createAsyncThunk(
  "judicial/getCaseLawDetail",
  async (serialNumber: string) => {
    const data: any = await getCaseLawDetailApi(serialNumber);
    return data;
  }
);

export const searchCaseLaws: any = createAsyncThunk(
  "judicial/searchCaseLaws",
  async (searchCriteria: SearchCriteriaDto) => {
    const data: any = await searchCaseLawsApi(searchCriteria);
    return data;
  }
);

export const saveUserStats: any = createAsyncThunk(
  "judicial/saveUserStats",
  async () => {
    const data: any = await saveUserStatsApi();
    return data;
  }
);

export const getUserStatsByDate: any = createAsyncThunk(
  "judicial/getUserStatsByDate",
  async () => {
    const data: any = await getUserStatsByDateApi();
    return data;
  }
);

export const getUserStatsByMonth: any = createAsyncThunk(
  "judicial/getUserStatsByMonth",
  async () => {
    const data: any = await getUserStatsByMonthApi();
    return data;
  }
);

export const getUserStatsByYear: any = createAsyncThunk(
  "judicial/getUserStatsByYear",
  async () => {
    const data: any = await getUserStatsByYearApi();
    return data;
  }
);

export const getUserTotalStats: any = createAsyncThunk(
  "judicial/getUserTotalStats",
  async () => {
    const data: any = await getUserStatsByYearApi();
    return data;
  }
);
