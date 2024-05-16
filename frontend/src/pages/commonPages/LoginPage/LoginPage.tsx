// frontend/pages/commonPages/LoginPage/LoginPage.tsx
import React, { useState, useEffect } from "react";
import { loginUser } from "../../../calling/userCaller";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Effect to clear the error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000); // Clears the error state after 5 seconds

      return () => clearTimeout(timer); // Cleanup to prevent memory leak
    }
  }, [error]); // This effect runs whenever the error state changes

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await loginUser(email, password);
      if (response.success) {
        console.log("Login successful", response.data);
        navigate("/agencies"); // Navigate to the Agencies page on success
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      console.error("Login failed:", error.message);
      setError(error.message); // Display the error to the user
    }
  };

  return (
    <div className="main-container">
      <div className="title-container">
        <h1 className="main-header text-white">
          Space Mission Management System
        </h1>
      </div>
      <div className="login-container">
        <h1 className="header text-white">Login</h1>
        <form className="form-container" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-submit">
            Login
          </button>
        </form>
        {error && <div className="popup">{error}</div>}
        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-white hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
