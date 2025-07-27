const express = require("express");
const router = express.Router();
const { placeOrder, getMyOrders, getOrderById } = require("../controllers/orderController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.post("/", requireAuth, placeOrder);

router.get("/", requireAuth, getMyOrders);

router.get("/:id", requireAuth, getOrderById)

module.exports = router;

