import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";
import { createBrowserHistory } from "history";
import Home from "./components/Home/Home";
import List from "./components/List/List";
import Detail from "./components/Detail/Detail";
import CartLink from "./components/CartLink/CartLink";
import Cart from "./components/Cart/Cart";
import Nav from "./components/Nav/Nav";
const history = createBrowserHistory();

class App extends Component {
  componentWillMount() {
    this.props.getCartItems();
  }

  render() {
    return (
      <Router history={history}>
        <div className="app">
          <header className="header">
            <Nav />
            <CartLink />
          </header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/list/:id" component={List} />
            <Route path="/movie/:id" component={Detail} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCartItems: () => {
      dispatch(actionCreators.getCart());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
