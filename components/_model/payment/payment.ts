export interface IPayment {
  id?: number;
  lawyer?: {
    id?: number;
  };
  payment_uid?: number;
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
