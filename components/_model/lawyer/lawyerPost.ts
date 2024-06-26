import { ILawyer } from "./lawyer";

export interface ILawyerPost {
  id: number;
  lawyer?: ILawyer;
  title: string;
  content: string;
  regDate: string;
  modDate: string;
}
