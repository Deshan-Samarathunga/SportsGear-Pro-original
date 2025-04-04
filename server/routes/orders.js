const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const mongoose = require("mongoose");
const Order = require("../models/Order");

// ✅ Create a new order
router.post("/", auth, async (req, res) => {
  try {
    const {
      productId,
      name,
      quantity,
      price,
      imageUrl,
    } = req.body;

    const order = new Order({
      userId: new mongoose.Types.ObjectId(req.user._id),
      productId: new mongoose.Types.ObjectId(productId),
      name,
      quantity,
      price,
      imageUrl,
      status: "pending",
    });

    await order.save();
    res.status(201).json({ msg: "Order placed successfully", order });
  } catch (err) {
    console.error("Order creation error:", err.message);
    res.status(500).json({ msg: "Failed to place order", error: err.message });
  }
});

// ✅ Fetch orders of the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching user orders:", err.message);
    res.status(500).json({ msg: "Server error while fetching orders" });
  }
});

// ✅ Fetch all orders (admin only)
router.get("/all", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied. Admins only." });
    }

    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching all orders:", err.message);
    res.status(500).json({ msg: "Server error while fetching all orders" });
  }
});

// ✅ Update order status (for admin)
router.patch("/:id/status", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admins can update order status" });
    }

    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ msg: "Order status updated", order: updatedOrder });
  } catch (err) {
    console.error("Error updating order status:", err.message);
    res.status(500).json({ msg: "Server error while updating order status" });
  }
});

module.exports = router;
