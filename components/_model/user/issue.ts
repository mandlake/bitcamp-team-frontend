import { IUser } from "./user";

export interface IIssue {
  id: number;
  client?: IUser;
  law?: string;
  title?: string;
  content?: string;
  attachment?: string;
}
