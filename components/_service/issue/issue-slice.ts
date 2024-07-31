"use client";

import { createSlice } from "@reduxjs/toolkit";
import {
  findAllIssues,
  findIssueById,
  findCountIssues,
  saveIssue,
  modifyIssue,
  deleteIssue,
} from "./issue-service";
import { initialState } from "../../_model/issue/issue-init";

const issueThunks = [findAllIssues, findIssueById];

const status = {
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
};

const handleFulfilled = (state: any, { payload }: any) => {
  console.log("------------------ conclusion ---------------");
  state.array = payload;
  console.log(state.array);
};

const handlePending = (state: any) => {};

const handleRejected = (state: any) => {};

export const issueSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { pending, rejected } = status;

    builder
      .addCase(findAllIssues.fulfilled, (state: any, { payload }: any) => {
        state.array = payload;
      }) //issue을 생략한것 왜냐하면 issue에 파일에 있으니까
      //switch case랑 유사 (findAllIssues.fulfilled면 handleFulfilled함수를 실행해라)
      .addCase(findIssueById.fulfilled, (state: any, { payload }: any) => {
        state.array = payload;
      })
      .addCase(findCountIssues.fulfilled, (state: any, { payload }: any) => {
        state.count = payload;
      })
      .addCase(modifyIssue.fulfilled, (state: any, { payload }: any) => {})
      .addCase(deleteIssue.fulfilled, (state: any, { payload }: any) => {})
      .addCase(saveIssue.fulfilled, (state: any, { payload }: any) => {});
  },
});

export const getAllIssues = (state: any) => state.issue.array;

export const getIssueById = (state: any) => state.issue.array;

export const getCountIssues = (state: any) => state.issue.count;

export const getMessageSave = (state: any) => state.issue.message;

export const {} = issueSlice.actions;

export default issueSlice.reducer;
