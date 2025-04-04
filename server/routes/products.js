// server/routes/products.js
const express = require('express');
const router = express.Router();
const {
  addProduct,
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct
} = require("../controllers/productController");
const Product = require("../models/Product");

router.post("/", addProduct);   // Add new product
router.get("/", getProducts);   // Get all products
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct); 

// PATCH /api/products/:id/decrease
router.patch("/:id/decrease", async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    product.quantity = Math.max(0, product.quantity - quantity);
    await product.save();
    res.json({ msg: "Inventory updated" });
  } catch (err) {
    res.status(500).json({ msg: "Server error while reducing quantity" });
  }
});

module.exports = router;
