import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarMenu from "./SidebarMenu";
import "./ProfileSettingsPage.css"; // reuse styles
import "./OrdersList.css";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

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
              <li key={order._id} className="order-item">
                <strong>Order ID:</strong> {order._id}<br />
                <strong>Status:</strong> {order.status}<br />
                <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}<br />
                <strong>Total:</strong> ${order.total}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
