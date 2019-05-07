import * as actionTypes from "../actions/actionTypes";

const initialState = {
  movie: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.RECEIVE_MOVIE:
    return {
      ...state,
      movie: action.movie
    };
  default:
    return state;
  }
};

export default reducer;
