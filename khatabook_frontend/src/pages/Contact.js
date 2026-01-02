import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 2000);
  };

  const infoItems = [
    { icon: FaPhoneAlt, text: "+91 98765 43210", bg: "#e0f7fa" },
    { icon: FaEnvelope, text: "support@khatabookproject.com", bg: "#e0f7fa" },
    { icon: FaMapMarkerAlt, text: "Mumbai, Maharashtra, India", bg: "#e0f7fa" },
  ];

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", position: "relative" }}>
      {/* Background Decorations */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #d1c4e9, #ede7f6)",
          top: "-100px",
          left: "-100px",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #b2dfdb, #e0f2f1)",
          bottom: "-150px",
          right: "-150px",
          zIndex: 0,
        }}
      />

      <div
        className="container py-5"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="row g-5 align-items-center">
          {/* Left Info Section */}
          <div className="col-lg-5 text-center text-lg-start">
            <h2
              className="fw-bold mb-4"
              style={{ color: "#6a1b9a", fontSize: "2.5rem" }}
            >
              📞 Contact Us
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "#444" }}>
              Have questions or need help with{" "}
              <strong style={{ color: "#4db6ac" }}>Khatabook Project</strong>?
              Our support team is here to assist you. Get in touch via phone,
              email, or the form.
            </p>

            <div className="mt-4">
              {infoItems.map((item, i) => (
                <p
                  key={i}
                  className="d-flex align-items-center gap-3 mb-3 shadow-sm p-2 rounded"
                  style={{
                    backgroundColor: item.bg,
                    fontWeight: "600",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    transition: "0.3s",
                  }}
                >
                  <item.icon style={{ color: "#6a1b9a", fontSize: "1.2rem" }} />
                  <span>{item.text}</span>
                </p>
              ))}
            </div>
          </div>

          {/* Right Form Section */}
          <div className="col-lg-7">
            <div
              className="p-4 p-md-5 rounded shadow-lg"
              style={{
                background: "linear-gradient(135deg, #7b1fa2, #26a69a)",
                color: "#fff",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              }}
            >
              <h4 className="fw-bold mb-4" style={{ fontSize: "1.8rem" }}>
                💬 Send us a message
              </h4>

              {submitted ? (
                <div
                  className="alert alert-success fw-semibold text-center"
                  style={{
                    backgroundColor: "#fff",
                    color: "#2e7d32",
                    borderRadius: "12px",
                    fontWeight: "600",
                  }}
                >
                  ✅ Thank you! Your message has been sent.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {["name", "email", "message"].map((field, i) => (
                    <div className="mb-3" key={i}>
                      <label className="form-label fw-semibold">
                        {field === "name"
                          ? "Full Name"
                          : field === "email"
                          ? "Email Address"
                          : "Message"}
                      </label>
                      {field !== "message" ? (
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={form[field]}
                          onChange={handleChange}
                          className="form-control shadow"
                          required
                          placeholder={`Enter your ${field}`}
                          style={{
                            borderRadius: "12px",
                            padding: "15px",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                          }}
                        />
                      ) : (
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          className="form-control shadow"
                          rows="5"
                          required
                          placeholder="Write your message..."
                          style={{
                            borderRadius: "12px",
                            padding: "15px",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                          }}
                        ></textarea>
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="btn fw-bold px-5 py-3 mt-2"
                    style={{
                      borderRadius: "50px",
                      background: "linear-gradient(90deg, #d1c4e9, #26a69a)",
                      color: "#fff",
                      fontWeight: "600",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background =
                        "linear-gradient(90deg, #b39ddb, #26a69a)";
                      e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background =
                        "linear-gradient(90deg, #d1c4e9, #26a69a)";
                      e.target.style.transform = "scale(1)";
                    }}
                  >
                    🚀 Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
