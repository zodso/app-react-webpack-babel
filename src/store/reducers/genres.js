import * as actionTypes from "../actions/actionTypes";

const initialState = {
  genres: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.RECEIVE_GENRES:
    return {
      ...state,
      genres: action.genres
    };
  default:
    return state;
  }
};

export default reducer;
