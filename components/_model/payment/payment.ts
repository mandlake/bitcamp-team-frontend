export interface IPayment {
  payment_uid?: number;
  id?: number;
  lawyer?: string;
  impUid?: string;
  status?: string;
  item_name?: string;
  amount?: number;
  buyer?: {
    id?: number;
  };
  product?: {
    id?: number;
  };
}
