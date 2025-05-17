import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const formData = { email, password };
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const userData = await response.json();
      login(userData);
      navigate("/");
    } catch (error) {
      // Check if user exists in localStorage as fallback
      try {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find(u => u.email === email);

        if (!existingUser) {
          setError("Account not found. Please sign up first.");
          setTimeout(() => {
            navigate("/signup");
          }, 2000);
          return;
        }

        if (existingUser.password !== password) {
          setError("Invalid password");
          return;
        }

        // Login successful
        login(existingUser);
        navigate("/");
      } catch (localStorageError) {
        setError("Failed to log in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // If user is already logged in, don't render the form
  if (user) {
    return null;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="divider">or continue with</div>

          <div className="social-buttons">
            <button type="button" className="social-btn google" disabled={loading}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt="Google"
              />
              Google
            </button>
            <button type="button" className="social-btn facebook" disabled={loading}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
              />
              Facebook
            </button>
          </div>

          <p className="auth-footer">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
