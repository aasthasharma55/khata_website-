import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      setMessage("🎉 Registration successful! You can now login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("⚠️ Error registering user. Please try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #dbeafe, #f0fdf4)", // Light blue → green gradient
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "450px",
          width: "100%",
          borderRadius: "15px",
          border: "2px solid #22c55e",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Title */}
        <h2 className="text-center mb-3" style={{ color: "#2563eb" }}>
          📒 Khatabook Register
        </h2>
        <p className="text-center text-muted mb-4" style={{ fontSize: "14px" }}>
          Manage your business accounts smartly & securely
        </p>

        {/* Alert */}
        {message && (
          <div
            className={`alert ${
              message.includes("successful")
                ? "alert-success"
                : "alert-danger"
            } text-center py-2`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Full Name"
              name="name"
              onChange={handleChange}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
              required
              style={{ borderRadius: "10px" }}
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
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Confirm Password"
              name="password2"
              onChange={handleChange}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-success w-100 btn-lg"
            style={{
              borderRadius: "10px",
              fontWeight: "bold",
              backgroundColor: "#22c55e",
              border: "none",
            }}
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="fw-bold" style={{ color: "#2563eb" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
