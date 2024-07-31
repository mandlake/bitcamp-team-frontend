import { createAsyncThunk } from "@reduxjs/toolkit";
import { SaveAPI, findAllProductAPI, findProductByIdAPI } from "./product-api";
import { IProduct } from "@/components/_model/product/product";

export const saveProduct: any = createAsyncThunk(
  "/product/saveProduct",
  async (product: IProduct) => await SaveAPI(product)
);

export const findAllProducts: any = createAsyncThunk(
  "/product/findAllProducts",
  async (page: number) => {
    console.log("findAllProducts page: " + page);
    const data: any = await findAllProductAPI(page);

    const { message, result }: any = data;
    return data;
  }
);
export const findProductById: any = createAsyncThunk(
  "/product/findProductById",
  async (id: number) => {
    console.log("findProductById id: " + id);
    const data: any = await findProductByIdAPI(id);

    const { message, result }: any = data;
    return data;
  }
);
