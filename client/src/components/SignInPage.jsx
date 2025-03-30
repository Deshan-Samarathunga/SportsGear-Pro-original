import React, { useState } from "react";
import axios from "axios";
import "./SignInPage.css";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      alert("Login successful!");
      localStorage.setItem("token", res.data.token);
      // Optional: navigate or update auth state
    } catch (err) {
      alert(err?.response?.data?.msg || "Login failed");
    }
  };

  return (
    <section className="register">
      <div className="signin-container">
        <div className="signup-content">
          <form onSubmit={handleSubmit} className="signup-form">
            <h3>Welcome Back</h3>
            <p>Please Enter your Details</p>

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

            <div className="row space-between">
              <div className="form-group-row">
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember">
                  <p>Remember Me</p>
                </label>
              </div>
              <button
                type="button"
                className="btn-link"
                onClick={() => alert("Redirect to forgot password")}
              >
                Forgot password?
              </button>
            </div>

            <div className="form-submit">
              <input
                type="submit"
                value="Sign In"
                className="btn main-btn"
                id="signin"
              />
            </div>
          </form>

          <p>No account yet? <a href="/signup">Sign Up</a></p>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;