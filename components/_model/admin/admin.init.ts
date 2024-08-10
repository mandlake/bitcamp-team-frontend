import { IAdmin, IAdminBoard, ISendBulkMail, ISendMail } from "./admin";

export const initialIAdmin: IAdmin = {
  id: 0,
  email: "",
  password: "",
  role: "",
  username: "",
  name: "",
};

export const initialISendMail: ISendMail = {
  id: 0,
  to: "",
  subject: "",
  text: "",
};

export const initialISendBulkMail: ISendBulkMail = {
  id: 0,
  reciepts: "",
  subject: "",
  text: "",
};

export const initialIAdminBoard: IAdminBoard = {
  id: "",
  title: "",
  content: "",
  writer: "",
  viewCount: 0,
  files: [],
  createdDate: "",
  modifiedDate: "",
};
