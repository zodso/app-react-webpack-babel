import * as actionTypes from "./actionTypes";
import { cartUrl } from "../../database/firebase";
import * as actionCreators from "./";

const itemAdded = item => ({
  type: actionTypes.ITEM_ADDED,
  item
});

export const addToCart = data => (dispatch, getState) => {
  dispatch(actionCreators.showLayer(true));
  let items = getState().cart.items;
  let quantity = items && items[data.id] ? items[data.id].quantity + 1 : 1;
  let date = new Date(),
    calendar = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    },
    item = {
      id: data.id,
      title: data.title,
      overview: data.overview,
      quantity: quantity,
      image: data.poster_path,
      date: `${("0" + date.getDate()).slice(-2)}/${(
        "0" +
        (date.getMonth() + 1)
      ).slice(-2)}/${calendar.year} - ${("0" + date.getHours()).slice(-2)}:${(
        "0" + date.getMinutes()
      ).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`
    };
  cartUrl
    .child("items")
    .child(item.id)
    .set(item, () => {
      dispatch(itemAdded(item));
      setTimeout(() => {
        dispatch(actionCreators.showLayer(false));
      }, 1000);
    });
};
