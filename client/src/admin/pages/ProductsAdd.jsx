// client/src/admin/pages/ProductsAdd.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../admin.css";

const ProductsAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(isEditMode);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    imageUrl: "",
    description: ""
  });

  useEffect(() => {
    if (isEditMode) {
      axios.get(`http://localhost:5000/api/products/${id}`)
        .then((res) => setFormData(res.data))
        .catch((err) => {
          console.error("Failed to fetch product:", err);
          alert("Product not found");
          navigate("/admin/products");
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };

    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/products/${id}`, payload);
        alert("Product updated!");
      } else {
        await axios.post("http://localhost:5000/api/products", payload);
        alert("Product added!");
      }
      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.error || error.message));
    }
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <div className="admin-content">Loading product...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-content">
          <div className="form-container bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">
              {isEditMode ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit} className="admin-form">
              {/* Name */}
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  required
                />
              </div>

              {/* Category */}
              <div className="form-group">
                <label>Category:</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Football"
                  required
                />
              </div>

              {/* Price & Quantity side by side */}
              <div className="form-row">
                <div className="form-group">
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 2500"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    required
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description..."
                  rows={4}
                />
              </div>

              {/* Buttons */}
              <div className="btn-group">
                <button
                  type="button"
                  onClick={() => navigate("/admin/products")}
                  className="admin-btn"
                >
                  Back to List
                </button>
                <button type="submit" className="admin-btn">
                  {isEditMode ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsAdd;
