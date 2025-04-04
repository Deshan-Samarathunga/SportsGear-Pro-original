// server/routes/cart.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// ✅ Get user cart
router.get("/", auth, async (req, res) => {
  try {
    res.status(200).json(req.user.cart || []);
  } catch (err) {
    console.error("Cart fetch failed:", err);
    res.status(500).json({ msg: "Failed to fetch cart" });
  }
});

// ✅ Update user cart (overwrite)
router.post("/", auth, async (req, res) => {
  try {
    const incomingCart = req.body;

    // Validate each item in incomingCart (basic check)
    if (!Array.isArray(incomingCart)) {
      return res.status(400).json({ msg: "Cart must be an array" });
    }

    req.user.cart = incomingCart;
    await req.user.save();

    res.status(200).json({ msg: "Cart updated" });
  } catch (err) {
    console.error("Cart update failed:", err);
    res.status(500).json({ msg: "Server error while saving cart" });
  }
});

// ✅ Clear user cart
router.delete("/", auth, async (req, res) => {
  try {
    req.user.cart = [];
    await req.user.save();
    res.status(200).json({ msg: "Cart cleared" });
  } catch (err) {
    console.error("Cart clear failed:", err);
    res.status(500).json({ msg: "Server error while clearing cart" });
  }
});

module.exports = router;
