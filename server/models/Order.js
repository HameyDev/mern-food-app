const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      selectedSize: String,
      selectedFlavor: String,
      quantity: { type: Number, default: 1 },
      notes: String
    }
  ],
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["cash", "card"], required: true },
  deliveryAddress: { street: String, city: String, phone: String },
  status: { type: String, enum: ["pending", "preparing", "on the way", "delivered", "cancelled"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);