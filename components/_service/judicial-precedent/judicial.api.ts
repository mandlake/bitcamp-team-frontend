"use client";

import { ISerialNumber } from "@/components/_model/manage/manage";
import { manageInstance } from "@/components/config/axios-config";

export const getCaseLawListApi = async () => {
  try {
    const response = await manageInstance().get("/caselaw/all", {});

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCaseLawBySerialNoApi = async (serialNo: string) => {
  try {
    const response = await manageInstance().get(`/caselaw/${serialNo}`, {
      params: { serialNo },
    });

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getsearchCaseLawsApi = async (numbers: ISerialNumber) => {
  try {
    const response = await manageInstance().post("/caselaw/search", numbers);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
