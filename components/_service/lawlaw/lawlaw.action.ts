import { createAction } from "redux-actions";
export const lawlawConstants = {
  LAWLAW_REQUEST: "LAWLAW_REQUEST",
  LAWLAW_SUCCESS: "LAWLAW_SUCCESS",
  LAWLAW_FAILURE: "LAWLAW_FAILURE",
};
export const getUsersRequest = createAction(lawlawConstants.LAWLAW_REQUEST);
export const getUsersSuccess = createAction(lawlawConstants.LAWLAW_SUCCESS);
export const getUsersFailure = createAction(lawlawConstants.LAWLAW_FAILURE);
