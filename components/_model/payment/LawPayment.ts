import { IPremium } from "./Premium";

export interface ILawPayment {
  id: number;
  premium: IPremium;
  paymentUid: string;
}
