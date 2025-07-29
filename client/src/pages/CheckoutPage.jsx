import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [address, setAddress] = useState({ street: "", city: "", phone: "" });
  const token  = localStorage.getItem("token");

  useEffect(() => {
    document.title = "Checkout | FlavorVerse";
  }, []);

   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
  try {
    const orderData = {
      items: cart.map((item) => ({
        product: item.id,
        selectedSize: item.size?.label || "",
        selectedFlavor: item.flavor?.label || "",
        quantity: item.quantity,
        notes: item.notes || ""
      })),
      totalPrice,
      paymentMethod,
      deliveryAddress: address,
    };

    const response = await axios.post(
      "https://mern-food-app-030p.onrender.com/api/orders",
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ IMPORTANT
        },
      }
    );

    const order = response.data.order;
    clearCart();
    toast.success("Order Success!");
    setTimeout(() => {
      navigate(`/thankyou?orderId=${order._id}`);
    }, 2000);
  } catch (err) {
    console.error("Order Error:", err);
    toast.error("Order Error!");
  }
};



  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
        <input
          type="text"
          placeholder="Street"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          className="w-full border rounded p-2 mb-2"
        />
        <input
          type="text"
          placeholder="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          className="w-full border rounded p-2 mb-2"
        />
        <input
          type="text"
          placeholder="Phone"
          value={address.phone}
          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="cash">Cash on Delivery</option>
          <option value="card">Card</option>
        </select>
      </div>

      <div className="flex justify-between items-center mt-8">
        <h3 className="text-xl font-semibold">Total: Rs. {totalPrice.toFixed(0)}</h3>
        <button
          onClick={handleOrder}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;


