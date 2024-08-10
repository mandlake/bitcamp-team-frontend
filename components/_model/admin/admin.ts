export interface IAdmin {
  id: number;
  email?: string;
  password?: string;
  role?: string;
  username?: string;
  name?: string;
  enabled?: boolean;
}

export interface ISendMail {
  id: number;
  to?: string;
  subject?: string;
  text?: string;
}

export interface ISendBulkMail {
  id: number;
  reciepts?: string;
  subject?: string;
  text?: string;
}

export interface IAdminBoard {
  id?: string;
  title?: string;
  content?: string;
  writer?: string;
  viewCount?: number;
  files: [];
  createdDate?: string;
  modifiedDate?: string;
}
