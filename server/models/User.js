const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  role: { type: String, default: "user" }
}, { timestamps: true });

module.exports = mongoose.model( "User", userSchema );