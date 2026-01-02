import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
    setIsOpen(false);
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm sticky-top px-3"
      style={{
        background: "linear-gradient(90deg, #1e3c72, #2a5298)", // gradient blue
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Brand / Logo */}
      <Link
        className="navbar-brand fw-bold d-flex align-items-center"
        to="/"
        onClick={handleNavClick}
        style={{
          fontSize: "1.5rem",
          letterSpacing: "1px",
          color: "#ffd700", // golden yellow
          transition: "color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.color = "#fff")}
        onMouseLeave={(e) => (e.target.style.color = "#ffd700")}
      >
        <span style={{ marginRight: "8px", fontSize: "1.8rem" }}>📘</span>
        Khatabook
      </Link>

      {/* Toggle Button */}
      <button
        className="navbar-toggler border-0"
        type="button"
        aria-controls="navbarNav"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <span style={{ fontSize: "2rem", color: "#ffd700" }}>&times;</span>
        ) : (
          <span className="navbar-toggler-icon"></span>
        )}
      </button>

      {/* Navbar Links */}
      <div
        className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
        id="navbarNav"
      >
        {/* Center Links */}
        <ul className="navbar-nav mx-auto">
          {[
            { name: "Home", link: "/" },
            { name: "Customers", link: "/customers" },
            { name: "FinanceVideos", link: "/smartreminder" },
            { name: "About", link: "/about" },
            { name: "Contact", link: "/contact" },
          ].map((item, index) => (
            <li className="nav-item mx-2" key={index}>
              <Link
                className="nav-link fw-semibold"
                to={item.link}
                onClick={handleNavClick}
                style={{
                  color: "white",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  padding: "6px 12px",
                  borderRadius: "8px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#ffd700";
                  e.target.style.color = "#1e3c72";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "white";
                }}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side Buttons */}
        <ul className="navbar-nav ms-auto d-flex align-items-center">
          {!token ? (
            <>
              <li className="nav-item">
                <Link
                  className="btn btn-outline-light btn-sm fw-bold px-3 me-2"
                  to="/login"
                  onClick={handleNavClick}
                  style={{
                    borderRadius: "25px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#ffd700";
                    e.target.style.color = "#1e3c72";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "white";
                  }}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-warning btn-sm fw-bold px-3"
                  to="/register"
                  onClick={handleNavClick}
                  style={{
                    borderRadius: "25px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#ffcc33";
                    e.target.style.color = "#1e3c72";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#ffc107";
                    e.target.style.color = "black";
                  }}
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link fw-semibold text-white"
                  to="/profile"
                  onClick={handleNavClick}
                  style={{
                    fontSize: "1rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#ffd700")}
                  onMouseLeave={(e) => (e.target.style.color = "white")}
                >
                  👤 Profile
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-danger btn-sm ms-2 fw-bold px-3"
                  onClick={handleLogout}
                  style={{
                    borderRadius: "25px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#b71c1c")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#dc3545")
                  }
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
