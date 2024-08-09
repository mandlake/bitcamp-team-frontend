export interface PaymentColumn {
  id?: number;
  lawyer?: string;
  imp_uid?: string;
  status?: string;
  item_name?: string;
  amount?: number;
  buyer?: {
    id?: number;
  };
  product?: number;
  array?: [];
}
