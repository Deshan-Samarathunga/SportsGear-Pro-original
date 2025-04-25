//client/src/admin/pages/SalesReport.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../admin.css";

const SalesReport = () => {
    const [report, setReport] = useState(null);
    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/orders/report", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setReport(res.data))
            .catch((err) => console.error("❌ Failed to fetch report", err));
    }, [token]);

    if (!report)
        return (
            <div className="admin-layout">
                <Sidebar />
                <div className="admin-main">
                    <div className="admin-content">Loading report...</div>
                </div>
            </div>
        );

    return (
        <div className="admin-layout">
            <Sidebar />
            <div className="admin-main">
                <div className="admin-content">
                    <h2 className="page-title">Sales Report</h2>

                    <div className="stat-cards">
                        <div className="stat-card stat-clean-card">
                            <div className="stat-number">{report.daily.count}</div>
                            <div className="stat-label">Daily Orders</div>
                            <div className="stat-total">Total: Rs.{report.daily.total.toLocaleString()}</div>
                        </div>

                        <div className="stat-card stat-clean-card">
                            <div className="stat-number">{report.weekly.count}</div>
                            <div className="stat-label">Weekly Orders</div>
                            <div className="stat-total">Total: Rs.{report.weekly.total.toLocaleString()}</div>
                        </div>

                        <div className="stat-card stat-clean-card">
                            <div className="stat-number">{report.monthly.count}</div>
                            <div className="stat-label">Monthly Orders</div>
                            <div className="stat-total">Total: Rs.{report.monthly.total.toLocaleString()}</div>
                        </div>
                    </div>


                    <h4 className="mt-4">All Orders</h4>
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {report.history.map((o) => (
                                <tr key={o._id}>
                                    <td>{o.userId}</td>
                                    <td>{o.name}</td>
                                    <td>{o.quantity}</td>
                                    <td>Rs.{o.quantity * o.price}</td>
                                    <td>
                                        <span className={`badge ${o.status === "pending"
                                                ? "bg-warning text-dark"
                                                : o.status === "processing"
                                                    ? "bg-success"
                                                    : o.status === "unsuccessful"
                                                        ? "bg-danger"
                                                        : "bg-secondary"
                                            }`}>
                                            {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>{new Date(o.createdAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default SalesReport;
