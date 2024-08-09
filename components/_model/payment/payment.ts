export interface IPayment {
  id?: number;
  lawyer?: string;
  impUid?: string;
  status?: string;
  item_name?: string;
  amount?: number;
  buyer?:{
      id?: number;
  } ;
  product?:{
      id?: number;
  } ;
  }