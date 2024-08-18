import { createAsyncThunk } from "@reduxjs/toolkit";
import { SaveAPI, findAllPremiumAPI, findPremiumByIdAPI } from "./premium-api";
import { IPremium } from "@/components/_model/premium/premium";

export const savePremium: any = createAsyncThunk(
  "/premium/savePremium",
  async (premium: IPremium) => await SaveAPI(premium)
);

export const findAllPremiums: any = createAsyncThunk(
  "/premium/findAllPremiums",
  async (page: number) => {
    console.log("findAllPremiums page: " + page);
    const data: any = await findAllPremiumAPI(page);

    const { message, result }: any = data;
    return data;
  }
);
export const findPremiumById: any = createAsyncThunk(
  "/premium/findPremiumById",
  async (id: number) => {
    console.log("findPremiumById id: " + id);
    const data: any = await findPremiumByIdAPI(id);

    const { message, result }: any = data;
    return data;
  }
);
