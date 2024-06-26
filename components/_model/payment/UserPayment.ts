import { IUser } from "@/components/_model/user/user";
import { IProduct } from "./Product";

export interface IUserPayment {
  id: number;
  buyer: IUser;
  product: IProduct;
  paymentUid: string;
  status: boolean;
}
