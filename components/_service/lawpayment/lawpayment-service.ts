import { ILawPayment } from "@/components/_model/lawpayment/lawpayment";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { lawPaymentStatusAPI, SaveAPI, findLawPaymentByLawyerAPI } from "./lawpayment-api";

export const saveLawPayment: any = createAsyncThunk(
  "/lawPayment/saveLawPayment",
  async (lawPayment: ILawPayment) => await SaveAPI(lawPayment)
);

export const lawPaymentStatus: any = createAsyncThunk(
  "/lawpayment/lawPaymentStatus",
  async (lawPayment: ILawPayment, { rejectWithValue }) =>
    await lawPaymentStatusAPI(lawPayment)
);

export const confirmLawPayment: any = createAsyncThunk(
  "/lawPayment/confirmLawPayment",
  async (lawPayment: ILawPayment) => await lawPaymentStatusAPI(lawPayment)
);

export const cancelLawPayment: any = createAsyncThunk(
  "/lawPayment/cancelLawPayment",
  async (lawPayment: ILawPayment) => await lawPaymentStatusAPI(lawPayment)
);

export const getLawPaymentByLawyerId: any = createAsyncThunk(
  "/lawPayment/findLawyer",
  async (id: any) => {
    const data: any = await findLawPaymentByLawyerAPI(id);
    console.log("data: " + data);
    return data;
    }
);
