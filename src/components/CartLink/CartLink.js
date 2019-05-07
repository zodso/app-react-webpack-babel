import React from "react";
import { connect } from "react-redux";
import iconCart from "../../content/assets/icon-cart.svg";
import { Link } from "react-router-dom";

const CartLink = ({ items, showLayer }) => {
  let itemCounter = 0;
  if (items) {
    Object.keys(items).map(i => (itemCounter += parseInt(items[i].quantity)));
  }
  return (
    <Link className="cart-link" to="/cart">
      <img src={iconCart} className="icon-cart" alt="icon-cart" />
      <span className="cart-counter">{itemCounter}</span>
      <div className={`layer-notification${showLayer ? " is-shown" : ""}`}>
        {`Items in cart: ${itemCounter}`}
      </div>
    </Link>
  );
};

const mapStateToProps = state => {
  return {
    items: state.cart.items,
    showLayer: state.UI.showLayer
  };
};

export default connect(mapStateToProps)(CartLink);
