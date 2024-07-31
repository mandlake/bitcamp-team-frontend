import { ISse } from "./issue";

export const initialState: ISse = {
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
  attachment: "",
  json: {},
  array: [],
};
