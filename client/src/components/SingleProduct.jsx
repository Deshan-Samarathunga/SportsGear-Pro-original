import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SingleProduct.css";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error loading product:", err));
  }, [id]);

  const increaseQty = () => {
    if (product && quantity < product.quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleBuyNow = () => {
    alert(`You chose to buy ${quantity} x ${product.name}`);
  };

  const handleAddToCart = () => {
    alert(`${quantity} x ${product.name} added to cart.`);
  };

  if (!product) return <div className="loading">Loading product...</div>;

  return (
    <div className="single-product-page">
      {/* Top section: image and booking side-by-side */}
      <div className="top-section">
        <div className="main-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="booking-card">
          <h2>{product.name}</h2>
          <p className="category">Category: {product.category}</p>
          <p className="price">Rs.{product.price}</p>

          <div className="qty-control">
            <label>Quantity:</label>
            <div className="qty-buttons">
              <button onClick={decreaseQty}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQty}>+</button>
            </div>
          </div>

          <div className="button-group">
            <button onClick={handleBuyNow} className="book-btn">
              Buy Now
            </button>
            <button onClick={handleAddToCart} className="cart-btn">
              Add to Cart
            </button>
          </div>

          <p className="stock">Available: {product.quantity}</p>
        </div>
      </div>

      {/* Description section below */}
      <div className="product-description">
        <h3>Product details</h3>
        <p>{product.description || "No description available."}</p>
      </div>
    </div>
  );
};

export default SingleProduct;
