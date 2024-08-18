export interface ILawPayment {
  id?: number;
  lawyer?: string;
  impUid?: string;
  status?: string;
  amount?: number;
  premium?: {
    id?: number;
  };
  startDate?: string;
  expireDate?: string;
  isExpired?: boolean;
}