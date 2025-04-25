// client/src/components/SingleProduct.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/SingleProduct.css";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);

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
    if (!user) {
      alert("Please sign in to proceed with the purchase.");
      navigate("/signin");
      return;
    }

    const orderData = {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      imageUrl: product.imageUrl,
    };

    localStorage.setItem("checkoutOrder", JSON.stringify(orderData));
    navigate("/checkout");
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    alert(`${quantity} x ${product.name} added to cart.`);
  };

  if (!product) return <div className="loading">Loading product...</div>;

  return (
    <div className="single-product-page">
      {/* Top Section: Image and Booking Side by Side */}
      <div className="top-section">
        <div className="main-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="booking-card">
          <h2>{product.name}</h2>
          <p className="category">Category: {product.category}</p>
          <p className="price">Rs.{product.price.toLocaleString()}</p>

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

      {/* Product Description Section */}
      <div className="product-description">
        <h3>Product Details</h3>
        <p>{product.description || "No description available."}</p>
      </div>
    </div>
  );
};

export default SingleProduct;
