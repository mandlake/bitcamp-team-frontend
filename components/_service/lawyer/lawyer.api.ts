"use server";

import { ILawyer, ILawyerDetail } from "@/components/_model/lawyer/lawyer";
import {
  lawyerFileInstance,
  lawyerInstance,
} from "@/components/config/axios-config";

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

export const getLawyerByIdApi = async (id: string) => {
  try {
    const response = await lawyerInstance().get(`/${id}`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getLawyerByUsernameApi = async (username: string) => {
  try {
    const response = await lawyerInstance().get(`/username/${username}`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getLawyerDetailByUsernameApi = async (username: string) => {
  try {
    const response = await lawyerInstance().get(`/detail/username/${username}`);

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

// 파일 업로드
export const uploadFilesApi = async (
  lawyerId: string,
  files: File[]
): Promise<File[]> => {
  try {
    const formData = new FormData();
    files.forEach((file: File) => {
      formData.append("files", file as any);
    });

    const response = await lawyerInstance().post(
      `/files/upload/${lawyerId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Upload success");
    return response.data;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

// 파일 다운로드
export const downloadFileApi = async (id: string): Promise<Blob> => {
  try {
    const response = await lawyerInstance().get(`/files/download/${id}`, {
      responseType: "blob",
    });

    console.log("Download success");
    return response.data;
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  }
};

// 변호사아이디로 업로드한 파일 가져오기
export const getFilesByLawyerIdApi = async (
  lawyerId: string
): Promise<File[]> => {
  try {
    const response = await lawyerInstance().get(`/files/${lawyerId}`);
    console.log("Get files success");
    return response.data;
  } catch (error) {
    console.error("Get files error:", error);
    throw error;
  }
};

// 파일 삭제
export const deleteFileApi = async (id: string): Promise<void> => {
  try {
    await lawyerInstance().delete(`/files/${id}`);
    console.log("Delete file success");
  } catch (error) {
    console.error("Delete file error:", error);
    throw error;
  }
};

export const getLawyersByLawApi = async (law: string) => {
  try {
    const response = await lawyerInstance().get(`/law`, { params: { law } });

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const searchLawyerApi = async (search: string) => {
  try {
    const response = await lawyerInstance().get(`/search`, {
      params: { search },
    });

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
