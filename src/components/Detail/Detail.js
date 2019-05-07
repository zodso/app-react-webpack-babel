import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import { api } from "../../api/api";
import imageNotFound from "../../content/assets/poster-not-found.jpg";
import Loader from "../UI/Loader/Loader";

const Detail = ({ movie, showLayer, addItemToCart, isLoading }) => {
  let imageUrl = api.imgesUri + "w500" + movie.poster_path;
  let imageFallBack = movie.poster_path ? imageUrl : imageNotFound;
  return movie ? (
    <div className="movie">
      <div className="movie-detail">
        <img src={imageFallBack} alt={movie.title} />
        <div className="movie-detail__info">
          <h2>
            <span>{movie.title}</span>
            <span className="date">{movie.release_date && ("("+movie.release_date+")") }</span>
          </h2>
          {!movie.adult && <span className="adult">adult</span>}
          <h3>Overview</h3>
          <p>{movie.overview ? movie.overview :
            "Sorry, we don't have any overview for this movie"}</p>
          <a
            href={movie.homepage}
            title="go to the movie's homepage"
            className="view-more"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Movie
          </a>
          <div className="votes">
            <p>
              Votes<span className="vote_count">{movie.vote_count}</span>
            </p>
            <p>
              Average<span className="vote_average">{movie.vote_average}</span>
            </p>
            <p>
              Popularity<span className="popularity">{movie.popularity}</span>
            </p>
          </div>
          <button
            type="button"
            className="add-to-cart"
            disabled={showLayer}
            onClick={() => addItemToCart(movie)}
          >
            Add to cart
          </button>
        </div>
      </div>
      {isLoading ? <Loader /> : null}
    </div>
  ) : null;
};

const mapStateToProps = state => {
  return {
    movie: state.movie.movie,
    showLayer: state.UI.showLayer,
    isLoading: state.UI.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  dispatch(actionCreators.getMovie());
  return {
    addItemToCart: item => {
      dispatch(actionCreators.addToCart(item));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
