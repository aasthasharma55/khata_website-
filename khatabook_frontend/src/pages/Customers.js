import React, { useEffect, useState } from "react";
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from "../api";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [editCustomer, setEditCustomer] = useState(null);
  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const validate = () => {
    const newErrors = {};

    // Name → only letters + spaces
    if (!/^[A-Za-z\s]+$/.test(form.name.trim())) {
      newErrors.name = "Name must contain only letters and spaces.";
    }

    // Phone → must be 10 digits only
    if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    // Email → simple regex (extra safety)
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // ❌ stop if invalid

    try {
      if (editCustomer) {
        await updateCustomer(editCustomer.id, form);
        setEditCustomer(null);
      } else {
        await addCustomer(form);
      }
      setForm({ name: "", phone: "", email: "" });
      fetchCustomers();
      setErrors({});
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (customer) => {
    setEditCustomer(customer);
    setForm({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await deleteCustomer(id);
      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-5">
      {/* Back Button */}
      <div className="mb-4">
        <Link
          to="/"
          className="btn btn-lg btn-outline-primary d-inline-flex align-items-center gap-2 shadow-sm rounded-pill px-4 py-2"
        >
          <i className="bi bi-arrow-left-circle fs-5"></i>
          <span className="fw-semibold">Back to Home</span>
        </Link>
      </div>

      {/* Page Title */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">
          <i className="bi bi-people-fill me-2"></i> Customer Management
        </h1>
        <p className="text-muted">
          Easily manage customers, track balances, and record transactions.
        </p>
      </div>

      {/* Add / Edit Customer Form */}
      <div className="card border-0 shadow-lg mb-5">
        <div
          className={`card-header ${
            editCustomer ? "bg-warning" : "bg-primary"
          } text-white fw-bold fs-5`}
        >
          <i
            className={`bi ${
              editCustomer ? "bi-pencil-square me-2" : "bi-person-plus-fill me-2"
            }`}
          ></i>
          {editCustomer ? "Edit Customer" : "Add New Customer"}
        </div>
        <div className="card-body">
          <form className="row g-3" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                className={`form-control form-control-lg ${
                  errors.name ? "is-invalid" : ""
                }`}
                placeholder="Enter full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            {/* Phone */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">Phone</label>
              <input
                className={`form-control form-control-lg ${
                  errors.phone ? "is-invalid" : ""
                }`}
                placeholder="Enter phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            {/* Email */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className={`form-control form-control-lg ${
                  errors.email ? "is-invalid" : ""
                }`}
                placeholder="Enter email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {/* Buttons */}
            <div className="col-12 text-end">
              <button
                className={`btn ${
                  editCustomer ? "btn-warning" : "btn-success"
                } btn-lg px-5 shadow-sm`}
              >
                {editCustomer ? (
                  <>
                    <i className="bi bi-pencil-square me-2"></i> Update Customer
                  </>
                ) : (
                  <>
                    <i className="bi bi-plus-circle me-2"></i> Add Customer
                  </>
                )}
              </button>
              {editCustomer && (
                <button
                  type="button"
                  className="btn btn-secondary btn-lg ms-2 px-4 shadow-sm"
                  onClick={() => {
                    setEditCustomer(null);
                    setForm({ name: "", phone: "", email: "" });
                    setErrors({});
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card border-0 shadow-lg">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold text-dark">
            <i className="bi bi-card-list me-2"></i> Customer List
          </h5>
          <span className="badge rounded-pill bg-primary px-3 py-2 fs-6 shadow-sm">
            Total: {customers.length}
          </span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-primary text-dark">
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Balance</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id}>
                    <td className="fw-semibold">{c.name}</td>
                    <td>{c.phone || "-"}</td>
                    <td>{c.email || "-"}</td>
                    <td>
                      <span
                        className={`badge rounded-pill px-3 py-2 fs-6 shadow-sm ${
                          c.balance >= 0 ? "bg-success" : "bg-danger"
                        }`}
                      >
                        ₹{c.balance}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => navigate(`/customers/${c.id}`)}
                      >
                        <i className="bi bi-eye-fill"></i> View
                      </button>
                      <button
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => handleEdit(c)}
                      >
                        <i className="bi bi-pencil-fill"></i> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className="bi bi-trash-fill"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-5">
                      <i className="bi bi-emoji-frown fs-2 d-block mb-2"></i>
                      No customers found 🚫
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
