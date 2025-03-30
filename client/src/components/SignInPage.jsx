import React, { useState } from "react";
import "./SignInPage.css";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
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
                <input type="checkbox" name="terms" id="terms" />
                <label htmlFor="terms">
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
