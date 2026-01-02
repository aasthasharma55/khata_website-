import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerDetail, updateCustomer } from "../api";

export default function CustomerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState({}); // validation errors
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      const res = await getCustomerDetail(id);
      setForm({
        name: res.data.name || "",
        phone: res.data.phone || "",
        email: res.data.email || "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const newErrors = {};


    if (!/^[A-Za-z\s]+$/.test(form.name.trim())) {
      newErrors.name = "Name must contain only letters and spaces.";
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // ❌ stop if validation fails

    try {
      await updateCustomer(id, form);
      navigate("/"); // redirect to HomePage after update
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading)
    return <p className="text-center mt-5 fs-4 fw-semibold">⏳ Loading...</p>;

  const initials = form.name
    ? form.name
        .split(" ")
        .map((n) => n[0].toUpperCase())
        .join("")
    : "U";

  return (
    <div
      className="d-flex justify-content-center align-items-start py-5"
      style={{ minHeight: "100vh", background: "#eef2f7" }}
    >
      <div
        className="card shadow-lg p-5"
        style={{ maxWidth: "720px", width: "100%", borderRadius: "18px" }}
      >
        {/* Header with Avatar */}
        <div
          className="text-center text-white p-4 mb-5 rounded-top"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          }}
        >
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              color: "#667eea",
              fontSize: "2rem",
              fontWeight: "700",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            {initials}
          </div>
          <h2 className="fw-bold mb-1">{form.name || "Customer"}</h2>
          <p className="mb-0" style={{ opacity: 0.9 }}>
            Update customer details
          </p>
        </div>

        {/* Form */}
        <form className="row g-4" onSubmit={handleSubmit}>
          {["name", "phone", "email"].map((field, idx) => (
            <div className="col-md-4" key={idx}>
              <label className="form-label fw-semibold text-muted">
                {field === "name"
                  ? "Full Name"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                className={`form-control form-control-lg shadow-sm ${
                  errors[field] ? "is-invalid" : ""
                }`}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                required={field === "name"}
                style={{
                  borderRadius: "12px",
                  transition: "0.3s",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                  border: "1px solid #d1d5db",
                }}
                onFocus={(e) =>
                  (e.target.style.boxShadow =
                    "0 0 8px rgba(102, 126, 234, 0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.boxShadow =
                    "inset 0 1px 3px rgba(0,0,0,0.1)")
                }
              />
              {/* 🔹 Error Message */}
              {errors[field] && (
                <div className="invalid-feedback">{errors[field]}</div>
              )}
            </div>
          ))}

          {/* Buttons */}
          <div className="col-12 d-flex justify-content-between mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg rounded-pill shadow-sm"
              onClick={() => navigate("/")}
            >
              🔙 Back to Home
            </button>
            <button
              type="submit"
              className="btn btn-lg rounded-pill shadow-sm"
              style={{
                background: "linear-gradient(90deg, #11998e, #38ef7d)",
                color: "#fff",
              }}
            >
              💾 Update Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
