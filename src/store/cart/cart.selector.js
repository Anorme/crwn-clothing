import { createSelector } from "reselect";

export const selectCartReducer = state => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (newCartItems) => {
    return newCartItems.reduce((total, cartItem) => total + cartItem.quantity , 0);
  }
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (newCartItems) => {
    return newCartItems.reduce((totalPrice, cartItem) => {
      return totalPrice + (cartItem.price * cartItem.quantity);
    }, 0)
  }
);