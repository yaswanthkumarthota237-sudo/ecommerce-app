const jwt = require("jsonwebtoken");
const User = require("../models/User");

// This checks: "Is this request coming from a logged-in user?"
// It reads the token sent by the frontend and verifies it.
const protect = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      token = authHeader.split(" ")[1]; // "Bearer <token>" -> take the token part

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // attach user info to request, minus password, so routes can use it
      req.user = await User.findById(decoded.id).select("-password");

      next(); // move on to the actual route
    } catch (err) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// This checks: "Is this logged-in user an Admin?"
// Used only on routes that only admins should access (like adding a product)
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied, admins only" });
  }
};

module.exports = { protect, adminOnly };
