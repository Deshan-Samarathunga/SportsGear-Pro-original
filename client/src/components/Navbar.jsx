import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo/2wide white logo.png";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "About", to: "/about" },
    { label: "Contact Us", to: "/contact" },
    { label: "Sign in", to: "/signin" },
    { label: "Sign up", to: "/signup" },
  ];

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark py-3 fixed-top ${isHome ? "navbar-transparent" : "navbar-solid"
        }`}
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
          <ul className="navbar-nav ms-auto">
            {navItems.map((item, index) => (
              <React.Fragment key={item.label}>
                <li className="nav-item">
                  <Link
                    className="nav-link hover-underline-animation"
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                </li>
                {index < navItems.length - 1 && (
                  <li className="nav-separator">|</li>
                )}
              </React.Fragment>
            ))}
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
