import React, { useState } from "react";
import { sendResetEmail } from "../api";

export default function ResetEmail() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendResetEmail(email);
      setMessage("✅ Password reset link sent to your email.");
    } catch (err) {
      setMessage("❌ Error sending reset link. Try again!");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)", // soft blue background
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
        <h2 className="text-center mb-3 text-primary fw-bold">
          Reset Password
        </h2>
        <p className="text-center text-muted mb-4">
          Enter your registered email and we’ll send you a reset link.
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
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 btn-lg"
            style={{ borderRadius: "10px" }}
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center mt-4 text-muted" style={{ fontSize: "14px" }}>
          Remembered your password?{" "}
          <a href="/login" className="fw-bold text-decoration-none text-primary">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
