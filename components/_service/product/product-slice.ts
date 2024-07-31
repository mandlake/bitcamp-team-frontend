import { createSlice } from "@reduxjs/toolkit";
import {
  saveProduct,
  findAllProducts,
  findProductById,
} from "./product-service";
import { IProduct } from "@/components/_model/product/product";

const productThunks = [findAllProducts, saveProduct, findProductById];

const status = {
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
};

interface ProductState {
  array?: Array<IProduct>;
  json?: IProduct;
}

export const initialState: ProductState = {
  json: {} as IProduct,
  array: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { pending, rejected } = status;

    builder
      .addCase(saveProduct.fulfilled, (state: any, { payload }: any) => {
        state.json = payload;
      })
      .addCase(findAllProducts.fulfilled, (state: any, { payload }: any) => {
        state.array = payload;
      })
      .addCase(findProductById.fulfilled, (state: any, { payload }: any) => {
        state.json = payload;
      });
  },
});

export const getProductById = (state: any) => state.product?.json;
export const getAllProducts = (state: any) => state.product?.array;

export const {} = productSlice.actions;

export default productSlice.reducer;
