import * as actionTypes from "./actionTypes";
import { cartUrl } from "../../database/firebase";

const requestCart = () => ({
  type: actionTypes.REQUEST_CART
});

const receiveCart = items => ({
  type: actionTypes.RECEIVE_CART,
  items
});

const getCartFail = error => ({
  type: actionTypes.GET_CART_FAIL,
  error
});

export const getCart = () => dispatch => {
  dispatch(requestCart());
  return cartUrl.on(
    "value",
    response => {
      dispatch(receiveCart(response.val() ? response.val().items : null));
    },
    error => {
      if (error) {
        dispatch(getCartFail(error.message));
      }
    }
  );
};
