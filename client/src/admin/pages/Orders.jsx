// client/src/admin/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../admin.css"; // Ensure this contains layout styling (like flex)

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

  const statusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span className="badge bg-warning text-dark">Pending</span>;
      case "processing":
        return <span className="badge bg-success">Processing</span>;
      case "unsuccessful":
        return <span className="badge bg-danger">Unsuccessful</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };

  return (
    <div className="admin-container d-flex">
      <Sidebar />

      <div className="admin-content flex-grow-1">
        <Topbar />
        <div className="p-4">
          <h3>All Orders</h3>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="table-responsive mt-3">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>User ID</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
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
                      <td>{statusBadge(o.status)}</td>
                      <td>
                        {o.status === "pending" ? (
                          <>
                            <button
                              className="btn btn-sm btn-success me-2"
                              onClick={() =>
                                updateStatus(o._id, "processing", o.productId, o.quantity)
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => updateStatus(o._id, "unsuccessful")}
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
