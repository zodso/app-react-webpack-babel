import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.RECEIVE_CART:
    return {
      ...state,
      items: action.items
    };
  case actionTypes.ITEM_ADDED:
    return {
      ...state,
      items: {
        ...state.items,
        [action.item.id]: action.item
      }
    };
  case actionTypes.ITEM_REMOVED:
    return {
      ...state,
      items: action.resultingItems
    };
  default:
    return state;
  }
};

export default reducer;
