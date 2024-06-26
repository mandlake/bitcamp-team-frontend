import { ILawPayment } from "../LawPayment";
import { IPremium } from "../Premium";

export const initialState: ILawPayment = {
  id: 0,
  premium: {} as IPremium,
  paymentUid: "",
};
