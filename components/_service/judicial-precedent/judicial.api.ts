"use client";

import {
  ISerialNumber,
  SearchCriteriaDto,
} from "@/components/_model/manage/manage";
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

// 판례 조회 서비스
// 전체 판례 조회
export const getAllCaseLaws = async () => {
  try {
    const response = await manageInstance().get("/caselaw/all");
    console.log("Fetched all case laws successfully");
    return response.data;
  } catch (error) {
    console.error("Error fetching case laws:", error);
    throw error;
  }
};
// 시리얼 넘버로 판례 조회
export const getCaseLawDetail = async (serialNumber: string) => {
  try {
    const response = await manageInstance().get(`/caselaw/${serialNumber}`);
    console.log(`Fetched case law detail for serial number: ${serialNumber}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching case law detail for serial number: ${serialNumber}`,
      error
    );
    throw error;
  }
};

//키워드로 판례 검색
export const searchCaseLaws = async (searchCriteria: SearchCriteriaDto) => {
  try {
    const response = await manageInstance().post(
      "/caselaw/search",
      searchCriteria
    );
    console.log("Searched case laws successfully");
    return response.data;
  } catch (error) {
    console.error("Error searching case laws:", error);
    throw error;
  }
};

// 통계 서비스
// 일별 사용자 통계 저장
export const saveUserStats = async (): Promise<void> => {
  try {
    await manageInstance().get("/user/stats/save");
    console.log("Saved user stats successfully");
  } catch (error) {
    console.error("Error saving user stats:", error);
    throw error;
  }
};

// 일별 사용자 통계 조회
export const getUserStatsByDate = async () => {
  try {
    const response = await manageInstance().get("/user/stats/date");
    console.log("Fetched user stats by date successfully");
    return response.data;
  } catch (error) {
    console.error("Error fetching user stats by date:", error);
    throw error;
  }
};

// 월별 사용자 통계 조회
export const getUserStatsByMonth = async () => {
  try {
    const response = await manageInstance().get("/user/stats/month");
    console.log("Fetched user stats by month successfully");
    return response.data;
  } catch (error) {
    console.error("Error fetching user stats by month:", error);
    throw error;
  }
};

// 연도별 사용자 통계 조회
export const getUserStatsByYear = async () => {
  try {
    const response = await manageInstance().get("/user/stats/year");
    console.log("Fetched user stats by year successfully");
    return response.data;
  } catch (error) {
    console.error("Error fetching user stats by year:", error);
    throw error;
  }
};

// 총 사용자 통계 조회
export const getUserTotalStats = async () => {
  try {
    const response = await manageInstance().get("/user/stats/total");
    console.log("Fetched total user stats successfully");
    return response.data;
  } catch (error) {
    console.error("Error fetching total user stats:", error);
    throw error;
  }
};
