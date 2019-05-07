import * as actionTypes from "./actionTypes";
import * as actionCreators from "./";
import { api } from "../../api/api";

const requestMovie = () => ({
  type: actionTypes.REQUEST_MOVIE
});

const receiveMovie = movie => ({
  type: actionTypes.RECEIVE_MOVIE,
  movie
});

const getMovieFail = error => ({
  type: actionTypes.GET_MOVIE_FAIL,
  error
});

export const getMovie = () => dispatch => {
  dispatch(actionCreators.startLoading(true));
  let movieId = localStorage.getItem("movie-id");
  const movieUrl = `${api.baseUri}movie/${movieId}?api_key=${
    api.key
  }&language=${api.lang}`;

  dispatch(requestMovie());
  return fetch(movieUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network ko.");
    })
    .then(json => {
      dispatch(actionCreators.startLoading(false));
      dispatch(receiveMovie(json));
    })
    .catch(error => {
      dispatch(actionCreators.startLoading(false));
      dispatch(getMovieFail(error.message));
    });
};
