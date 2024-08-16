import { createSlice } from "@reduxjs/toolkit";
import { saveLawPayment } from "./lawpayment-service";
import { ILawPayment } from "@/components/_model/lawpayment/lawpayment";

const lawPaymentThunks = [saveLawPayment];

const status = {
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
};

interface LawPaymentState {
  array?: Array<ILawPayment>;
  json?: ILawPayment;
}

export const initialState: LawPaymentState = {
  json: {} as ILawPayment,
  array: [],
};

export const lawPaymentSlice = createSlice({
  name: "lawPayments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { pending, rejected } = status;

    builder.addCase(saveLawPayment.fulfilled, (state: any, { payload }: any) => {
      state.json = payload;
    });
  },
});

export const getLawPaymentById = (state: any) => state.lawPayment?.json;
export const getAllLawPayments = (state: any) => state.lawPayment.array;
export const cancelLawPayment = (state: any) => state.lawPayment.json;
export const confirmLawPayment = (state: any) => state.lawPayment.json;

export const {} = lawPaymentSlice.actions;

export default lawPaymentSlice.reducer;
