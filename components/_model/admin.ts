export interface IAdmin {
  id: number;
  email?: string;
  password?: string;
  role?: string;
  username?: string;
  name?: string;
}

export interface IKeyword {
  id: number;
  keyword?: string;
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
