// client/src/components/OrdersList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarMenu from "./SidebarMenu";
import "./ProfileSettingsPage.css";
import "./OrdersList.css";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = user?.token;
        if (!token) throw new Error("Token not found");

        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Orders API response:", res.data);
        setOrders(Array.isArray(res.data) ? res.data : res.data.orders || []);
      } catch (err) {
        console.error("❌ Error fetching orders:", err.response?.data || err.message);
      }
    };

    fetchOrders();
  }, [user]);

  const statusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span className="badge bg-warning text-dark">Pending</span>;
      case "processing":
        return <span className="badge bg-success">Processing ✅</span>;
      case "unsuccessful":
        return <span className="badge bg-danger">Unsuccessful ❌</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };

  return (
    <div className="profile-settings-page">
      <SidebarMenu user={user} />
      <div className="main-content">
        <h2>My Orders</h2>
        {orders.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order._id} className="order-item p-3 mb-3 border rounded shadow-sm">
                <div><strong>Order ID:</strong> {order._id}</div>
                <div><strong>Status:</strong> {statusBadge(order.status)}</div>

                {order.status === "processing" && (
                  <div className="processing-message mt-2">
                    ✅ Your order is now being processed. You will receive updates shortly.
                  </div>
                )}

                {order.status === "unsuccessful" && (
                  <div className="refund-message mt-2">
                    ⚠️ This order was rejected. A refund will be processed shortly.
                  </div>
                )}

                <div><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</div>
                <div><strong>Item:</strong> {order.name}</div>
                <div><strong>Qty:</strong> {order.quantity}</div>
                <div><strong>Total:</strong> Rs.{(order.price * order.quantity).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
