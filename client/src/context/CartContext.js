// client/src/context/CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../api"; // axios instance with token interceptor
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  // Load cart on user login
  useEffect(() => {
    if (user?.token) {
      API.get("/api/cart")
        .then((res) => setCart(res.data))
        .catch((err) => console.error("🛒 Failed to fetch cart:", err));
    } else {
      setCart([]);
    }
  }, [user]);

  // Sync cart to backend
  const syncCart = (updatedCart) => {
    setCart(updatedCart);
    if (user?.token) {
      API.post("/api/cart", updatedCart).catch((err) =>
        console.error("🛒 Failed to sync cart:", err)
      );
    }
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.productId === product._id);

    const updatedCart = existing
      ? cart.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      : [
          ...cart,
          {
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            imageUrl: product.imageUrl,
          },
        ];

    syncCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.productId !== id);
    syncCart(updatedCart);
  };

  const updateCartItem = (productId, newQty) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity: newQty } : item
    );
    syncCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    if (user?.token) {
      API.delete("/api/cart").catch((err) =>
        console.error("🛒 Failed to clear cart:", err)
      );
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItem, // ✅ now included!
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
