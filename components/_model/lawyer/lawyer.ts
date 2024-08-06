export interface ILawyer {
  id: number;
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  birth?: string;
  lawyerNo?: string;
  account?: string;
  mid?: string;
  auth?: boolean;
  createdDate?: string;
  modifiedDate?: string;
  posts?: {};
  files?: {};
  replies?: {};
  reservations?: {};
  notices?: {};
  detail?: {};
}

export interface ILawyerDetail {
  id: string;
  belong?: string;
  address?: string;
  addressDetail?: string;
  belongPhone?: string;
  law?: string;
  visitCost?: string;
  phoneCost?: string;
  videoCost?: string;
  university?: string;
  major?: string;
  premium?: boolean;
  createdDate?: string;
  modifiedDate?: string;
  time?: string;
}
