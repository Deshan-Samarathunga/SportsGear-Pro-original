// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id || decoded.id; // ✅ handles both cases

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    req.user = user; // 👈 attaches full user for future use
    next();
  } catch (e) {
    console.error("JWT verification failed", e);
    res.status(400).json({ msg: "Token is not valid" });
  }
};
