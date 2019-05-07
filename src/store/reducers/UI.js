import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  showLayer: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.START_LOADING:
    return {
      ...state,
      isLoading: action.bool
    };
  case actionTypes.SHOW_LAYER:
    return {
      ...state,
      showLayer: action.bool
    };
  default:
    return state;
  }
};

export default reducer;
