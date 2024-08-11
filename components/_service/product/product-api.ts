import { IProduct } from "@/components/_model/product/product";
import { userInstance } from "@/components/config/axios-config";

export const SaveAPI = async (product: IProduct) => {
  console.log(`Product API parameter: ${JSON.stringify(product)}`);
  try {
    const response = await userInstance().post("product/save", product);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findProuctByIdAPI = async (id: number) => {
  try {
    const response = await userInstance().get(`/${id}`);
    console.log("MY-INFO: product/detail " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findAllProductAPI = async (page: number) => {
  try {
    const response = await userInstance().get("product/all", {
      params: { page, limit: 10 },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findProductByIdAPI = async (id: number) => {
  try {
    const response = await userInstance().get(`product/${id}`, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
