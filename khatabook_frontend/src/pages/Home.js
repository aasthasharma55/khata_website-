import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers, deleteCustomer } from "../api";

export default function HomePage() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("access");
  const navigate = useNavigate();

  // Wrap fetchCustomers in useCallback to avoid linter warning
  const fetchCustomers = useCallback(async () => {
    try {
      const res = await getCustomers(token);
      setCustomers(res.data);
      setFilteredCustomers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleDelete = async (id) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this customer?"))
      return;
    try {
      await deleteCustomer(id, token);
      const updated = customers.filter((c) => c.id !== id);
      setCustomers(updated);
      setFilteredCustomers(
        updated.filter((c) =>
          c.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value) {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter((c) =>
        c.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  };

  if (loading) return <p className="text-center mt-5 fs-5">⏳ Loading...</p>;

  return (
    <div>
      {/* Hero Section */}
      <section
        className="text-white text-center py-5"
        style={{
          background: "linear-gradient(135deg, #6a11cb, #2575fc)",
          borderRadius: "0 0 30px 30px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
        }}
      >
        <h1 className="fw-bold display-5">📒 Khatabook Dashboard</h1>
        <p className="lead opacity-75">
          Manage your customers, credits & debits in one place.
        </p>
        <button
          className="btn btn-light btn-lg rounded-pill px-4 mt-3 shadow-sm fw-bold"
          onClick={() => navigate("/customers")}
        >
          ➕ Add New Customer
        </button>
      </section>

      <div className="container my-5">
        {/* Summary Section */}
        <div className="row g-4 mb-4">
          {[
            {
              label: "Total Customers",
              value: customers.length,
              color: "#00b894",
              icon: "👥",
            },
            {
              label: "Total Credit",
              value: customers.reduce(
                (acc, c) => (c.balance > 0 ? acc + c.balance : acc),
                0
              ),
              color: "#0984e3",
              icon: "💰",
            },
            {
              label: "Total Debit",
              value: customers.reduce(
                (acc, c) => (c.balance < 0 ? acc + Math.abs(c.balance) : acc),
                0
              ),
              color: "#d63031",
              icon: "📉",
            },
          ].map((item, index) => (
            <div className="col-md-4" key={index}>
              <div
                className="card border-0 shadow-lg h-100 text-center p-4 rounded-4"
                style={{
                  background: "linear-gradient(135deg, #ffffff, #f9f9f9)",
                  transition: "all 0.3s ease",
                  borderLeft: `6px solid ${item.color}`,
                }}
              >
                <div
                  className="mb-2"
                  style={{ fontSize: "2.8rem", color: item.color }}
                >
                  {item.icon}
                </div>
                <h5 className="fw-bold text-muted">{item.label}</h5>
                <h2 className="fw-bold" style={{ color: item.color }}>
                  {item.value}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Search Section */}
        <div className="mb-4 text-center">
          <input
            type="text"
            className="form-control shadow-sm mx-auto"
            style={{
              maxWidth: "400px",
              borderRadius: "50px",
              padding: "12px 20px",
              border: "2px solid #6a11cb",
            }}
            placeholder="🔍 Search customers..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        {/* Customer List Section */}
        <div className="card shadow border-0 rounded-4">
          <div
            className="card-header fw-bold text-white rounded-top-4"
            style={{
              background: "linear-gradient(90deg,#6a11cb,#2575fc)",
            }}
          >
            👥 Customer Records
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Balance</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((c) => (
                      <tr key={c.id}>
                        <td className="fw-bold">{c.name}</td>
                        <td>{c.phone}</td>
                        <td>{c.email}</td>
                        <td>
                          <span
                            className={`badge px-3 py-2`}
                            style={{
                              backgroundColor:
                                c.balance >= 0 ? "#00b894" : "#d63031",
                              fontSize: "0.9rem",
                            }}
                          >
                            ₹{c.balance}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="btn-group">
                            <button
                              className="btn btn-outline-primary btn-sm rounded-pill me-2"
                              onClick={() => navigate(`/customers/${c.id}`)}
                            >
                              🔍 View
                            </button>
                            <button
                              className="btn btn-outline-warning btn-sm rounded-pill me-2"
                              onClick={() => navigate(`/customers/${c.id}/edit`)}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm rounded-pill"
                              onClick={() => handleDelete(c.id)}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-3">
                        🚫 No customers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
