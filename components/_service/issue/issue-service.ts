import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  findAllIssuesAPI,
  findIssueByIdAPI,
  findCountIssuesAPI,
  saveIssueAPI,
  deleteIssueAPI,
  modifyIssueAPI,
} from "./issue-api";
import { ISse } from "@/components/_model/issue/issue";

export const findAllIssues: any = createAsyncThunk(
  "issues/findAllIssues",
  async (page: number) => {
    console.log("findAllIssues page: " + page);
    const data: any = await findAllIssuesAPI(page);

    const { message, result }: any = data;
    return data;
  }
);

export const findIssueById: any = createAsyncThunk(
  "issues/findIssueById",
  async (id: number) => await findIssueByIdAPI(id)
);

export const findCountIssues: any = createAsyncThunk(
  "issues/findIssuesCount",
  async () => await findCountIssuesAPI()
);

export const saveIssue: any = createAsyncThunk(
  "issues/saveIssue",
  async (issue: ISse) => {
    try {
      return await saveIssueAPI(issue);
    } catch (error) {
      throw error;
    }
  }
);

export const deleteIssue: any = createAsyncThunk(
  "issues/deleteIssue",
  async (id: number) => await deleteIssueAPI(id)
);

export const modifyIssue: any = createAsyncThunk(
  "issues/modifyIssue",
  async (id: number) => await modifyIssueAPI(id)
);
