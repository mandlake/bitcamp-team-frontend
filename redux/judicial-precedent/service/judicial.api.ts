"use client";

import instance from "@/components/config/judicial-config";

export const getCaseLawListApi = async () => {
  try {
    const response = await instance().get("/caselaw/list", {});

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
