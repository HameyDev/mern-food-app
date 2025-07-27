import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMoneyBill, FaCalendarAlt } from "react-icons/fa";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://mern-food-app-030p.onrender.com/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load orders:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className="p-6 text-center text-lg">Loading your orders...</div>;
  if (orders.length === 0) return <div className="p-6 text-center text-gray-600">You haven't placed any orders yet.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-green-700">🛒 My Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-bold text-lg text-gray-800">Order ID: <span className="text-gray-600">{order._id.slice(-6)}</span></p>
                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1"><FaCalendarAlt /> {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                order.status === "preparing" ? "bg-blue-100 text-blue-700" :
                order.status === "on the way" ? "bg-purple-100 text-purple-700" :
                order.status === "delivered" ? "bg-green-100 text-green-700" :
                "bg-red-100 text-red-700"
              }`}>
                {order.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700 mb-1">Delivery To:</p>
                <p className="text-gray-600">{order.deliveryAddress?.street}, {order.deliveryAddress?.city}</p>
                <p className="text-gray-600">📞 {order.deliveryAddress?.phone}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-1">Items:</p>
                <ul className="list-disc ml-5 text-gray-700 space-y-1">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.product?.title || "Deleted Product"} x {item.quantity}
                      {item.selectedSize && ` [${item.selectedSize}]`}
                      {item.selectedFlavor && ` - ${item.selectedFlavor}`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-700 flex items-center gap-2"><FaMoneyBill /> Payment: <span className="font-semibold capitalize">{order.paymentMethod}</span></p>
              <p className="text-lg font-bold text-green-700">Rs. {order.totalPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
