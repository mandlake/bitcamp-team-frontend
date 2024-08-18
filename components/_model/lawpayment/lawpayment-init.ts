import { ILawPayment } from "./lawpayment";

export const initialState: ILawPayment = {
  id: 0,
  lawyer: "",
  impUid: "",
  status: "",
  amount: 0,
  premium: {
    id: 0,
  },
  startDate: "",
  expireDate: "",
  isExpired: false
};
