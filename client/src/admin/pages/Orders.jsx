// client/src/admin/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../admin.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, [token]);

  const updateStatus = async (id, status, productId, qty) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/orders/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (status === "processing") {
        await axios.patch(
          `http://localhost:5000/api/products/${productId}/decrease`,
          { quantity: qty }
        );
      }

      const res = await axios.get("http://localhost:5000/api/orders/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("❌ Failed to update order:", err);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-content">
          <h2 className="page-title">All Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="user-table">
              <table>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o._id}>
                      <td>{o.userId}</td>
                      <td>{o.name}</td>
                      <td>{o.quantity}</td>
                      <td>Rs.{o.price * o.quantity}</td>
                      <td>
                        <span className={`badge ${
                          o.status === "pending"
                            ? "bg-warning text-dark"
                            : o.status === "processing"
                            ? "bg-success"
                            : o.status === "unsuccessful"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}>
                          {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        {o.status === "pending" ? (
                          <>
                            <button
                              onClick={() =>
                                updateStatus(o._id, "processing", o.productId, o.quantity)
                              }
                              className="text-green-600 hover:underline"
                            >
                              Accept
                            </button>
                            <span> | </span>
                            <button
                              onClick={() => updateStatus(o._id, "unsuccessful")}
                              className="text-red-600 hover:underline"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>{new Date(o.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
