import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";

const Navbar = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.length;

  const isLoggedIn = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name?.split(" ")[0]; // Just the first name

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successfully!");
    setTimeout(() => {
     navigate("/login");
    }, 2000);
  };

  return (
    <nav className="bg-gray-900 shadow-lg p-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-3xl font-extrabold bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 bg-clip-text text-transparent drop-shadow-lg tracking-wide hover:scale-105 transition-transform duration-300">
        FlaVor<span className="text-white drop-shadow-md">VerSe</span>
      </Link>


      <div className="flex items-center gap-6">
        <Link to="/" className="text-white hover:text-red-500 transition-colors duration-300">
          Home
        </Link>
        <Link to="/menu" className="text-white hover:text-red-500 transition-colors duration-300">
          Menu
        </Link>
        <Link to="/favorites" className="text-white hover:text-red-500 transition-colors duration-300">
          Favorites
        </Link>
        <Link to="/myorders" className="text-white hover:text-red-500 transition-colors duration-300">
          My Orders
        </Link>

        {!isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1 border border-red-400 rounded-md text-white hover:bg-red-500 transition-colors duration-300"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-1 border border-red-400 rounded-md text-white hover:bg-red-500 transition-colors duration-300"
            >
              Signup
            </button>
          </>
        ) : (
          <>
          <span className="text-gray-600 font-medium">👤 Hi, {userName}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-1 border border-white rounded-md hover:bg-red-500 transition-colors duration-300"
          >
            Logout
          </button>
          </>
        )}

        {/* Cart Icon with Badge */}
        <Link to="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-white hover:text-red-500 transition-colors duration-300" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

