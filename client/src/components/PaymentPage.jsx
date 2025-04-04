// client/src/components/PaymentPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./PaymentPage.css";

const PaymentPage = () => {
  const [order, setOrder] = useState(null);
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const stored = localStorage.getItem("checkoutOrder");
    if (stored) {
      setOrder(JSON.parse(stored));
    } else {
      navigate("/products");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async () => {
    const { name, number, expiry, cvv } = card;

    if (!name.trim() || !number.trim() || !expiry.trim() || !cvv.trim()) {
      alert("Please fill in all payment details.");
      return;
    }

    if (!user || !user.token) {
      alert("You must be signed in to place an order.");
      navigate("/signin");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...order,
        status: "pending", // don't send userId, backend assigns from token
      };


      await axios.post("http://localhost:5000/api/orders", payload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });


      localStorage.removeItem("checkoutOrder");
      alert("✅ Order placed successfully! Status: pending.");
      navigate("/orders");
    } catch (err) {
      console.error("Order submission failed", err);
      alert("❌ Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!order) return null;

  const total = order.price * order.quantity;

  return (
    <div className="container py-5">
      <h2>Payment Details</h2>
      <div className="card p-4 mt-4 shadow-sm">
        <p><strong>Item:</strong> {order.name}</p>
        <p><strong>Total:</strong> Rs.{total.toLocaleString()}</p>

        <hr />
        <div className="form-group">
          <label>Cardholder Name</label>
          <input
            name="name"
            value={card.name}
            onChange={handleChange}
            className="form-control"
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <label>Card Number</label>
          <input
            name="number"
            type="tel"
            maxLength="16"
            value={card.number}
            onChange={handleChange}
            className="form-control"
            placeholder="XXXX XXXX XXXX XXXX"
          />
        </div>
        <div className="form-group">
          <label>Expiry</label>
          <input
            name="expiry"
            placeholder="MM/YY"
            value={card.expiry}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input
            name="cvv"
            type="password"
            maxLength="4"
            value={card.cvv}
            onChange={handleChange}
            className="form-control"
            placeholder="***"
          />
        </div>

        <button
          onClick={handleConfirm}
          className="btn btn-primary mt-3"
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm Payment"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
