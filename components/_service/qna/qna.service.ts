import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  findQnaBoardByIdApi,
  getQnaBoardListApi,
  getRepliesByBoardApi,
} from "./qna.api";

export const findQnaBoardById: any = createAsyncThunk(
  "user/findQnaBoardById",
  async (id: number) => {
    const data: any = await findQnaBoardByIdApi(id);
    return data;
  }
);

export const getQnaBoardList: any = createAsyncThunk(
  "user/getQnaBoardList",
  async () => {
    const data: any = await getQnaBoardListApi();
    return data;
  }
);

export const getRepliesByBoard: any = createAsyncThunk(
  "user/getRepliesByLawyerId",
  async (id: string) => {
    const data: any = await getRepliesByBoardApi(id);
    return data;
  }
);
