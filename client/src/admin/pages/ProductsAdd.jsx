// client/src/admin/pages/ProductsAdd.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
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
          <Topbar />
          <div className="admin-content">Loading product...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <div className="form-container bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">
              {isEditMode ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {[ 
                { label: "Name", name: "name", type: "text", placeholder: "Product Name" },
                { label: "Category", name: "category", type: "text", placeholder: "e.g. Football" },
                { label: "Price", name: "price", type: "number", placeholder: "e.g. 2500" },
                { label: "Quantity", name: "quantity", type: "number", placeholder: "e.g. 5" },
                { label: "Image URL", name: "imageUrl", type: "text", placeholder: "https://example.com/image.jpg" }
              ].map((field) => (
                <div key={field.name}>
                  <label className="block font-medium mb-1">{field.label}:</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full border border-gray-300 px-4 py-2 rounded bg-gray-50"
                    required={field.name !== "imageUrl"}
                  />
                </div>
              ))}

              {/* New field: Description */}
              <div>
                <label className="block font-medium mb-1">Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description..."
                  className="w-full border border-gray-300 px-4 py-2 rounded bg-gray-50"
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/admin/products")}
                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition"
                >
                  Back to List
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded transition"
                >
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
