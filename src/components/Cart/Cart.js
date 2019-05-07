import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actionCreators from "../../store/actions";
import { api } from "../../api/api";
import imageNotFound from "../../content/assets/poster-not-found.jpg";

const Cart = ({ items, onremoveItem, showLayer }) => {
  let cartItems = items ? (
    <ul className="cart-has-items">
      {Object.keys(items).map(i => (
        <li key={i} className="item">
          <div className="item-img">
            <img
              src={items[i].image ? api.imgesUri + "w500" + items[i].image : imageNotFound}
              alt={items[i].title}
            />
          </div>
          <div className="item-info">
            <span>{items[i].date}</span>
            <h2>{`id: ${items[i].id} - Name: ${items[i].title}`}</h2>
            <p className="overview">{items[i].overview}</p>
            <span>Quantity: {items[i].quantity}</span>
          </div>
          <button
            type="button"
            className="remove-item"
            disabled={showLayer}
            onClick={() => onremoveItem(items[i].id)}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <div className="no-items">
      <p>No items added</p>
      <Link to="/">Go Back</Link>
    </div>
  );
  return <div className="cart">{cartItems}</div>;
};

const mapStateToProps = state => {
  return {
    items: state.cart.items,
    showLayer: state.UI.showLayer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onremoveItem: id => {
      dispatch(actionCreators.removeFromCart(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
