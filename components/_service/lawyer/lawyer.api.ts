"use server";

import { ILawyer, ILawyerDetail } from "@/components/_model/lawyer/lawyer";
import { lawyerInstance } from "@/components/config/axios-config";

export const lawyerLoginApi = async (lawyer: ILawyer) => {
  try {
    const response = await lawyerInstance().post("/login", lawyer);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const lawyerLogoutApi = async () => {
  try {
    const response = await lawyerInstance().get("/logout");

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const lawyerJoinApi = async (lawyer: ILawyer) => {
  try {
    const response = await lawyerInstance().post(
      "/save",
      JSON.stringify(lawyer)
    );

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const lawyerSaveDetailApi = async (lawyer: ILawyerDetail) => {
  try {
    const response = await lawyerInstance().post(
      `saveDetail/${lawyer.id}`,
      lawyer
    );

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllLawyerApi = async () => {
  try {
    const response = await lawyerInstance().get("/all");

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getLawyerByIdApi = async (id: number) => {
  try {
    const response = await lawyerInstance().get(`/${id}`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getLawyerDetailByIdApi = async (id: number) => {
  try {
    const response = await lawyerInstance().get(`/detail/${id}`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateLawyerApi = async (lawyer: ILawyer) => {
  try {
    const response = await lawyerInstance().patch(`/${lawyer.id}`, lawyer);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateDetailLawyerApi = async (lawyer: ILawyerDetail) => {
  try {
    const response = await lawyerInstance().patch(
      `/detail/${lawyer.id}`,
      lawyer
    );

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteLawyerApi = async (id: number) => {
  try {
    const response = await lawyerInstance().delete(`/${id}`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const insertLawyerApi = async (lawyer: ILawyer) => {
  try {
    const response = await lawyerInstance().post(
      `posts/save/${lawyer.id}`,
      lawyer
    );

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
