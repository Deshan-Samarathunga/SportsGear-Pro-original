// server/controllers/userController.js
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }) // ⛔ exclude admin
      .select("-password") // hide password
      .sort({ createdAt: -1 }); // newest users first

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

//deleteUser controller function
exports.deleteUser = async (req, res) => {
  try {
    // First find the user
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    //  Prevent admin deletion
    if (user.role === "admin") {
      return res.status(403).json({ message: "Cannot delete admin users" });
    }

    // Proceed to delete if not admin
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};
