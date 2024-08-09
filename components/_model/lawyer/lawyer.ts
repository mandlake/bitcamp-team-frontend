import { IUser } from "../user/user";

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
  posts?: ILawyerPost;
  files?: ILawyerFile;
  replies?: ILawyerReply;
  reservations?: {};
  notices?: {};
  detail?: ILawyerDetail;
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

// 파일 Axios
export interface ILawyerFile {
  id: string;
  filename: string;
  contentType: string;
  url: string;
  lawyerId: string;
  postId: string;
  createdDate: string;
  modifiedDate: string;
}
// 포스트 Axios
export interface ILawyerPost {
  id: string;
  title: string;
  content: string;
  category: string;
  lawyerId: string;
  createdDate: string;
  modifiedDate: string;
  fileUrls: string[];
}
// 댓글 Axios
export interface ILawyerReply {
  id: string;
  content: string;
  articleId: string;
  lawyerId: string;
  createdDate: string;
  modifiedDate: string;
}

export interface ILawyerQuestion {
  id: string;
  law: string;
  title: string;
  content: string;
  writer: IUser;
}
