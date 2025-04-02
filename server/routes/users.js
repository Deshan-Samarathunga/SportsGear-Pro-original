const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const User = require('../models/User');
const { getAllUsers, deleteUser } = require("../controllers/userController");


router.get("/", verifyAdmin, getAllUsers);

// Get all users except admins
// hide admin
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } }).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error fetching users' });
  }
});

//DELETE route
router.delete("/:id", verifyAdmin, deleteUser);

module.exports = router;