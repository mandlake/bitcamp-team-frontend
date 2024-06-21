import { createAction } from "redux-actions";
export const judicialConstants = {
  JUDICIAL_PRECEDENT_REQUEST: "JUDICIAL_PRECEDENT_REQUEST",
  JUDICIAL_PRECEDENT_SUCCESS: "JUDICIAL_PRECEDENT_SUCCESS",
  JUDICIAL_PRECEDENT_FAILURE: "JUDICIAL_PRECEDENT_FAILURE",
};
export const getJudicialRequest = createAction(
  judicialConstants.JUDICIAL_PRECEDENT_REQUEST
);
export const getJudicialSuccess = createAction(
  judicialConstants.JUDICIAL_PRECEDENT_SUCCESS
);
export const getJudicialFailure = createAction(
  judicialConstants.JUDICIAL_PRECEDENT_FAILURE
);
