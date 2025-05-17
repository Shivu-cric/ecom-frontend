import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find(u => u.email === email);

      if (existingUser) {
        setError("An account with this email already exists. Please login instead.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }

      // Create new user
      const newUser = {
        email,
        password, // In a real app, this should be hashed
        createdAt: new Date().toISOString()
      };

      // Add user to users array
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Log in the new user
      login(newUser);
      navigate("/");
    } catch (error) {
      setError("Failed to create account. Please try again.");
    }
  };

  // If user is already logged in, don't render the form
  if (user) {
    return null;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join us today</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-btn">
            Sign Up
          </button>

          <div className="divider">or sign up with</div>

          <div className="social-buttons">
            <button type="button" className="social-btn google">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt="Google"
              />
              Google
            </button>
            <button type="button" className="social-btn facebook">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
              />
              Facebook
            </button>
          </div>

          <p className="auth-footer">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
