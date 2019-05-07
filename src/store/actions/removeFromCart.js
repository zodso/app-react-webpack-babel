import * as actionTypes from "./actionTypes";
import { cartUrl } from "../../database/firebase";
import * as actionCreators from "./";

const itemRemoved = resultingItems => ({
  type: actionTypes.ITEM_REMOVED,
  resultingItems
});

export const removeFromCart = id => (dispatch, getState) => {
  dispatch(actionCreators.showLayer(true));
  let items = getState().cart.items,
    resultingItems = null;

  if (items[id].quantity === 1) {
    for (let i in items) {
      if (id !== parseInt(i)) {
        resultingItems = {
          ...resultingItems,
          [i]: items[i]
        };
      }
    }
  } else {
    resultingItems = {
      ...items,
      [id]: {
        ...items[id],
        quantity: items[id].quantity - 1
      }
    };
  }

  cartUrl.child("items").set(resultingItems, () => {
    dispatch(itemRemoved(resultingItems));
    setTimeout(() => {
      dispatch(actionCreators.showLayer(false));
    }, 1000);
  });
};
