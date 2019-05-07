import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import Loader from "../UI/Loader/Loader";

const LiveSearch = ({ query, getSearchResults, searchResult, 
  searchIsLoading, searchIsStarted }) => {

  const updateMovideId = id => {
    localStorage.setItem("movie-id", id);
  };

  return (
    <div className="live-search">
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={event => getSearchResults(event.target.value)}
          placeholder="Search"
        />
      </div>
      {searchResult.length !== 0 ? (
        <ul className="results">
          {searchResult.map(search => (
            <li key={search.id}>
              <Link
                to={"/movie/" + search.id}
                onClick={() => updateMovideId(search.id)}
              >
                {search.title + (search.release_date && " - ("+ search.release_date + ")")}
              </Link>
            </li>
          ))}
          {searchIsLoading && <li><Loader /></li>}
        </ul>
      ) : searchIsStarted && (<ul className="results">
        <li>No matches found!</li>
        {searchIsLoading && <li><Loader /></li>}
      </ul>)}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    query: state.search.query,
    searchResult: state.search.results,
    searchIsLoading: state.search.searchIsLoading,
    searchIsStarted: state.search.searchIsStarted
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSearchResults: textSearch => {
      dispatch(actionCreators.getSearch(textSearch));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveSearch);
