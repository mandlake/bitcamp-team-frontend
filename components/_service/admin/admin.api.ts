"use server";

import {
  IAdmin,
  ISendBulkMail,
  ISendMail,
} from "@/components/_model/admin/admin";

import {
  adminInstance,
  instance,
  manageInstance,
} from "@/components/config/axios-config";

export const authLoginApi = async (admin: IAdmin) => {
  try {
    const response = await instance().post("/auth/admin/login", admin);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const authLogoutApi = async (refreshToken: string) => {
  try {
    const response = await instance().post("/auth/logout");

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const adminSaveApi = async (admin: IAdmin) => {
  try {
    const response = await adminInstance().post("/save", admin);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAdminByIdApi = async (id: number) => {
  try {
    const response = await adminInstance().get(`/${id}`, {});

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllAdminApi = async () => {
  try {
    const response = await adminInstance().get("/all", {});

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateAdminApi = async (admin: IAdmin) => {
  try {
    const response = await adminInstance().put(`/${admin.id}`, admin);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteAdminApi = async (id: number) => {
  try {
    const response = await adminInstance().delete(`/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const enableAdminByIdApi = async (id: number) => {
  try {
    const response = await adminInstance().put(`/enabled/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const enabledAdminApi = async () => {
  try {
    const response = await adminInstance().get("/enabled");

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const countEnabledAdminApi = async () => {
  try {
    const response = await adminInstance().get("/countEnabled");

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const searchAdminApi = async (keyword: string) => {
  try {
    const response = await adminInstance().get(`/search`, {
      params: { keyword },
    });

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sendMailApi = async (mail: ISendMail) => {
  try {
    const response = await adminInstance().post(`/mail/send`, mail);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sendBulkMailApi = async (mail: ISendBulkMail) => {
  try {
    const response = await adminInstance().post(`/mail/send-bulk`, mail);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const totalStatsOfLawyerApi = async () => {
  try {
    const response = await adminInstance().get(`/lawyer/stats/total`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const authFalseStatsOfLawyerApi = async () => {
  try {
    const response = await adminInstance().get(`/lawyer/stats/authFalse`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const allStatsOfLawyersApi = async () => {
  try {
    const response = await adminInstance().get(`/lawyer/stats/all`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const saveVisitsApi = async () => {
  try {
    const response = await adminInstance().post("/visit/save");

    // Handle the response based on your backend logic
    // If the response contains the incremented count, access it here:
    const incrementedCount = response.data; // Assuming it's in the response data

    console.log("Visit count successfully incremented:", incrementedCount);
    return incrementedCount; // Or return whatever data is relevant for your application
  } catch (error) {
    console.error("Error saving visits:", error);
    throw error; // Re-throw for handling in your async thunk or component
  }
};

export const getMonthlyVisitsApi = async (visitors: any) => {
  try {
    const response = await adminInstance().get(`/visit/month`, {
      params: { year: visitors.year, month: visitors.month },
    });

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getYearVisitsApi = async (visitors: any) => {
  try {
    const response = await adminInstance().get(`/visit/year`, {
      params: { year: visitors.year },
    });

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getLast7DaysApi = async () => {
  try {
    const response = await adminInstance().get(`/visit/last7days`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findAllApi = async () => {
  try {
    const response = await adminInstance().get(`/board/all`);
    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const saveApi = async (formData: any) => {
  try {
    const data = await adminInstance().post(`/board/save`, formData);
    console.log("success");
    return data;
  } catch (error) {
    console.error("Error saving board:", error);
    return error;
  }
};

export const getVisitorCountTodayApi = async () => {
  try {
    const response = await adminInstance().get(`/visit/today`);
    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getLawyerTotalStatsApi = async () => {
  try {
    const response = await adminInstance().get(`/lawyer/stats/total`);
    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getLawyerAuthFalseStatsApi = async () => {
  try {
    const response = await adminInstance().get(`/lawyer/stats/authFalse`);
    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getLawyerStatsAllApi = async () => {
  try {
    const response = await adminInstance().get(`/lawyer/stats/all`);
    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserTotalStatsApi = async () => {
  try {
    const response = await manageInstance().get(`/user/stats/total`);
    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserMonthStatesApi = async () => {
  try {
    const response = await manageInstance().get(`/user/stats/month`);
    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserDateStatsApi = async () => {
  try {
    const response = await manageInstance().get(`/user/stats/date`);
    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserYearStatsApi = async () => {
  try {
    const response = await manageInstance().get(`/user/stats/year`);
    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllInquiryListApi = async () => {
  try {
    const response = await adminInstance().get(`/inquiry/all`);
    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
