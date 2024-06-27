import { ILawyer } from "../lawyer/lawyer";

export interface IColumnPost {
  id: number;
  title: string;
  content: string;
  lawyer: ILawyer;
}
