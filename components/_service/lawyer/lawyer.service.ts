import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  downloadfilesApi,
  lawyerJoinApi,
  lawyerLoginApi,
  lawyerLogoutApi,
  lawyerSaveDetailApi,
  uploadfilesApi,
} from "./lawyer.api";
import { ILawyer, ILawyerDetail } from "@/components/_model/lawyer/lawyer";
import axios from "axios";

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

export const uploadfiles: any = createAsyncThunk(
  "lawyer/uploadfiles",
  async (formData: any) => {
    const data: any = await axios.post(
      "http://localhost:8081/files/upload/1",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }
);

export const downloadfiles: any = createAsyncThunk(
  "lawyer/downloadfiles",
  async (id: string) => {
    const data: any = await downloadfilesApi(id);
    return data;
  }
);
