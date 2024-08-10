import { createAction } from "redux-actions";
export const adminConstants = {
  ADMIN_REQUEST: "ADMIN_REQUEST",
  ADMIN_SUCCESS: "ADMIN_SUCCESS",
  ADMIN_FAILURE: "ADMIN_FAILURE",
};
export const getAdminRequest = createAction(adminConstants.ADMIN_REQUEST);
export const getAdminSuccess = createAction(adminConstants.ADMIN_SUCCESS);
export const getAdminFailure = createAction(adminConstants.ADMIN_FAILURE);
