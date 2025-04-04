// client/src/components/CheckoutPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("checkoutOrder");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.name && parsed.price && parsed.quantity) {
          setOrder(parsed);
        } else {
          throw new Error("Invalid order data");
        }
      } else {
        navigate("/products");
      }
    } catch (err) {
      console.error("Failed to load checkout order:", err);
      navigate("/products");
    }
  }, [navigate]);

  const handleProceedToPayment = () => {
    navigate("/payment");
  };

  if (!order) return null;

  const total = order.price * order.quantity;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Checkout Summary</h2>
      <div className="card p-4 shadow-sm">
        <h4>{order.name}</h4>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Price per item:</strong> Rs.{order.price}</p>
        <h5><strong>Total:</strong> Rs.{total.toLocaleString()}</h5>

        <button
          className="btn btn-success mt-3"
          onClick={handleProceedToPayment}
          disabled={!order}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
