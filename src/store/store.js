import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import UI from "./reducers/UI";
import genres from "./reducers/genres";
import movies from "./reducers/movies";
import movie from "./reducers/movie";
import cart from "./reducers/cart";
import search from "./reducers/search";

const reducers = combineReducers({
  UI,
  genres,
  movies,
  movie,
  cart,
  search
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
