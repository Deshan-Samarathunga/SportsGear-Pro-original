// client/src/admin/pages/InventoryReport.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../admin.css";

const InventoryReport = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error("❌ Failed to fetch inventory", err));
    }, []);

    return (
        <div className="admin-layout">
            <Sidebar />
            <div className="admin-main">
                <div className="admin-content">
                    <h2 className="page-title">Inventory Report</h2>

                    <div className="stat-cards">
                        <div className="stat-card stat-clean-card">
                            <div className="stat-number">{products.length}</div>
                            <div className="stat-label">Total Products</div>
                        </div>

                        <div className="stat-card stat-clean-card">
                            <div className="stat-number">
                                {products.reduce((acc, p) => acc + p.quantity, 0)}
                            </div>
                            <div className="stat-label">Total Items in Stock</div>
                        </div>
                    </div>


                    <h4 className="mt-4">Stock Details</h4>
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p._id}>
                                    <td>{p.name}</td>
                                    <td>{p.category}</td>
                                    <td>Rs.{p.price}</td>
                                    <td>{p.quantity}</td>
                                    <td>
                                        <span className={`badge ${p.quantity === 0
                                                ? "bg-danger"
                                                : p.quantity < 5
                                                    ? "bg-warning text-dark"
                                                    : "bg-success"
                                            }`}>
                                            {p.quantity === 0
                                                ? "Out of Stock"
                                                : p.quantity < 5
                                                    ? "Low Stock"
                                                    : "In Stock"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default InventoryReport;
