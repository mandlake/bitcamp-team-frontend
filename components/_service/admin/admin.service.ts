import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  adminSaveApi,
  allStatsOfLawyersApi,
  authLoginApi,
  authLogoutApi,
  countEnabledAdminApi,
  deleteAdminApi,
  enableAdminByIdApi,
  enabledAdminApi,
  findAllApi,
  getAdminByIdApi,
  getAllAdminApi,
  getAllInquiryListApi,
  getLast7DaysApi,
  getLawyerAuthFalseStatsApi,
  getLawyerStatsAllApi,
  getLawyerTotalStatsApi,
  getMonthlyVisitsApi,
  getUserDateStatsApi,
  getUserMonthStatesApi,
  getUserTotalStatsApi,
  getUserYearStatsApi,
  getVisitorCountTodayApi,
  getYearVisitsApi,
  saveApi,
  saveVisitsApi,
  searchAdminApi,
  sendBulkMailApi,
  sendMailApi,
  totalStatsOfLawyerApi,
  updateAdminApi,
} from "./admin.api";
import {
  IAdmin,
  ISendBulkMail,
  ISendMail,
} from "@/components/_model/admin/admin";
import { adminURL } from "@/components/common/url";
import axios from "axios";
import { EventSourcePolyfill } from "event-source-polyfill";
const API_URL = adminURL + "/chat";

export const authLogin: any = createAsyncThunk(
  "admin/authLogin",
  async (admin: IAdmin) => {
    const data: any = await authLoginApi(admin);
    return data;
  }
);

export const authLogout: any = createAsyncThunk(
  "admin/authLogout",
  async (refreshToken: string) => {
    const data: any = await authLogoutApi(refreshToken);
    return data;
  }
);

export const adminSave: any = createAsyncThunk(
  "admin/adminSave",
  async (admin: IAdmin) => {
    const data: any = await adminSaveApi(admin);
    return data;
  }
);

export const getAdminById: any = createAsyncThunk(
  "admin/getAdminById",
  async (id: number) => {
    const data: any = await getAdminByIdApi(id);
    return data;
  }
);

export const getAllAdmin: any = createAsyncThunk(
  "admin/getAllAdmin",
  async () => {
    const data: any = await getAllAdminApi();
    return data;
  }
);

export const updateAdmin: any = createAsyncThunk(
  "admin/updateAdmin",
  async (admin: IAdmin) => {
    const data: any = await updateAdminApi(admin);
    return data;
  }
);

export const deleteAdmin: any = createAsyncThunk(
  "admin/deleteAdmin",
  async (id: number) => {
    const data: any = await deleteAdminApi(id);
    return data;
  }
);

export const enableAdminById: any = createAsyncThunk(
  "admin/enableAdminById",
  async (id: number) => {
    const data: any = await enableAdminByIdApi(id);
    return data;
  }
);

export const enabledAdmin: any = createAsyncThunk(
  "admin/enabledAdmin",
  async () => {
    const data: any = await enabledAdminApi();
    return data;
  }
);

export const countEnabledAdmin: any = createAsyncThunk(
  "admin/countEnabledAdmin",
  async () => {
    const data: any = await countEnabledAdminApi();
    return data;
  }
);

export const searchAdmin: any = createAsyncThunk(
  "admin/searchAdmin",
  async (keyword: string) => {
    const data: any = await searchAdminApi(keyword);
    return data;
  }
);

export const sendMail: any = createAsyncThunk(
  "admin/sendMail",
  async (mail: ISendMail) => {
    const data: any = await sendMailApi(mail);
    return data;
  }
);

export const sendBulkMail: any = createAsyncThunk(
  "admin/sendBulkMail",
  async (mail: ISendBulkMail) => {
    const data: any = await sendBulkMailApi(mail);
    return data;
  }
);

export const totalStatsOfLawyers: any = createAsyncThunk(
  "admin/totalStatsOfLawyers",
  async () => {
    const data: any = await totalStatsOfLawyerApi();
    return data;
  }
);

