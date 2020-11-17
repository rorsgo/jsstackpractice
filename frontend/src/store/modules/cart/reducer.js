import { produce } from "immer";

export default function cart(state = [], action) {
  switch (action.type) {
    case "@cart/ADD":
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
    case "@cart/REMOVE":
      return produce(state, draftState => {
        const productIndex = draftState.findIndex(
          product => product.id === action.id
        )

        if (productIndex >= 0) {
          draftState.splice(productIndex, 1)
        }
      });
    case "@cart/UPDATE_AMOUNT": {
      if (action.amount <= 0) {
        return state;
      }

      return produce(state, draftState => {
        const productIndex = draftState.findIndex(
          product => product.id === action.id
        )

        if (productIndex >= 0) {
          draftState[productIndex].amount = Number(action.amount);
        }
      })
    }
    default:
      return state;
  }
}