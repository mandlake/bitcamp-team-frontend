import { IUser } from "@/components/_model/user/user";
import { IUserPayment } from "../UserPayment";
import { IProduct } from "../Product";

export const initialState: IUserPayment = {
  id: 0,
  buyer: {} as IUser,
  product: {} as IProduct,
  paymentUid: "",
  status: false,
};