export const authFalseStatsOfLawyers: any = createAsyncThunk(
  "admin/authFalseStatsOfLawyers",
  async () => {
    const data: any = await totalStatsOfLawyerApi();
    return data;
  }
);

export const allStatsOfLawyers: any = createAsyncThunk(
  "admin/allStatsOfLawyers",
  async () => {
    const data: any = await allStatsOfLawyersApi();
    return data;
  }
);

export const saveVisits: any = createAsyncThunk(
  "admin/saveVisits",
  async () => {
    const data: any = await saveVisitsApi();
    return data;
  }
);

export const getMonthlyVisits: any = createAsyncThunk(
  "admin/getMonthlyVisits",
  async (visitors: any) => {
    const data: any = await getMonthlyVisitsApi(visitors);
    return data;
  }
);

export const getYearVisits: any = createAsyncThunk(
  "admin/getYearVisits",
  async (visitors: any) => {
    const data: any = await getYearVisitsApi(visitors);
    return data;
  }
);

export const getLast7Days: any = createAsyncThunk(
  "admin/getLast7Days",
  async () => {
    const data: any = await getLast7DaysApi();
    return data;
  }
);

export const findAll: any = createAsyncThunk(
  "admin/board/findAll",
  async () => {
    const data: any = await findAllApi();
    return data;
  }
);

export const save: any = createAsyncThunk(
  "admin/board/save",
  async (formData: any) => {
    const data: any = await saveApi(formData);
    return data;
  }
);

export const getVisitorCountToday: any = createAsyncThunk(
  "admin/board/getVisitorCountToday",
  async () => {
    const data: any = await getVisitorCountTodayApi();
    return data;
  }
);

export const createChatRoom = async (sender: string, receiver: string) => {
  const response = await axios.get(`${API_URL}/create`, {
    params: { sender, receiver },
  });
  return response.data;
};

export const getChatHistory = async (roomId: string) => {
  const response = await fetch(`${API_URL}/history?roomId=${roomId}`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};

export const sendMessage = async (chatMessage: any) => {
  await fetch(`${API_URL}/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chatMessage),
    credentials: "include",
  });
};

export const getMessages = (roomId: string) => {
  return new EventSourcePolyfill(`${API_URL}/messages?roomId=${roomId}`, {
    withCredentials: true,
  });
};

export const getLawyerTotalStats: any = createAsyncThunk(
  "admin/getLawyerTotalStats",
  async () => {
    const data: any = await getLawyerTotalStatsApi();
    return data;
  }
);

export const getLawyerAuthFalseStats: any = createAsyncThunk(
  "admin/getLawyerAuthFalseStats",
  async () => {
    const data: any = await getLawyerAuthFalseStatsApi();
    return data;
  }
);

export const getLawyerStatsAll: any = createAsyncThunk(
  "admin/getLawyerStatsAll",
  async () => {
    const data: any = await getLawyerStatsAllApi();
    return data;
  }
);

export const getUserTotalStats: any = createAsyncThunk(
  "admin/getUserTotalStats",
  async () => {
    const data: any = await getUserTotalStatsApi();
    return data;
  }
);

export const getUserMonthStates: any = createAsyncThunk(
  "admin/getUserMonthStates",
  async () => {
    const data: any = await getUserMonthStatesApi();
    return data;
  }
);

export const getUserDateStats: any = createAsyncThunk(
  "admin/getUserDateStats",
  async () => {
    const data: any = await getUserDateStatsApi();
    return data;
  }
);

export const getUserYearStats: any = createAsyncThunk(
  "admin/getUserYearStats",
  async () => {
    const data: any = await getUserYearStatsApi();
    return data;
  }
);

export const getAllInquiryList: any = createAsyncThunk(
  "admin/getAllInquiryList",
  async () => {
    const data: any = await getAllInquiryListApi();
    return data;
  }
);
