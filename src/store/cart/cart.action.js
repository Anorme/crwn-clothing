import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

function checkIsExistingCartItem (cartItems, productToAdd) {
  return cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
}

const addCartItem = (cartItems, productToAdd) => {
  // Check if item exists in cart
  const existingCartItem = checkIsExistingCartItem(cartItems, productToAdd)
  // Increase item quiantity if found
  if(existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
      ? {...cartItem, quantity:cartItem.quantity + 1} 
      : cartItem
    );
  }
  // Return new array with modified cartItem(s)
  return [...cartItems, {...productToAdd, quantity: 1}]
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // Find the cart item to remove 
  const existingCartItem = checkIsExistingCartItem(cartItems, cartItemToRemove);

  // Remove item from cart if quantity === 1
  if(existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  };

  // Return back cart items with matching cart item with reduced quantity
  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
      ? {...cartItem, quantity:cartItem.quantity - 1} 
      : cartItem
    );
};

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
};
