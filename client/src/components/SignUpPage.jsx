// client/src/components/SignUpPage.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import "./style/SignUpPage.css";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";


const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    conPassword: "",
    terms: false,
  });
  
 //const { login } = useContext(AuthContext);
  //const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (form.password !== form.conPassword) {
      alert("Password Mismatch!");
      return;
    }
  
    if (!form.terms) {
      alert("You must accept the Terms of Services.");
      return;
    }
  
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
  
      alert("Sign up successful!");
      navigate("/signin"); // redirect to sign-in page
    } catch (err) {
      alert(err?.response?.data?.msg || "Registration failed");
    }
  };
  

  return (
    <section className="register">
      <div className="signup-container">
        <div className="signup-content">
          <form onSubmit={handleSubmit} className="signup-form">
            <h3>Create an Account</h3>
            <p>
              Lets start with <span className="brand-name">SportsGear Pro</span>
            </p>

            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email Address"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
                <i
                  className={`ri-${showPassword ? "eye-line" : "eye-off-line"}`}
                  id="toggle-eye"
                  onClick={togglePassword}
                ></i>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="conPassword">Re-enter Password:</label>
              <input
                type="password"
                name="conPassword"
                id="conPassword"
                placeholder="Re-enter Password"
                required
                value={form.conPassword}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-row checkbox">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={form.terms}
                onChange={handleChange}
              />
              <label htmlFor="terms">
                <p>
                  I accept the {" "}
                  <button
                    type="button"
                    className="btn-link"
                    onClick={() => alert("Show Terms of Service")}
                  >
                    Terms of Services
                  </button>
                </p>
              </label>
            </div>

            <div className="form-submit">
              <input
                type="submit"
                value="Sign Up"
                className="btn main-btn"
                id="submit"
              />
            </div>
          </form>

          <p>
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;