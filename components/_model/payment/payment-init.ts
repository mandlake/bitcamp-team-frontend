import { IPayment } from "./payment";

export const initialState: IPayment = {
  id: 0,
  lawyer: "",
  impUid: "",
  status: "",
  buyer: {
    id: 0,
  },
  product: {
    id: 0,
  },
};
