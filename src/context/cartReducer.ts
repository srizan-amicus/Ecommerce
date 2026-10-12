import type { CartItemApiResponse } from "../api/cartApi";

export type CartAction =
  | {
      type: "ADD_ITEM";
      payload: CartItemApiResponse;
    }
  | {
      type: "REMOVE_ITEM";
      payload: { productId: number };
    }
  | {
      type: "UPDATE_QTY";
      payload: {
        productId: number;
        quantity: number;
      };
    }
  | {
      type: "CLEAR_CART";
    }
  | {
      type: "SET_CART";
      payload: CartItemApiResponse[];
    };

export function cartReducer(
  state: CartItemApiResponse[],
  action: CartAction,
): CartItemApiResponse[] {
  switch (action.type) {
    case "ADD_ITEM": {
      const incomingItem = action.payload;

      const existingItem = state.find(
        (item) => item.productId === incomingItem.productId,
      );

      if (existingItem) {
        return state.map((item) =>
          item.productId === incomingItem.productId
            ? {
                ...item,
                ...incomingItem,
              }
            : item,
        );
      }

      return [...state, incomingItem];
    }

    case "REMOVE_ITEM":
      return state.filter(
        (item) => item.productId !== action.payload.productId,
      );

    case "UPDATE_QTY":
      if (action.payload.quantity < 1) {
        return state;
      }

      return state.map((item) =>
        item.productId === action.payload.productId
          ? {
              ...item,
              quantity: action.payload.quantity,
              itemSubtotal: item.price * action.payload.quantity,
            }
          : item,
      );

    case "CLEAR_CART":
      return [];

    case "SET_CART":
      return action.payload;

    default:
      return state;
  }
}
