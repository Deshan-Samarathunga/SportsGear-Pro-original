import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="admin-page">
      <h2>Orders</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>Order #{order._id} - {order.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;