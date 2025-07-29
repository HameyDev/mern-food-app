import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, clearCart } = useCart();
  const isLoggedIn = !!localStorage.getItem("token");

  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.title = "Cart | FlavorVerse";
  }, []);

  const closePopup = () => {
    setIsClosing(true); // Trigger animation
    setTimeout(() => {
      setShowPopup(false); // Hide after animation
      setIsClosing(false); // Reset
    }, 400); // Duration matches fadeOutDown
  }; 

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleCheckoutClick = () => {
    const isUserLoggedIn = !!localStorage.getItem("token"); // 🔥 fresh check
      if (!isUserLoggedIn) {
        setShowPopup(true);
      } else {
        navigate("/checkout");
      }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/cart");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>

          <div className="mt-8 border-t pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-semibold">
              Total: Rs. {totalPrice.toFixed(0)}
            </h3>
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                disabled={cart.length === 0}
                className={`px-4 py-2 rounded text-white ${
                  cart.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckoutClick}
                disabled={cart.length === 0}
                className={`px-4 py-2 rounded text-white ${
                  cart.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
          <div className={`bg-white p-6 rounded shadow-lg w-[300px] text-center space-y-4 transform transition-transform duration-300 ease-in-out scale-100 
        ${isClosing ? "animate-fadeOutDown" : "animate-fadeInUp"}`}>
            <h3 className="text-lg font-bold text-red-600">Login Required</h3>
            <p className="text-gray-700">Please log in to proceed to checkout.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Login
              </button>
              <button
                onClick={closePopup}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
