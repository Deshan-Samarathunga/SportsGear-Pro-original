// client/src/admin/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../admin.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

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
        { headers: { Authorization: `Bearer ${token}` } }
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

  // Filter based on item name or status
  const filteredOrders = orders.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-content">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="page-title">All Orders</h2>
            <button
              className="admin-btn"
              onClick={() => navigate("/admin/sales")}
              style={{
                padding: "10px 20px",
                backgroundColor: "#F57C51",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#e3683f")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#F57C51")
              }
            >
              View Sales Report
            </button>
          </div>

          {/* ✅ Search Bar */}
          <div className="search-add-wrapper">
            <input
              type="text"
              placeholder="Search by item or status"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          {filteredOrders.length === 0 ? (
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
                  {filteredOrders.map((o) => (
                    <tr key={o._id}>
                      <td>{o.userId}</td>
                      <td>{o.name}</td>
                      <td>{o.quantity}</td>
                      <td>Rs.{o.price * o.quantity}</td>
                      <td>
                        <span
                          className={`badge ${
                            o.status === "pending"
                              ? "bg-warning text-dark"
                              : o.status === "processing"
                              ? "bg-success"
                              : o.status === "unsuccessful"
                              ? "bg-danger"
                              : "bg-secondary"
                          }`}
                        >
                          {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        {o.status === "pending" ? (
                          <>
                            <button
                              onClick={() =>
                                updateStatus(
                                  o._id,
                                  "processing",
                                  o.productId,
                                  o.quantity
                                )
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
