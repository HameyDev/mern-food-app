const User = require("../models/User");
const Product = require("../models/Product");

exports.toggleFavorite = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;
  
  if (!productId || typeof productId !== 'string' || productId.trim() === '') {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.favorites = user.favorites.filter(fav => fav !== null);

    const isFavorite = user.favorites.some(fav => fav && fav.toString() === productId.toString());


    if (isFavorite) {
      user.favorites.pull(productId);
    } else {
      user.favorites.push(productId);
    }

    await user.save();

    res.status(200).json({
      message: isFavorite ? "Removed from favorites" : "Added to favorites",
      favorites: user.favorites
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update favorites", error: err.message });
  }
};

exports.getFavorites = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate("favorites");    
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user: user.favorites });    
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch favorites", error: err.message });
  }
};