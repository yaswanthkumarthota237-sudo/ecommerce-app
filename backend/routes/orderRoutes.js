const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Logged-in user routes
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);

// Admin-only routes
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;
