// client/src/admin/components/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBoxOpen, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import "../admin.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <h3 className="sidebar-title">Admin Panel</h3>
        <ul className="sidebar-menu">
          <li><NavLink to="/admin/dashboard"><FaTachometerAlt /> Dashboard</NavLink></li>
          <li><NavLink to="/admin/users"><FaUsers /> Users</NavLink></li>
          <li><NavLink to="/admin/products"><FaBoxOpen /> Products</NavLink></li>
          <li><NavLink to="/admin/orders"><FaClipboardList /> Orders</NavLink></li>
        </ul>
      </div>

      <div className="sidebar-bottom">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
