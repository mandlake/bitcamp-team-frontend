import { IUser } from "@/components/_model/user/user";

export interface IQuestionBoard {
  id: number;
  writer: IUser;
  law: string;
  title: string;
  content: string;
}
