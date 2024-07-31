export interface ISse {
  id?: number;
  law?: string; // lawmate
  title?: string;
  content?: string;
  writerId?: number;
  boardId?: number;
  attachment: string;
  client?: {
    id?: number;
  };
  regDate?: string;
  modDate?: string;
  json?: {};
  array?: ISse[];
}
