import React, { useState } from "react";
import { loginUser } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("access", res.data.token.access);
      localStorage.setItem("refresh", res.data.token.refresh);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f9ff, #e0f7f3)", // soft blue-green gradient
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "420px",
          width: "100%",
          borderRadius: "18px",
          border: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Logo / Header */}
        <div className="text-center mb-4">
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #22c55e, #10b981)", // Khatabook green
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 15px",
              color: "#fff",
              fontSize: "1.8rem",
              fontWeight: "700",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            ₹
          </div>
          <h2 className="fw-bold" style={{ color: "#047857" }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
            Login to continue using <b>Khatabook</b>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
              required
              style={{
                borderRadius: "12px",
                border: "1px solid #d1fae5",
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
              style={{
                borderRadius: "12px",
                border: "1px solid #d1fae5",
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 btn-lg"
            style={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              border: "none",
              fontWeight: "600",
            }}
          >
            Login
          </button>
        </form>

        {/* Links */}
        <div className="text-center mt-3">
          <Link to="/reset-email" className="text-decoration-none fw-semibold">
            Forgot Password?
          </Link>
        </div>

        <div className="text-center mt-3">
          <span className="text-muted">Don’t have an account? </span>
          <Link to="/register" className="fw-semibold" style={{ color: "#16a34a" }}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
