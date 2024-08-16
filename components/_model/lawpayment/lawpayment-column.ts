export interface LawPaymentColumn {
  id?: number;
  lawyer?: string;
  imp_uid?: string;
  status?: string;
  amount?: number;
  premium?: {
    id?: number;
  };
  array?: [];
}
