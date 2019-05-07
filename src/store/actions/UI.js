import * as actionTypes from "./actionTypes";

export const showLayer = bool => ({
  type: actionTypes.SHOW_LAYER,
  bool
});

export const startLoading = bool => ({
  type: actionTypes.START_LOADING,
  bool
});
