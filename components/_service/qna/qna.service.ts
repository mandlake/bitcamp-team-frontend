import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteReplyApi,
  findQnaBoardByIdApi,
  findReplyByArticleIdApi,
  getPostByIdApi,
  getQnaBoardListApi,
  saveQuestionsApi,
  saveReplyApi,
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

export const findReplyByArticleId: any = createAsyncThunk(
  "user/findReplyByArticleId",
  async (articleId: string) => {
    const data: any = await findReplyByArticleIdApi(articleId);
    return data;
  }
);

export const saveReply: any = createAsyncThunk(
  "user/saveReply",
  async (reply: any) => {
    const data: any = await saveReplyApi(reply);
    return data;
  }
);

export const deleteReply: any = createAsyncThunk(
  "user/deleteReply",
  async (lawyerId: string) => {
    const data: any = await deleteReplyApi(lawyerId);
    return data;
  }
);

export const saveQuestions: any = createAsyncThunk(
  "user/saveQuestions",
  async (question: any) => {
    const data: any = await saveQuestionsApi(question);
    return data;
  }
);

export const getPostById: any = createAsyncThunk(
  "user/saveQuestions",
  async (id: string) => {
    const data: any = await getPostByIdApi(id);
    return data;
  }
);
