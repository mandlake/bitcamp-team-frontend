import { IPremium } from "@/components/_model/premium/premium";
import { userInstance } from "@/components/config/axios-config";

export const SaveAPI = async (premium: IPremium) => {
  console.log(`Premium API parameter: ${JSON.stringify(premium)}`);
  try {
    const response = await userInstance().post("premium/save", premium);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findProuctByIdAPI = async (id: number) => {
  try {
    const response = await userInstance().get(`/${id}`);
    console.log("MY-INFO: premium/detail " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findAllPremiumAPI = async (page: number) => {
  try {
    const response = await userInstance().get("premium/all", {
      params: { page, limit: 10 },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findPremiumByIdAPI = async (id: number) => {
  try {
    const response = await userInstance().get(`premium/${id}`, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
