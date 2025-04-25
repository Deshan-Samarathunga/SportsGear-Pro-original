// client/src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo/2wide white logo.png";
import { AuthContext } from '../context/AuthContext';
import ProfileDropdown from "./ProfileDropdown";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import "./style/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { user } = useContext(AuthContext);
  const { cartCount } = useCart();

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "About", to: "/about" },
    { label: "Contact Us", to: "/contact" },
  ];

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark py-3 fixed-top ${isHome ? "navbar-transparent" : "navbar-solid"}`}
      id="navbar"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="logo"
            className="logo unselectable"
            draggable="false"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
          aria-controls="navmenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto align-items-center">
            {navItems.map((item, index) => (
              <React.Fragment key={item.label}>
                <li className="nav-item">
                  <Link
                    className={`nav-link hover-underline-animation ${location.pathname === item.to ? "active" : ""}`}
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                </li>
                {index < navItems.length - 1 && <li className="nav-separator">|</li>}
              </React.Fragment>
            ))}

            {/* Cart Icon */}
            <li className="nav-separator">|</li>
            <li className="nav-item position-relative">
              <Link
                to={user ? "/cart" : "/signin"}
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    alert("Please log in to view your cart.");
                  }
                }}
                className="nav-link position-relative"
              >
                <FaShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>

            </li>

            {/* Auth Links */}
            {!user ? (
              <>
                <li className="nav-separator">|</li>
                <li className="nav-item">
                  <Link className={`nav-link hover-underline-animation ${location.pathname === "/signin" ? "active" : ""}`} to="/signin">
                    Sign In
                  </Link>
                </li>
                <li className="nav-separator">|</li>
                <li className="nav-item">
                  <Link className={`nav-link hover-underline-animation ${location.pathname === "/signup" ? "active" : ""}`} to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-separator">|</li>
                <li className="nav-item">
                  <ProfileDropdown />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
