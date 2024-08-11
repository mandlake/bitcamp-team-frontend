import { lawyerInstance, userInstance } from "@/components/config/axios-config";

export const getQnaBoardListApi = async () => {
  try {
    const response = await userInstance().get(`/questions/all`);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findQnaBoardByIdApi = async (id: number) => {
  try {
    const response = await userInstance().get(`/questions/${id}`);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findReplyByArticleIdApi = async (articleId: string) => {
  try {
    const response = await lawyerInstance().get(
      `/questions/replies/${articleId}`
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const saveQuestionsApi = async (data: any) => {
  try {
    const response = await lawyerInstance().post(`/user/questions/save`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// 포스트아이디로 포스트 찾기
export const getPostByIdApi = async (id: string) => {
  try {
    const response = await lawyerInstance().get(`posts/find/${id}`);

    console.log("Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};
