import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCustomerDetail,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../api";

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [form, setForm] = useState({ amount: "", type: "credit", description: "" });
  const [editTxn, setEditTxn] = useState(null);

  // Fetch customer details
  const fetchCustomer = useCallback(async () => {
    try {
      const res = await getCustomerDetail(id);
      setCustomer(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  // Add or update transaction
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTxn) {
        await updateTransaction(editTxn.id, form);
        setEditTxn(null);
      } else {
        await addTransaction(id, form);
      }
      setForm({ amount: "", type: "credit", description: "" });
      fetchCustomer();
    } catch (err) {
      console.error(err);
    }
  };

  // Start editing a transaction
  const handleEdit = (txn) => {
    setEditTxn(txn);
    setForm({
      amount: txn.amount,
      type: txn.type,
      description: txn.description || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete a transaction
  const handleDelete = async (txnId) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;
    try {
      await deleteTransaction(txnId);
      fetchCustomer();
    } catch (err) {
      console.error(err);
    }
  };

  if (!customer)
    return <p className="text-center mt-5 fs-4 fw-bold">⏳ Loading customer details...</p>;

  return (
    <div className="container my-5">
      {/* Home Button */}
      <div className="mb-3">
        <button
          className="btn btn-outline-primary rounded-pill"
          onClick={() => navigate("/")}
        >
          🏠 Home
        </button>
      </div>

      {/* Customer Info */}
      <div className="card shadow-lg border-0 rounded-4 mb-5 overflow-hidden">
        <div
          className="card-header text-white p-4"
          style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
        >
          <h2 className="fw-bold mb-0">{customer.name}</h2>
        </div>
        <div className="card-body p-4">
          <h4 className="mb-3">
            Balance:{" "}
            <span
              className={`badge px-4 py-2 fs-5 ${
                customer.balance >= 0 ? "bg-success" : "bg-danger"
              }`}
            >
              ₹{customer.balance}
            </span>
          </h4>
          <p className="mb-2 fs-5">📞 <strong>{customer.phone || "-"}</strong></p>
          <p className="mb-0 fs-5">📧 <strong>{customer.email || "-"}</strong></p>
        </div>
      </div>

      {/* Transaction Form */}
      <div className="card shadow border-0 rounded-4 mb-5">
        <div
          className={`card-header py-3 rounded-top-4 text-white`}
          style={{
            background: editTxn
              ? "linear-gradient(90deg, #f7971e, #ffd200)"
              : "linear-gradient(90deg, #11998e, #38ef7d)",
          }}
        >
          <h4 className="mb-0">
            {editTxn ? "✏️ Update Transaction" : "➕ Add Transaction"}
          </h4>
        </div>
        <div className="card-body p-4">
          <form className="row g-3 align-items-center" onSubmit={handleSubmit}>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control form-control-lg shadow-sm"
                placeholder="💰 Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                required
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-select form-select-lg shadow-sm"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control form-control-lg shadow-sm"
                placeholder="📝 Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="col-md-2 d-grid">
              <button className={`btn btn-lg ${editTxn ? "btn-warning" : "btn-success"} rounded-pill shadow-lg`}>
                {editTxn ? "✏️ Update" : "💾 Save"}
              </button>
              {editTxn && (
                <button
                  type="button"
                  className="btn btn-secondary btn-lg rounded-pill shadow-lg mt-2"
                  onClick={() => {
                    setEditTxn(null);
                    setForm({ amount: "", type: "credit", description: "" });
                  }}
                >
                  ❌ Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card shadow border-0 rounded-4">
        <div
          className="card-header text-white py-3"
          style={{ background: "linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)" }}
        >
          <h4 className="mb-0">📜 Transaction History</h4>
        </div>
        <div className="card-body p-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle table-bordered rounded">
              <thead className="table-dark text-center">
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customer.transactions.length > 0 ? (
                  customer.transactions.map((t) => (
                    <tr key={t.id} className="text-center">
                      <td>
                        <span
                          className={`badge px-3 py-2 fs-6 rounded-pill shadow-sm ${
                            t.type === "credit" ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {t.type}
                        </span>
                      </td>
                      <td className="fw-bold fs-5">₹{t.amount}</td>
                      <td>{t.description || "-"}</td>
                      <td className="text-muted small">
                        {new Date(t.created_at).toLocaleString()}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary rounded-pill me-2"
                          onClick={() => handleEdit(t)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger rounded-pill"
                          onClick={() => handleDelete(t.id)}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4 fs-5">
                      🚫 No transactions yet
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
