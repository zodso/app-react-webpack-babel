import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import { Link } from "react-router-dom";
import Loader from "../UI/Loader/Loader";

class Home extends Component {
  componentWillMount() {
    this.props.getGenresList();
  }

  setGenreId = id => {
    localStorage.setItem("genre-id", id);
  };

  render() {
    let genres = this.props.genres;
    return (
      <div className="home">
        <h1>Select a category</h1>
        {genres && (
          <ul className="list-genres">
            {Object.keys(genres).map(gen => (
              <li key={genres[gen].id} className="list-genres__genre">
                <Link
                  to={`/list/${genres[gen].id}`}
                  title={`Movies genre ${genres[gen].name}`}
                  onClick={() => this.setGenreId(genres[gen].id)}
                >
                  <span>{genres[gen].id}</span>
                  <p>{genres[gen].name}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {this.props.isLoading ? <Loader /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    genres: state.genres.genres,
    isLoading: state.UI.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGenresList: () => {
      dispatch(actionCreators.getGenres());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
