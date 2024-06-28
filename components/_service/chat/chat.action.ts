import { createAction } from "redux-actions";
export const chatConstants = {
  CHAT_REQUEST: "CHAT_REQUEST",
  CHAT_SUCCESS: "CHAT_SUCCESS",
  CHAT_FAILURE: "CHAT_FAILURE",
};
export const getJudicialRequest = createAction(chatConstants.CHAT_REQUEST);
export const getJudicialSuccess = createAction(chatConstants.CHAT_SUCCESS);
export const getJudicialFailure = createAction(chatConstants.CHAT_FAILURE);
