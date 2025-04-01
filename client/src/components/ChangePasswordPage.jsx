import React, { useEffect, useState } from "react";
import SidebarMenu from "./SidebarMenu";
import "./ProfileSettingsPage.css"; 
import axios from "axios";

const ChangePasswordPage = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser) setUser(localUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/api/auth/change-password",
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.msg || "Password updated successfully!");
    } catch (err) {
      alert(err.response?.data?.msg || "Password update failed.");
    }
  };

  return (
    <div className="profile-settings-page">
      {/* ✅ FIX: user is now correctly passed */}
      {user && <SidebarMenu user={user} />}

      <div className="main-content">
        <h3>Change Password</h3>
        <form className="profile-form" onSubmit={handleSubmit}>
          <label>Old Password:</label>
          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            required
          />

          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            required
          />

          <label>Confirm New Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn main-btn">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
