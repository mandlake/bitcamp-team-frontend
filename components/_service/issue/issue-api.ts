import { ISse } from "@/components/_model/issue/issue";
import { userInstance } from "@/components/config/axios-config";

export const findAllIssuesAPI = async (page: number) => {
  try {
    const response = await userInstance().get("issues/all", {
      params: { page, limit: 10 },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findIssueByIdAPI = async (id: number) => {
  try {
    const response = await userInstance().get(`issues/${id}`, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findCountIssuesAPI = async () => {
  try {
    return (await userInstance().get(`/issues/count`)).data;
  } catch (error) {
    return error;
  }
};

export const saveIssueAPI = async (issue: ISse) => {
  console.log(`parameter in saveIssue: ${JSON.stringify(issue)}`);
  try {
    return (await userInstance().post(`issues/save`, issue)).data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteIssueAPI = async (id: number) => {
  try {
    await userInstance().delete(`/issues/${id}`, {
      params: { id },
    });
  } catch (error) {
    return error;
  }
};

export const modifyIssueAPI = async (id: number) => {
  try {
    await userInstance().put(`/issues/${id}`, {
      params: { id },
    });
  } catch (error) {
    return error;
  }
};

export const createEventSource = (
  url: string,
  onMessage: (data: any) => void
) => {
  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    onMessage(JSON.parse(event.data));
  };

  eventSource.onerror = (error) => {
    console.error("Error occurred:", error);
    eventSource.close();
  };

  return eventSource;
};
