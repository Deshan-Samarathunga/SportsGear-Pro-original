import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../admin.css";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted.");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-content">
          <h2 className="page-title">Products</h2>
          <div className="search-add-wrapper">
            <input
              type="text"
              placeholder="Search by name or category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <button
              onClick={() => navigate("/admin/products/add")}
              className="admin-btn"
            >
              Add New +
            </button>
          </div>
          
          <div className="user-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((p) => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>{p.category}</td>
                      <td>Rs.{p.price}</td>
                      <td>{p.quantity}</td>
                      <td>
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="h-12 w-12 object-cover rounded-full"
                        />
                      </td>
                      <td className="flex gap-4">
                        <button
                          onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                          className="text-blue-500 underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="text-red-500 underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No products found.
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
};

export default ProductsList;
