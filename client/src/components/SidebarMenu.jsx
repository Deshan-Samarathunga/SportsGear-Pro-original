import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style/ProfileSettingsPage.css";

const SidebarMenu = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sidebar">
      <img
        src={user?.image ? `http://localhost:5000${user.image}` : "/profile.png"}
        alt="profile"
        className="avatar"
      />
      <h4>{user?.name || "User Name"}</h4>
      <p>{user?.email}</p>

      <button
        className={`sidebar-btn ${location.pathname === "/profile" ? "active" : ""}`}
        onClick={() => navigate("/profile")}
      >
        Profile Setting
      </button>

      <button
        className={`sidebar-btn ${location.pathname === "/change-password" ? "active" : ""}`}
        onClick={() => navigate("/change-password")}
      >
        Change Password
      </button>

      <button
        className={`sidebar-btn ${location.pathname === "/orders" ? "active" : ""}`}
        onClick={() => navigate("/orders")}
      >
        My Orders
      </button>
      
      <button
        className="sidebar-btn logout"
        onClick={() => {
          localStorage.clear();
          navigate("/signin");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default SidebarMenu;
