// client/src/admin/pages/ProductsList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../admin.css";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id)); // remove from UI
      alert("Product deleted.");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <div className="flex justify-between items-center mb-4">
            <h2 className="page-title">Products</h2>
            <button
              onClick={() => navigate("/admin/products/add")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition duration-200"
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
                {products.map((p) => (
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
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No products available.
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
