import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  lawyerJoinApi,
  lawyerLoginApi,
  lawyerLogoutApi,
  lawyerSaveDetailApi,
} from "./lawyer.api";
import { ILawyer, ILawyerDetail } from "@/components/_model/lawyer/lawyer";

export const lawyerLogin: any = createAsyncThunk(
  "lawyer/getCaseLawList",
  async (lawyer: ILawyer) => {
    const data: any = await lawyerLoginApi(lawyer);
    return data;
  }
);

export const lawyerLogout: any = createAsyncThunk(
  "lawyer/getCaseLawList",
  async () => {
    const data: any = await lawyerLogoutApi();
    return data;
  }
);

export const lawyerJoin: any = createAsyncThunk(
  "lawyer/getCaseLawList",
  async (lawyer: ILawyer) => {
    const data: any = await lawyerJoinApi(lawyer);
    return data;
  }
);

export const lawyerSaveDetail: any = createAsyncThunk(
  "lawyer/getCaseLawList",
  async (lawyer: ILawyerDetail) => {
    const data: any = await lawyerSaveDetailApi(lawyer);
    return data;
  }
);
