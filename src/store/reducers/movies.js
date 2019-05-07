import * as actionTypes from "../actions/actionTypes";

const initialState = {
  movies: {},
  isLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.REQUEST_MOVIES:
    return {
      ...state,
      isLoading: true
    };
  case actionTypes.RECEIVE_MOVIES:
    return {
      ...state,
      movies: {
        ...state.movies,
        ...action.movies
      },
      isLoading: false
    };
  case actionTypes.REMOVE_MOVIES:
    return {
      ...state,
      movies: {}
    };
  default:
    return state;
  }
};

export default reducer;
