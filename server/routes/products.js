const express = require('express');
const router = express.Router();
const { addProduct, getProducts, deleteProduct, getProductById, updateProduct } = require("../controllers/productController");
router.post("/", addProduct);   // Add new product
router.get("/", getProducts);   // Get all products
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct); 

module.exports = router;
