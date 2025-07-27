const express = require("express");
const { getAllProducts, getSingleProduct, createProduct } = require("../controllers/productController");
const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getSingleProduct);

router.post("/", createProduct);

module.exports = router;