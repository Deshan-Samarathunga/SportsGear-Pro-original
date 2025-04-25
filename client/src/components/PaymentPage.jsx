// ✅ client/src/components/PaymentPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import axios from "axios";
import "./style/PaymentPage.css";

const PaymentPage = () => {
  const [order, setOrder] = useState(null); // for Buy Now
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { cart, clearCart } = useCart(); // from MongoDB

  useEffect(() => {
    const checkoutOrder = localStorage.getItem("checkoutOrder");
    if (checkoutOrder) {
      setOrder(JSON.parse(checkoutOrder));
    } else if (!user || cart.length === 0) {
      navigate("/products");
    }
  }, [navigate, cart, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async () => {
    if (!user?.token) {
      alert("Please sign in to place an order.");
      navigate("/signin");
      return;
    }

    const { name, number, expiry, cvv } = card;
    if (!name || !number || !expiry || !cvv) {
      alert("Please fill in all payment details.");
      return;
    }

    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${user.token}` };

      const payloads = order
        ? [ { ...order, status: "pending" } ]
        : cart.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
            status: "pending",
          }));

      await Promise.all(payloads.map((p) => axios.post("http://localhost:5000/api/orders", p, { headers })));

      localStorage.removeItem("checkoutOrder");
      clearCart(); // MongoDB cleared ✅
      alert("✅ Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Order submission failed", err);
      alert("❌ Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const total = order
    ? order.quantity * order.price
    : cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="container py-5">
      <h2>Payment Details</h2>
      <div className="card p-4 mt-4 shadow-sm">
        {order ? (
          <p><strong>Item:</strong> {order.name} × {order.quantity}</p>
        ) : (
          <>
            <h5>Cart Items</h5>
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li key={item.productId} className="list-group-item d-flex justify-content-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>Rs.{item.quantity * item.price}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <h5><strong>Total:</strong> Rs.{total.toLocaleString()}</h5>
        <hr />

        <div className="form-group">
          <label>Cardholder Name</label>
          <input name="name" value={card.name} onChange={handleChange} className="form-control" placeholder="John Doe" />
        </div>
        <div className="form-group">
          <label>Card Number</label>
          <input name="number" type="tel" maxLength="16" value={card.number} onChange={handleChange} className="form-control" placeholder="XXXX XXXX XXXX XXXX" />
        </div>
        <div className="form-group">
          <label>Expiry</label>
          <input name="expiry" placeholder="MM/YY" value={card.expiry} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input name="cvv" type="password" maxLength="4" value={card.cvv} onChange={handleChange} className="form-control" placeholder="***" />
        </div>

        <button onClick={handleConfirm} className="btn btn-primary mt-3" disabled={loading}>
          {loading ? "Processing..." : "Confirm Payment"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

