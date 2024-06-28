import { createAction } from "redux-actions";
export const lawyersConstants = {
  LAWYERS_REQUEST: "LAWYERS_REQUEST",
  LAWYERS_SUCCESS: "LAWYERS_SUCCESS",
  LAWYERS_FAILURE: "LAWYERS_FAILURE",
};
export const getUsersRequest = createAction(lawyersConstants.LAWYERS_REQUEST);
export const getUsersSuccess = createAction(lawyersConstants.LAWYERS_SUCCESS);
export const getUsersFailure = createAction(lawyersConstants.LAWYERS_FAILURE);
