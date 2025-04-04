// client/src/components/CartPage.jsx

import React from "react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <div className="container py-5"><h4>Your cart is empty.</h4></div>;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Shopping Cart</h2>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>Rs.{item.price}</td>
              <td>Rs.{item.quantity * item.price}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item._id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartPage;
