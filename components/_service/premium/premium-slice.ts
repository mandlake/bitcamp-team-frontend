import { createSlice } from "@reduxjs/toolkit";
import {
  savePremium,
  findAllPremiums,
  findPremiumById,
} from "./premium-service";
import { IPremium } from "@/components/_model/premium/premium";

const premiumThunks = [findAllPremiums, savePremium, findPremiumById];

const status = {
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
};

interface PremiumState {
  array?: Array<IPremium>;
  json?: IPremium;
}

export const initialState: PremiumState = {
  json: {} as IPremium,
  array: [],
};

export const premiumSlice = createSlice({
  name: "premiums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { pending, rejected } = status;

    builder
      .addCase(savePremium.fulfilled, (state: any, { payload }: any) => {
        state.json = payload;
      })
      .addCase(findAllPremiums.fulfilled, (state: any, { payload }: any) => {
        state.array = payload;
      })
      .addCase(findPremiumById.fulfilled, (state: any, { payload }: any) => {
        state.json = payload;
      });
  },
});

export const getPremiumById = (state: any) => state.premium?.json;
export const getAllPremiums = (state: any) => state.premium?.array;

export const {} = premiumSlice.actions;

export default premiumSlice.reducer;
