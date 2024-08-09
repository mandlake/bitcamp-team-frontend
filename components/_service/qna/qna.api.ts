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

export const findReplyByArticleIdApi = async (id: string) => {
  try {
    const response = await lawyerInstance().get(`/questions/replies/${id}`);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const saveQuestionsApi = async (data: any) => {
  try {
    const response = await lawyerInstance().post(`/questions/save`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
