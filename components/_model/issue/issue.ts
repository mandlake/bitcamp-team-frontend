export interface Issue {
  id?: number;
  law?: string; // lawmate
  title?: string;
  content?: string;
  writerId?: number;
  boardId?: number;
  date?: string;
  time?: string;
  client?: {
    id?: number;
  };
  regDate?: string;
  modDate?: string;
  json?: {};
  array?: Issue[];
}
