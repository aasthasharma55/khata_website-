import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaWallet,
  FaMoneyBillWave,
  FaClipboardList,
  FaMobileAlt,
  FaChartLine,
  FaRegLightbulb,
  FaCog,
} from "react-icons/fa";

export default function AboutPage() {
  const navigate = useNavigate();

  const features = [
    { icon: FaUsers, title: "Add & Manage Customers", text: "Quickly add, edit, and manage all your customers from a single dashboard.", color: "#667eea" },
    { icon: FaMoneyBillWave, title: "Track Credits & Debits", text: "Monitor each customer’s transactions, view balances, and track outstanding payments easily.", color: "#f6ad55" },
    { icon: FaWallet, title: "Manage Payments", text: "Record payments, generate receipts, and maintain accurate financial records for your business.", color: "#48bb78" },
  ];

  const highlights = [
    { icon: FaClipboardList, title: "Dashboard Overview", text: "Instantly view total customers, balances, credits, debits, and overall business health.", color: "#f56565" },
    { icon: FaMobileAlt, title: "Responsive Design", text: "Access your Khatabook account seamlessly from mobile, tablet, and desktop devices.", color: "#4299e1" },
    { icon: FaChartLine, title: "Analytics & Reports", text: "Gain insights on customer activity, total balances, and growth trends over time.", color: "#38a169" },
  ];

  const reasons = [
    { icon: FaRegLightbulb, title: "Smart & Easy", text: "Simplifies bookkeeping with intuitive UI and smart automated features." },
    { icon: FaCog, title: "Customizable", text: "Configure the app to match your business needs, categories, and reporting styles." },
  ];

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Header Section */}
      <div style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "#fff",
        padding: "100px 20px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "700" }}>📒 Khatabook App</h1>
        <p style={{ fontSize: "1.2rem", marginTop: "20px", maxWidth: "600px", margin: "20px auto 0" }}>
          Simplify your business bookkeeping with a modern app that manages customers, tracks payments, and monitors business growth.
        </p>
        <p style={{ color: "#e0e0e0", maxWidth: "600px", margin: "10px auto 0" }}>
          Perfect for small business owners, freelancers, and startups who want smart, fast, and secure accounting tools.
        </p>
        <div style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50%",
          top: "-50px",
          left: "-50px",
          transform: "rotate(45deg)"
        }} />
        <div style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "50%",
          bottom: "-100px",
          right: "-100px",
          transform: "rotate(-30deg)"
        }} />
      </div>

      {/* Customer Features */}
      <section style={{ background: "#f7f7f7", padding: "80px 20px", position: "relative" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "60px", color: "#764ba2", fontWeight: "700" }}>👥 Customer Management Features</h2>
        <div className="container">
          <div className="row g-4">
            {features.map((f, i) => (
              <div className="col-md-4" key={i}>
                <div className="glass-card">
                  <div className="icon-circle" style={{ backgroundColor: f.color }}>
                    <f.icon size={30} color="#fff" />
                  </div>
                  <h5 style={{ marginTop: "20px", fontWeight: "600" }}>{f.title}</h5>
                  <p style={{ color: "#555" }}>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section style={{ background: "#e6fffa", padding: "80px 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "60px", color: "#11998e", fontWeight: "700" }}>✨ Khatabook Project Highlights</h2>
        <div className="container">
          <div className="row g-4">
            {highlights.map((h, i) => (
              <div className="col-md-4" key={i}>
                <div className="glass-card">
                  <div className="icon-circle" style={{ backgroundColor: h.color }}>
                    <h.icon size={30} color="#fff" />
                  </div>
                  <h5 style={{ marginTop: "20px", fontWeight: "600" }}>{h.title}</h5>
                  <p style={{ color: "#555" }}>{h.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section style={{ background: "#fffaf7", padding: "80px 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "60px", color: "#ff6a00", fontWeight: "700" }}>💡 Why Khatabook?</h2>
        <div className="container">
          <div className="row g-4 justify-content-center">
            {reasons.map((r, i) => (
              <div className="col-md-5" key={i}>
                <div className="glass-card" style={{ backgroundColor: "#ffd6a5" }}>
                  <div className="icon-circle" style={{ backgroundColor: "#ff6a00" }}>
                    <r.icon size={30} color="#fff" />
                  </div>
                  <h5 style={{ marginTop: "20px", fontWeight: "600" }}>{r.title}</h5>
                  <p style={{ color: "#fff" }}>{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center py-5" style={{ background: "#eef2f7" }}>
        <h3 style={{ fontWeight: "700", marginBottom: "30px" }}>Ready to organize your bookkeeping?</h3>
        <button
          className="btn-animated"
          onClick={() => navigate("/")}
        >
          🚀 Get Started
        </button>
      </div>

      {/* Custom CSS */}
      <style>
        {`
          .glass-card {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(15px);
            padding: 40px 20px;
            border-radius: 20px;
            text-align: center;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 8px 20px rgba(0,0,0,0.15), 0 12px 40px rgba(0,0,0,0.1);
          }
          .glass-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.25), 0 25px 60px rgba(0,0,0,0.2);
          }
          .icon-circle {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          }
          .icon-circle:hover {
            transform: scale(1.2);
            box-shadow: 0 12px 25px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.2);
          }
          .btn-animated {
            padding: 15px 40px;
            font-size: 1.2rem;
            font-weight: 600;
            border-radius: 50px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            border: none;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 8px 20px rgba(0,0,0,0.2), 0 12px 40px rgba(0,0,0,0.15);
          }
          .btn-animated:hover {
            background: linear-gradient(90deg, #764ba2, #667eea);
            transform: scale(1.05);
            box-shadow: 0 15px 35px rgba(0,0,0,0.3), 0 20px 50px rgba(0,0,0,0.2);
          }
        `}
      </style>
    </div>
  );
}
