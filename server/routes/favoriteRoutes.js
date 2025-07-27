const express = require("express");
const router = express.Router();
const { toggleFavorite, getFavorites } = require("../controllers/favoriteController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.post("/",requireAuth, toggleFavorite);

router.get("/",requireAuth, getFavorites);

module.exports = router;