import { createSlice } from "@reduxjs/toolkit";
import { savePayment } from "./payment-service";
import { IPayment } from "@/components/_model/payment/payment";

const paymentThunks = [savePayment];

const status = {
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
};

interface PaymentState {
  array?: Array<IPayment>;
  json?: IPayment;
}

export const initialState: PaymentState = {
  json: {} as IPayment,
  array: [],
};

export const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { pending, rejected } = status;

    builder.addCase(savePayment.fulfilled, (state: any, { payload }: any) => {
      state.json = payload;
    });
  },
});

export const getPaymentById = (state: any) => state.payment?.json;
export const getAllPayments = (state: any) => state.payment.array;
export const cancelPayment = (state: any) => state.payment.json;
export const confirmPayment = (state: any) => state.payment.json;

export const {} = paymentSlice.actions;

export default paymentSlice.reducer;
