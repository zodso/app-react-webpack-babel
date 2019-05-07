import * as actionTypes from "./actionTypes";
import { api } from "../../api/api";

const requestSearch = () => ({
  type: actionTypes.REQUEST_SEARCH
});

const receiveSearch = results => ({
  type: actionTypes.RECEIVE_SEARCH,
  results
});

const getSearchFail = error => ({
  type: actionTypes.GET_SEARCH_FAIL,
  error
});

const searchStarted = query => ({
  type: actionTypes.SEARCH_STARTED,
  query
});

export const searchStopped = () => ({
  type: actionTypes.SEARCH_STOPPED
});

export const getSearch = textSearch => dispatch => {
  dispatch(searchStarted(textSearch));
  let searchUrl = `
  ${api.baseUri}search/movie?api_key=${api.key}&language=${api.lang}&query=${textSearch}`,
    query = textSearch && textSearch.toLowerCase();
  if (!query) {
    return dispatch(searchStopped());
  }
  let isQueryPermitted = query.length > 2 && query.length < 7;
  if (isQueryPermitted) {
    dispatch(requestSearch());
    return fetch(searchUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network ko.");
      })
      .then(json => {
        let result = json.results.filter(el => {
          let searchValue = el.title.toLowerCase();

          return searchValue.indexOf(query) !== -1;
        });
        dispatch(receiveSearch(result));
      })
      .catch(error => {
        dispatch(getSearchFail(error.message));
      });
  }
};
