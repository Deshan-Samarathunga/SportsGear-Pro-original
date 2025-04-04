const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const { getAllUsers, deleteUser } = require("../controllers/userController");

// ✅ ONLY THIS get route should remain
router.get("/", verifyAdmin, getAllUsers);

// ✅ DELETE route (protected)
router.delete("/:id", verifyAdmin, deleteUser);

module.exports = router;
