import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProfileDropdown = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="profile-wrapper" ref={dropdownRef}>
      <div
        className="profile-trigger"
        onClick={() => setOpen(!open)}
      >
        <p className="profile-name">{user?.name}</p>
        <img
          src={user?.image ? `http://localhost:5000${user.image}` : "/profile.png"}
          alt="profile"
          className="profile-icon"
        />
      </div>

      <div className={`profile-dropdown ${open ? 'open' : ''}`}>
        <p className="dropdown-name">{user?.name}</p>
        <hr />
        <button onClick={() => navigate("/profile")} className="btn-link">
          Profile Settings
        </button>
        <br />
        <button onClick={handleLogout} className="btn-link">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
