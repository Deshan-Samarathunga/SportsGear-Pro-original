// client/src/admin/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "../admin.css";

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    axios.get("http://localhost:5000/api/products")
      .then(res => setProductCount(res.data.length))
      .catch(err => console.error("Failed to fetch products", err));
  
    axios.get("http://localhost:5000/api/users", config)
      .then(res => setUserCount(res.data.length))
      .catch(err => console.error("Failed to fetch users", err));
  
    axios.get("http://localhost:5000/api/orders", config)
      .then(res => setOrderCount(res.data.length))
      .catch(err => console.error("Failed to fetch orders", err));
  }, []);
  

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-content">
          <h2 className="page-title mb-4">Dashboard</h2>
          <div className="stat-cards">
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-info">
                <h3>{productCount}</h3>
                <p>Listed Products</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🛒</div>
              <div className="stat-info">
                <h3>{orderCount}</h3>
                <p>Total Orders</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👤</div>
              <div className="stat-info">
                <h3>{userCount}</h3>
                <p>Registered Users</p>
              </div>
            </div>
            {/* ❌ Removed Revenue box */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
