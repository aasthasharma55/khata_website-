import React, { useEffect, useState } from "react";
import { getTransactionSummary } from "../api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function SummaryCard({ period = "day" }) {
  const [summary, setSummary] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await getTransactionSummary(period);
        setSummary(res.data.summary);

        const chartData = res.data.transactions.map((tx) => ({
          name: tx.date,
          amount: tx.type === "credit" ? Number(tx.amount) : -Number(tx.amount),
        }));
        setData(chartData);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchSummary();
  }, [period]);

  if (loading) return <p>Loading summary...</p>;

  return (
    <div className="card p-3 my-3">
      <h5>Transaction Summary ({period})</h5>
      <p>{summary}</p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `₹${value}`} />
          <Bar dataKey="amount">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.amount >= 0 ? "#28a745" : "#dc3545"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
