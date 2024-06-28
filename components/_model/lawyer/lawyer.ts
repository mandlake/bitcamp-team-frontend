export interface ILawyer {
  id: number;
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  birth?: string;
  lawyerNo?: string;
  mid?: string;
  auth?: string;
  posts?: any;
  replies?: any;
  reservations?: any;
  notices?: any;
  detail?: ILawyerDetail;
}

export interface ILawyerDetail {
  id: string;
  belong?: string;
  address?: string;
  addressDetail?: string;
  belongPhone?: string;
  image?: string;
  pdf?: string;
  sign?: string;
  law?: string;
  visitCost?: string;
  phoneCost?: string;
  videoCost?: string;
  university?: string;
  major?: string;
  premium?: boolean;
}
