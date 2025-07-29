// src/pages/ThankYouPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ThankYouPage = () => {
  const { search } = useLocation();
  const orderId = new URLSearchParams(search).get("orderId");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    document.title = "Thanks | FlavorVerse";
  }, []);
  

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (orderId) {
      axios
        .get(`https://mern-food-app-030p.onrender.com/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Order response:", res.data);
          setOrder(res.data)
        })
        .catch((err) => console.error("Order fetch failed", err));
    }
  }, [orderId]);


  if (!order) return <p className="p-4">Loading your order...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Thank You!</h2>
      <p className="text-lg mb-2">Your order has been placed successfully.</p>
      <div className="bg-gray-100 p-4 rounded mt-4 text-left">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total Price:</strong> Rs. {order.totalPrice}</p>
      </div>
    </div>
  );
};

export default ThankYouPage;
