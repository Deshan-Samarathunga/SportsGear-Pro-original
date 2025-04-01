import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import "../admin.css";

const Dashboard = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2 className="page-title">Overview</h2>
          <div className="stat-cards">
            <StatCard label="Listed Products" value="58" icon="🧢" />
            <StatCard label="Total Orders" value="123" icon="📦" />
            <StatCard label="Revenue" value="Rs 125000" icon="💰" />
            <StatCard label="Registered Users" value="42" icon="👥" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
