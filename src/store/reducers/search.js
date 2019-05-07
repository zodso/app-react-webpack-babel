import * as actionTypes from "../actions/actionTypes";

const initialState = {
  results: [],
  query: "",
  searchIsStarted: false,
  searchIsLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.REQUEST_SEARCH:
    return {
      ...state,
      searchIsLoading: true
    };
  case actionTypes.RECEIVE_SEARCH:
    return {
      ...state,
      results: action.results,
      searchIsLoading: false,
      searchIsStarted: false
    };
  case actionTypes.SEARCH_STOPPED:
    return {
      ...state,
      results: [],
      query: "",
      searchIsLoading: false,
      searchIsStarted: false
    };
  case actionTypes.SEARCH_STARTED:
    return {
      ...state,
      query: action.query,
      searchIsStarted: true
    };
  case actionTypes.GET_SEARCH_FAIL:
    return {
      ...state,
      results: [],
      searchIsLoading: false
    };
  default:
    return state;
  }
};

export default reducer;
