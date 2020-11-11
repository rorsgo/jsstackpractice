import { produce } from "immer";

export default function cart(state = [], action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return produce(state, draftState => {
        const productIndex = draftState.findIndex(
          product => product.id === action.product.id
        );

        productIndex >= 0 ?
          draftState[productIndex].amount += 1
          : draftState.push({
            ...action.product,
            amount: 1
          })
      });
    default:
      return state;
  }
}