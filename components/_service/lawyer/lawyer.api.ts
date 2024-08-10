"use server";

import {
  ILawyer,
  ILawyerDetail,
  ILawyerPost,
  ILawyerReply,
  ILawyerQuestion,
} from "@/components/_model/lawyer/lawyer";
import { instance,
  lawyerInstance } from "@/components/config/axios-config";

export const lawyerLoginApi = async (lawyer: ILawyer) => {
  try {
    const response = await instance().post("/auth/lawyer/login", lawyer);

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

export const getLawyersByLawApi = async (laws: string[]): Promise<void> => {
  try {
    const response = await lawyerInstance().get("/law", {
      params: { law: laws },
    });

    console.log("Lawyers found:", response.data);
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    throw error;
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

// 포스트 생성
export const createPostApi = async (
  lawyerId: string,
  post: ILawyerPost,
  files: File[]
): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("post", JSON.stringify(post));

    files.forEach((file: File) => {
      formData.append("files", file as any);
    });

    const response = await lawyerInstance().post(
      `/posts/save/${lawyerId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Create post success");
    return response.data;
  } catch (error) {
    console.error("Create post error:", error);
    throw error;
  }
};

// 변호사아이디로 작성 포스트 찾기
export const getPostsByLawyerIdApi = async (
  lawyerId: string
): Promise<ILawyerPost[]> => {
  try {
    const response = await lawyerInstance().get(`/posts/${lawyerId}`);
    console.log("Get posts success");
    return response.data;
  } catch (error) {
    console.error("Get posts error:", error);
    throw error;
  }
};

// 포스트 수정
export const updatePostApi = async (
  postId: string,
  updatedPost: ILawyerPost,
  files: File[]
): Promise<ILawyerPost> => {
  try {
    const formData = new FormData();
    formData.append("post", JSON.stringify(updatedPost));

    files.forEach((file: File) => {
      formData.append("files", file as any);
    });

    const response = await lawyerInstance().patch(
      `/posts/${postId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Update post success");
    return response.data;
  } catch (error) {
    console.error("Update post error:", error);
    throw error;
  }
};

// 포스트 삭제
export const deletePostApi = async (id: string): Promise<void> => {
  try {
    await lawyerInstance().delete(`/posts/${id}`);
    console.log("Delete post success");
  } catch (error) {
    console.error("Delete post error:", error);
    throw error;
  }
};

// 포스트 내 파일 다운로드
export const downloadPostFileApi = async (url: string): Promise<Blob> => {
  try {
    const response = await lawyerInstance().get(`/posts/download`, {
      params: { url },
      responseType: "blob",
    });

    console.log("Download file success");
    return response.data;
  } catch (error) {
    console.error("Download file error:", error);
    throw error;
  }
};

// 답변 생성
export const createReplyApi = async (
  lawyerId: string,
  articleId: string,
  reply: Omit<ILawyerReply, "articleId">
): Promise<ILawyer> => {
  try {
    const response = await lawyerInstance().post(`/replies/save/${lawyerId}`, {
      ...reply,
      articleId: articleId,
    });

    console.log("Create reply success");
    return response.data;
  } catch (error) {
    console.error("Create reply error:", error);
    throw error;
  }
};

// 변호사아이디로 작성한 댓글 찾기
export const getRepliesByLawyerIdApi = async (
  lawyerId: string
): Promise<ILawyerReply[]> => {
  try {
    const response = await lawyerInstance().get(`/replies/${lawyerId}`);
    console.log("Get replies success");
    return response.data;
  } catch (error) {
    console.error("Get replies error:", error);
    throw error;
  }
};

// 댓글 수정
export const updateReplyApi = async (
  id: string,
  reply: ILawyerReply
): Promise<ILawyerReply> => {
  try {
    const response = await lawyerInstance().patch(`/replies/${id}`, reply);

    console.log("Update reply success");
    return response.data;
  } catch (error) {
    console.error("Update reply error:", error);
    throw error;
  }
};

// 댓글 삭제
export const deleteReplyApi = async (id: string): Promise<void> => {
  try {
    await lawyerInstance().delete(`/replies/${id}`);
    console.log("Delete reply success");
  } catch (error) {
    console.error("Delete reply error:", error);
    throw error;
  }
};

export const resetPasswordApi = async (lawyerNo: string): Promise<void> => {
  try {
    await lawyerInstance().post("/resetPassword", {
      params: { lawyerNo },
    });
    console.log("Reset password success");
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
};
// 알림 스트림 구독
export const subscribeToNotifications = (userId: string) => {
  const eventSource = new EventSource(`/notifications/${userId}`);

  eventSource.onmessage = (event) => {
    console.log("New notification:", event.data);
  };

  eventSource.onerror = (err) => {
    console.error("EventSource failed:", err);
  };

  return eventSource;
};

// 알림 수락
export const acceptNotification = async (userId: string): Promise<void> => {
  try {
    await lawyerInstance().post("/notifications/accept", {
      params: { userId },
    });
    console.log("Notification accepted");
  } catch (error) {
    console.error("Error accepting notification:", error);
    throw error;
  }
};

// 알림 거절
export const rejectNotification = async (userId: string): Promise<void> => {
  try {
    await lawyerInstance().post("/notifications/reject", {
      params: { userId },
    });
    console.log("Notification rejected");
  } catch (error) {
    console.error("Error rejecting notification:", error);
    throw error;
  }
};

// 사용자 Sink 제거
export const removeUserSink = async (userId: string): Promise<void> => {
  try {
    await lawyerInstance().delete(`/notifications/${userId}`);
    console.log("User sink removed");
  } catch (error) {
    console.error("Error removing user sink:", error);
    throw error;
  }
};

export const getLawyersByLaw = async (laws: string[]): Promise<void> => {
  try {
    const response = await lawyerInstance().get("/law", {
      params: { law: laws },
    });

    console.log("Lawyers found:", response.data);
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    throw error;
  }
};

export const getRepliesByArticleIdApi = async (
  articleId: string
): Promise<ILawyerReply[]> => {
  try {
    const response = await lawyerInstance().get(
      `/replies/article/${articleId}`
    );
    console.log("Get replies success");
    return response.data;
  } catch (error) {
    console.error("Get replies error:", error);
    throw error;
  }
};
