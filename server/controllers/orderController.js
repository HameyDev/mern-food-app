const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  const userId = req.userId;
  const { items, totalPrice, paymentMethod, deliveryAddress } = req.body;

  try {
    const order = new Order({
      user: userId,
      items,
      totalPrice,
      paymentMethod,
      deliveryAddress
    });

    await order.save();

    res.status(200).json({ message: "Order Placed", order });
  } catch (err) {
    console.error("❌ Order saving error:", err);
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  const userId = req.userId;

  try {
    const orders = await Order.find({ user: userId }).populate("items.product");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};