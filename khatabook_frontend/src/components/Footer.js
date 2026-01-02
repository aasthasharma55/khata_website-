import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0d47a1", // deep blue
        color: "#f5f5f5", // light text
      }}
      className="pt-5 pb-3 mt-5"
    >
      <div className="container">
        <div className="row g-4 text-center text-md-start align-items-start">
          {/* Brand / About */}
          <div className="col-md-4">
            <h4 className="fw-bold mb-3" style={{ color: "#FFD700" }}>
              Khatabook Project
            </h4>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.6", opacity: "0.9" }}>
              A modern digital ledger app to manage transactions, track credits
              & debits, and organize your business accounts. Secure. Simple.
              Smart.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3" style={{ color: "#FFD700" }}>
              Quick Links
            </h5>
            <ul className="list-unstyled">
              {[
                { name: "Home", link: "/" },
                { name: "Features", link: "/features" },
                { name: "Pricing", link: "/pricing" },
                { name: "Help & Support", link: "/help" },
              ].map((item, index) => (
                <li key={index} className="mb-2">
                  <a
                    href={item.link}
                    className="text-decoration-none"
                    style={{
                      color: "#f5f5f5",
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
                    onMouseLeave={(e) => (e.target.style.color = "#f5f5f5")}
                  >
                    ➝ {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3" style={{ color: "#FFD700" }}>
              Get in Touch
            </h5>
            <p style={{ marginBottom: "6px" }}>
              📧{" "}
              <a
                href="mailto:support@khatabookproject.com"
                className="text-light"
              >
                support@khatabookproject.com
              </a>
            </p>
            <p style={{ marginBottom: "12px" }}>📞 +91 98765 43210</p>

            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              {[
                { icon: <FaFacebookF />, link: "https://facebook.com" },
                { icon: <FaTwitter />, link: "https://twitter.com" },
                { icon: <FaLinkedinIn />, link: "https://linkedin.com" },
                { icon: <FaGithub />, link: "https://github.com" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    color: "#fff",
                    fontSize: "1.1rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFD700";
                    e.currentTarget.style.color = "#0d47a1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.15)";
                    e.currentTarget.style.color = "#fff";
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="text-center mt-4 pt-3"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.25)",
            fontSize: "0.9rem",
            opacity: "0.85",
          }}
        >
          © {new Date().getFullYear()} <b>Khatabook Project</b>. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
}
