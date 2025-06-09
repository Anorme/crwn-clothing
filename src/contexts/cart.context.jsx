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

const removeCartItem = (cartItems, productToRemove) => {
  // Check if item exists in cart
  const existingCartItem = checkIsExistingCartItem(cartItems, productToRemove);

  // Reduce quantity by 1 if item quantity is not 0
  if(existingCartItem) {
    return cartItems.reduce((accumulator, cartItem) => {
      if(cartItem.id === productToRemove.id) {
        if(cartItem.quantity > 1) {
          accumulator.push({...cartItem, quantity: cartItem.quantity - 1});
        } 
      } else {
        accumulator.push(cartItem);
      }
      return accumulator
    }, []);
  };
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

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};