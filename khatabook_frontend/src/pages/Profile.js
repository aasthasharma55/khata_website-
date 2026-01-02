import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    getProfile(token)
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "#f0f9ff",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          maxWidth: "420px",
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #e0f2fe",
        }}
      >
        {/* Back to Home Button */}
        <div className="p-3">
          <button
            className="btn btn-outline-primary btn-sm rounded-pill"
            onClick={() => navigate("/")}
          >
            🏠 Back to Home
          </button>
        </div>

        {/* Header with teal-blue gradient */}
        <div
          className="p-4 text-center"
          style={{
            background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
            color: "#fff",
          }}
        >
          {/* Avatar Circle */}
          <div
            className="mx-auto mb-3"
            style={{
              width: "85px",
              height: "85px",
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.2rem",
              fontWeight: "700",
              color: "#0ea5e9",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {profile ? profile.name.charAt(0).toUpperCase() : "U"}
          </div>
          <h2 className="mb-0 fw-bold">{profile ? profile.name : "User"}</h2>
          <p className="mb-0" style={{ opacity: 0.9, fontSize: "0.9rem" }}>
            {profile ? profile.email : "Loading..."}
          </p>
        </div>

        {/* Profile details */}
        {profile ? (
          <div className="p-4" style={{ backgroundColor: "#ffffff" }}>
            {/* Name Card */}
            <div
              className="mb-3 p-3"
              style={{
                borderRadius: "12px",
                backgroundColor: "#ecfdf5",
                border: "1px solid #d1fae5",
                transition: "all 0.3s ease",
              }}
            >
              <p className="mb-1 fw-semibold" style={{ color: "#047857" }}>
                👤 Name
              </p>
              <p style={{ fontSize: "1.1rem", color: "#065f46" }}>{profile.name}</p>
            </div>

            {/* Email Card */}
            <div
              className="p-3"
              style={{
                borderRadius: "12px",
                backgroundColor: "#eff6ff",
                border: "1px solid #dbeafe",
                transition: "all 0.3s ease",
              }}
            >
              <p className="mb-1 fw-semibold" style={{ color: "#1d4ed8" }}>
                📧 Email
              </p>
              <p style={{ fontSize: "1.1rem", color: "#1e40af" }}>{profile.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-center p-4">Loading profile...</p>
        )}
      </div>
    </div>
  );
}
