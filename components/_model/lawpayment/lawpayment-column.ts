export interface LawPaymentColumn {
  id?: number;
  lawyer?: string;
  imp_uid?: string;
  status?: string;
  amount?: number;
  premium?: {
    id?: number;
  };
  start_date?: string;
  expire_date?: string;
  is_expired?: boolean;
  array?: [];
}
