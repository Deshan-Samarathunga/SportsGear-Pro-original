// client/src/context/CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../api"; // ✅ use custom axios instance
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  // Fetch cart on login
  useEffect(() => {
    if (user && user.token) {
      API.get("/api/cart")
        .then((res) => setCart(res.data))
        .catch((err) => console.error("Failed to fetch cart", err));
    } else {
      setCart([]);
    }
  }, [user]);

  // Save to backend
  const syncCart = (updatedCart) => {
    setCart(updatedCart);
    if (user && user.token) {
      API.post("/api/cart", updatedCart).catch((err) =>
        console.error("Failed to sync cart", err)
      );
    }
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);
    const updatedCart = existing
      ? cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      : [...cart, product];

    syncCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    syncCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    if (user && user.token) {
      API.delete("/api/cart");
    }
  };

  // Count all items (for Navbar badge)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
