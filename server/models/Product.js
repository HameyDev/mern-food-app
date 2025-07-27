const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  category: {
    type: String,
    enum: ['pizza', 'burger', 'deal', 'fries', 'drink'],
    required: true
  },
  basePrice: { type: Number, required: true },

  // Only for pizza
  availableSizes: [{ label: String, price: Number }], // for pizza only
  addons: [{ label: String, price: Number }],          // for pizza, burger, fries

  // Only for drinks or deals
  flavors: [String], // for single item like drink or pizza flavor

  // If it's a deal
  isDeal: { type: Boolean, default: false },
  dealOptions: {
    pizzas: [String],   // Just flavor names like ["Fajita", "BBQ"]
    drinks: [String],   // Drink flavors like ["Pepsi", "7Up"]
    burgers: [String],  // Titles like ["Zinger", "Beef"]
  }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);