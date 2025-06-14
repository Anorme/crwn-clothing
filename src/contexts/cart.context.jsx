import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
    return {
      ...state,
      ...payload,
    }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [ { isCartOpen, cartItems, cartCount, cartTotal }, dispatch ] = useReducer(cartReducer, INITIAL_STATE);
  
  const updateCartItemsReducer = (newCartItems) => {
    // Update cartCount
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity , 0);
    // Update cartTotal
    const newCartTotal = newCartItems.reduce((totalPrice, cartItem) => {
      return totalPrice + (cartItem.price * cartItem.quantity);
    }, 0);
    // Dispatch new action with payload
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { 
        cartItems: newCartItems, 
        cartCount: newCartCount, 
        cartTotal: newCartTotal
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
  };

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    removeItemFromCart, 
    cartItems, 
    cartCount,
    cartTotal, 
    clearItemFromCart 
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};