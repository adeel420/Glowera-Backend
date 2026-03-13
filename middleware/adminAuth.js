const User = require("../models/userModel");

const adminAuthMiddleware = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized. Please login first." });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role !== 1) {
      return res.status(403).json({ error: "Access denied. Admin privileges required." });
    }

    req.admin = user;
    next();
  } catch (error) {
    console.log("Admin Auth Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = adminAuthMiddleware;
