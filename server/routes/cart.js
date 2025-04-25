// server/routes/cart.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const User = require("../models/User"); // ✅ Needed for direct update

// ✅ Get user cart
router.get("/", auth, async (req, res) => {
  try {
    res.status(200).json(req.user.cart || []);
  } catch (err) {
    console.error("Cart fetch failed:", err);
    res.status(500).json({ msg: "Failed to fetch cart" });
  }
});

// ✅ Update user cart (overwrite safely without VersionError)
router.post("/", auth, async (req, res) => {
  try {
    const incomingCart = req.body;

    if (!Array.isArray(incomingCart)) {
      return res.status(400).json({ msg: "Cart must be an array" });
    }

    await User.findByIdAndUpdate(req.user._id, { cart: incomingCart });

    res.status(200).json({ msg: "Cart updated" });
  } catch (err) {
    console.error("Cart update failed:", err);
    res.status(500).json({ msg: "Server error while saving cart" });
  }
});

// ✅ Clear user cart (safe update)
router.delete("/", auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { cart: [] });

    res.status(200).json({ msg: "Cart cleared" });
  } catch (err) {
    console.error("Cart clear failed:", err);
    res.status(500).json({ msg: "Server error while clearing cart" });
  }
});

module.exports = router;
