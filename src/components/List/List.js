import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actionCreators from "../../store/actions";
import { api } from "../../api/api";
import LiveSearch from "../LiveSearch/LiveSearch";
import Loader from "../UI/Loader/Loader";
import imageNotFound from "../../content/assets/backdrop-not-found.jpg";

class List extends Component {
  constructor(props) {
    super(props);
    this.scrollable = React.createRef();
    this.genreId = null;
    this.state = {
      page: 1
    };
  }

  componentWillMount() {
    this.genreId = localStorage.getItem("genre-id");
    let listUrl = `${api.baseUri}${api.discoverUri}?with_genres=${this.genreId}&api_key=${
      api.key}&language=${api.lang}&page=${this.state.page}`;
    this.props.getMoviesList(listUrl);
  }

  componentDidMount() {
    this.scrollable.addEventListener("scroll", () => {
      if (
        this.scrollable.scrollTop + this.scrollable.clientHeight >=
        this.scrollable.scrollHeight - 20
      ) {
        this.loadMoreItems();
      }
    });
  }

  componentWillUnmount() {
    this.props.removeMovies();
  }

  loadMoreItems = () => {
    if (this.props.isLoading) return;
    this.setState({ page: this.state.page + 1 });
    let listUrl = `${api.baseUri}${api.discoverUri}?with_genres=${this.genreId}&api_key=${
      api.key}&language=${api.lang}&page=${this.state.page}`;
    this.props.getMoviesList(listUrl);
  };

  setMovieId = id => {
    localStorage.setItem("movie-id", id);
  };

  render() {
    let movies = this.props.movies;
    return (
      <div
        className="list"
        ref={el => (this.scrollable = el)}
        onClick={this.props.stopSearch}>
        <LiveSearch getSearchResults={this.props.getSearchResults} />
        {movies && (
          <ul className="list-movies">
            {Object.keys(movies).map(mov => {
              let imageUrl = api.imgesUri + "w1280" + movies[mov].backdrop_path;
              let imageFallBack = movies[mov].backdrop_path
                ? imageUrl
                : imageNotFound;
              return (
                <li key={movies[mov].id} className="list-movies__movie">
                  <Link
                    to={`/movie/${movies[mov].id}`}
                    title={`Movie - ${movies[mov].title}`}
                    onClick={() => this.setMovieId(movies[mov].id)}
                  >
                    <img src={imageFallBack} alt={movies[mov].title} />
                    <h2>{movies[mov].title}</h2>
                    <p>{movies[mov].overview.substring(0, 200)}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        {this.props.isLoading ? <Loader /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies.movies,
    isLoading: state.UI.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMoviesList: url => {
      dispatch(actionCreators.getMovies(url));
    },
    removeMovies: () => {
      dispatch(actionCreators.removeMovies());
    },
    stopSearch: () => {
      dispatch(actionCreators.searchStopped());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
