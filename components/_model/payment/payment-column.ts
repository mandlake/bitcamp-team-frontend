export interface PaymentColumn {
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
  product?: number;
  array?: [];
}
