// src/contexts/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, color, size, quantity) => {
    const existingItem = cartItems.find(
      (item) => item.id === product.id && item.color === color.name && item.size === size
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id && item.color === color.name && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          color: color.name,
          size: size,
          imageUrl: color.imageUrl,
        },
      ]);
    }
  };

  const removeFromCart = (id, color, size) => {
    setCartItems(
      cartItems.filter(
        (item) => !(item.id === id && item.color === color && item.size === size)
      )
    );
  };

  const updateQuantity = (id, color, size, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.color === color && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);