import * as actionTypes from "./actionTypes";
import * as actionCreators from "./";
import { api } from "../../api/api";

const listUrl = `${api.baseUri}${api.listUri}?api_key=${api.key}&language=${
  api.lang
}`;

const requestGenres = () => ({
  type: actionTypes.REQUEST_GENRES
});

const receiveGenres = genres => ({
  type: actionTypes.RECEIVE_GENRES,
  genres
});

const getGenresFail = error => ({
  type: actionTypes.GET_GENRES_FAIL,
  error
});

export const getGenres = () => dispatch => {
  dispatch(actionCreators.startLoading(true));
  dispatch(requestGenres());
  return fetch(listUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network ko.");
    })
    .then(json => {
      dispatch(actionCreators.startLoading(false));
      dispatch(receiveGenres(json.genres));
    })
    .catch(error => {
      dispatch(actionCreators.startLoading(false));
      dispatch(getGenresFail(error.message));
    });
};
