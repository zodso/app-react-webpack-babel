import * as actionTypes from "./actionTypes";
import * as actionCreators from "./";

const requestMovies = () => ({
  type: actionTypes.REQUEST_MOVIES
});

const receiveMovies = movies => ({
  type: actionTypes.RECEIVE_MOVIES,
  movies
});

const getMoviesFail = error => ({
  type: actionTypes.GET_MOVIES_FAIL,
  error
});

export const removeMovies = () => ({
  type: actionTypes.REMOVE_MOVIES
});

const updateObjFromInfiniteScroll = obj => {
  let result = [],
    start = obj.results.length * (obj.page - 1),
    stop = start + obj.results.length;
  for (var i = start; i < stop; i++) {
    result[i] = obj.results[i - start];
  }
  return result;
};

export const getMovies = url => dispatch => {
  dispatch(actionCreators.startLoading(true));
  dispatch(requestMovies());
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network ko.");
    })
    .then(json => {
      dispatch(actionCreators.startLoading(false));
      if (json.page === 1) {
        dispatch(receiveMovies(json.results));
      } else {
        let jsonResult = updateObjFromInfiniteScroll(json);
        dispatch(receiveMovies(jsonResult));
      }
    })
    .catch(error => {
      dispatch(actionCreators.startLoading(false));
      dispatch(getMoviesFail(error.message));
    });
};
