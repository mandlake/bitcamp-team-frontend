import { IUser } from "./user";
import { IAuth } from "./auth";

export interface userState {
  array?: Array<IUser>;
  json?: JSON;
  auth?: IAuth;
}
