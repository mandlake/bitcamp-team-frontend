import { createAction } from "redux-actions";
export const userConstants = {
  USERS_REQUEST: "USERS_REQUEST",
  USERS_SUCCESS: "USERS_SUCCESS",
  USERS_FAILURE: "USERS_FAILURE",
};
export const getUsersRequest = createAction(userConstants.USERS_REQUEST);
export const getUsersSuccess = createAction(userConstants.USERS_SUCCESS);
export const getUsersFailure = createAction(userConstants.USERS_FAILURE);
