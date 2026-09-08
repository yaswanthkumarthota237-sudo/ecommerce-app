const mongoose = require("mongoose");

// User Schema - stores login info + role (Admin or User)
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // no two users can have same email
    },
    password: {
      type: String,
      required: true, // this will be stored as a hashed value, never plain text
    },
    role: {
      type: String,
      enum: ["admin", "user"], // only these two values allowed
      default: "user",
    },
  },
  { timestamps: true } // automatically adds createdAt, updatedAt
);

module.exports = mongoose.model("User", userSchema);
