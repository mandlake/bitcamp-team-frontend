import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  downloadfilesApi,
  getLawyerByIdApi,
  getLawyerByUsernameApi,
  getLawyerDetailByUsernameApi,
  lawyerJoinApi,
  lawyerLoginApi,
  lawyerLogoutApi,
  lawyerSaveDetailApi,
  updateLawyerApi,
} from "./lawyer.api";
import { ILawyer, ILawyerDetail } from "@/components/_model/lawyer/lawyer";
import axios from "axios";

export const lawyerLogin: any = createAsyncThunk(
  "lawyer/lawyerLogin",
  async (lawyer: ILawyer) => {
    const data: any = await lawyerLoginApi(lawyer);
    return data;
  }
);

export const lawyerLogout: any = createAsyncThunk(
  "lawyer/lawyerLogout",
  async () => {
    const data: any = await lawyerLogoutApi();
    return data;
  }
);

export const lawyerJoin: any = createAsyncThunk(
  "lawyer/lawyerJoin",
  async (lawyer: ILawyer) => {
    const data: any = await lawyerJoinApi(lawyer);
    return data;
  }
);

export const lawyerSaveDetail: any = createAsyncThunk(
  "lawyer/lawyerSaveDetail",
  async (lawyer: ILawyerDetail) => {
    const data: any = await lawyerSaveDetailApi(lawyer);
    return data;
  }
);

export const updateLawyer: any = createAsyncThunk(
  "lawyer/updateLawyer",
  async (lawyer: ILawyer) => {
    const data: any = await updateLawyerApi(lawyer);
    return data;
  }
);

export const getLawyerById: any = createAsyncThunk(
  "lawyer/getLawyerById",
  async (id: string) => {
    const data: any = await getLawyerByIdApi(id);
    return data;
  }
);

export const getLawyerByUsername: any = createAsyncThunk(
  "lawyer/getLawyerByUsername",
  async (username: string) => {
    const data: any = await getLawyerByUsernameApi(username);
    return data;
  }
);

export const getLawyerDetailByUsername: any = createAsyncThunk(
  "lawyer/getLawyerDetailByUsername",
  async (username: string) => {
    const data: any = await getLawyerDetailByUsernameApi(username);
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
