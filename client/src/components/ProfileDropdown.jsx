import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const ProfileDropdown = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div
      className="profile-wrapper"
      onClick={() => setOpen(!open)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        color: "#fff",
      }}
    >
      <p style={{ margin: 0, fontWeight: 600 }}>{user?.name}</p>

      <img
        src={user?.image ? `http://localhost:5000${user.image}` : "/profile.png"}
        alt="profile"
        className="profile-icon"
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      {open && (
        <div
          className="profile-dropdown"
          style={{
            position: "absolute",
            right: 0,
            top: "40px",
            background: "#fff",
            boxShadow: "0 0 8px rgba(0,0,0,0.1)",
            borderRadius: "6px",
            padding: "0.5rem",
            zIndex: 10,
            color: "#000",
          }}
        >
          <p style={{ margin: 0, fontWeight: 600 }}>{user?.name}</p>
          <hr />
          <button onClick={() => navigate("/profile")} className="btn-link">
            Profile Settings
          </button>
          <br />
          <button onClick={handleLogout} className="btn-link">
            Logout
          </button>
        </div>
      )}
    </div>

  );
};

export default ProfileDropdown;
