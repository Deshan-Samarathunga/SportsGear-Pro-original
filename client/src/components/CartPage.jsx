// ✅ client/src/components/CartPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./style/CartPage.css";
import emptyCartImg from "../assets/images/empty-cart.png";



const CartPage = () => {
  const { cart, removeFromCart, updateCartItem } = useCart();
  const navigate = useNavigate();

  const handleIncrease = (productId) => {
    const item = cart.find((p) => p.productId === productId);
    if (item) updateCartItem(productId, item.quantity + 1);
  };

  const handleDecrease = (productId) => {
    const item = cart.find((p) => p.productId === productId);
    if (item && item.quantity > 1) updateCartItem(productId, item.quantity - 1);
  };

  const handleCheckout = () => {
    navigate("/payment"); // ✅ NO localStorage anymore
  };

  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="container d-flex flex-column align-items-center justify-content-center py-5" style={{ minHeight: "60vh" }}>
        <img src={emptyCartImg} alt="Empty Cart" style={{ width: "180px", opacity: 0.8 }} />
        <h3 className="mt-4">Your cart is empty</h3>
        <p className="text-muted">Looks like you haven’t added anything yet.</p>
        <button
          className="btn mt-3"
          onClick={() => navigate("/products")}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#e3683f")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#F57C51")}
          style={{
            backgroundColor: "#F57C51",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            transition: "background-color 0.3s ease"
          }}
        >
          Continue Shopping
        </button>

      </div>
    );
  }


  return (
    <div className="container py-5">
      <h2 className="mb-4">Shopping Cart</h2>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Product</th>
            <th className="text-center">Qty</th>
            <th className="text-center">Price</th>
            <th className="text-center">Subtotal</th>
            <th className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.productId}>
              <td>{item.name}</td>
              <td className="text-center">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <button className="btn btn-sm btn-secondary" onClick={() => handleDecrease(item.productId)} disabled={item.quantity === 1}>-</button>
                  <span>{item.quantity}</span>
                  <button className="btn btn-sm btn-secondary" onClick={() => handleIncrease(item.productId)}>+</button>
                </div>
              </td>
              <td className="text-center">Rs.{item.price}</td>
              <td className="text-center">Rs.{item.quantity * item.price}</td>
              <td className="text-center">
                <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.productId)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h4>Total: Rs.{total}</h4>
        <button className="btn btn-primary px-4" onClick={handleCheckout}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default CartPage;
