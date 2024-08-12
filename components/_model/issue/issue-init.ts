import { Issue } from "./issue";

export const initialState: Issue = {
  id: 0,
  law: "",
  title: "",
  content: "",
  client: {
    id: 0,
  },
  boardId: 0,
  regDate: "",
  modDate: "",
  date: "",
  time: "",
  json: {},
  array: [],
};
