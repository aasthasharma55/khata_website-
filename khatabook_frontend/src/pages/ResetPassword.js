import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api";

export default function ResetPasswordPage() {
  const { uid, token } = useParams();
  const [form, setForm] = useState({ password: "", password2: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      setMessage("❌ Passwords do not match!");
      return;
    }
    try {
      await resetPassword(uid, token, form);
      setMessage("✅ Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("❌ Error resetting password. Try again!");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fceabb, #f8b500)",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "420px",
          width: "100%",
          borderRadius: "15px",
          border: "1px solid #ddd",
        }}
      >
        <h2 className="text-center mb-3 text-dark fw-bold">
          🔐 Set New Password
        </h2>
        <p className="text-center text-muted mb-4">
          Enter and confirm your new password to secure your account.
        </p>

        {message && (
          <div
            className={`alert ${
              message.includes("✅") ? "alert-success" : "alert-danger"
            } text-center py-2`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg"
              name="password"
              placeholder="New Password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg"
              name="password2"
              placeholder="Confirm Password"
              value={form.password2}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning w-100 btn-lg text-dark fw-bold"
            style={{ borderRadius: "10px" }}
          >
            Reset Password
          </button>
        </form>

        <p
          className="text-center mt-4 text-muted"
          style={{ fontSize: "14px" }}
        >
          Remembered your password?{" "}
          <a
            href="/login"
            className="fw-bold text-decoration-none text-dark"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
