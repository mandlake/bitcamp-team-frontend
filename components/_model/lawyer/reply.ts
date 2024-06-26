import { ILawyer } from "./lawyer";

export interface IReply {
  id: number;
  lawyer?: ILawyer;
  answer: string;
  regDate: string;
  modDate: string;
}
