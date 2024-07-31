import { IPayment } from "./payment";

export const initialState: IPayment = {
  id: 0,
  lawyer: {
    id: 0,
  },
  payment_uid: 0,
  status: "",
  buyer: {
    id: 0,
  },
  product: {
    id: 0,
  },
};
