const mongoose = require("mongoose");

// Product Schema - each item in the store
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      default: "General",
    },
    stock: {
      type: Number,
      required: true,
      default: 0, // how many units available
    },
    imageUrl: {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to the admin who added this product
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
