import { createContext, useState, useEffect } from "react";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity , 0);
    setCartCount(newCartCount);
  } ,[cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};