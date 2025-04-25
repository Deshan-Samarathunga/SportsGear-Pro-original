// client/src/components/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./style/ProductsPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || product.category === selectedCategory)
      );
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const categories = ["All", ...new Set(products.map((item) => item.category))];

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <section className="product-page">
      <div className="container">
        <div className="controls">
          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="container">
        <div className="grid-3">
          {filteredProducts.map((product) => (
            <div key={product._id} className="card">
              <Link to={`/product/${product._id}`} className="card-img">
                <img src={product.imageUrl} alt={product.name} />
              </Link>
              <div className="card-body">
                <h4>{product.name}</h4>
                <p>Category: {product.category}</p>
                <p>Available: {product.quantity}</p>
                <hr />
                <h3>Rs.{product.price}</h3>
                <div className="row buttons">
                  <button
                    className="cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <Link to={`/product/${product._id}`} className="buy-btn">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;