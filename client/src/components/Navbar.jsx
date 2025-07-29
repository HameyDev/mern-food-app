import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react";
import { toast } from "react-toastify";



const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.length;
  const isLoggedIn = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name?.split(" ")[0]; // First name only

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successfully!");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <nav className="bg-gray-900 shadow-lg p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 bg-clip-text text-transparent drop-shadow-lg tracking-wide"
        >
          FlaVor<span className="text-white drop-shadow-md">VerSe</span>
        </Link>

        {/* Mobile menu icon */}
        <div className="md:hidden flex items-center gap-3">
          <Link to="/cart" className="relative">
            <ShoppingCart className="text-white w-6 h-6 hover:text-red-500 transition mx-auto" />
              {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={26} className="text-white" /> : <Menu size={26} className="text-white" />}
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white hover:text-red-500 transition">Home</Link>
          <Link to="/menu" className="text-white hover:text-red-500 transition">Menu</Link>
          <Link to="/favorites" className="text-white hover:text-red-500 transition">Favorites</Link>
          <Link to="/myorders" className="text-white hover:text-red-500 transition">My Orders</Link>

          {isLoggedIn ? (
            <>
              <span className="text-gray-400 font-medium">👤 Hi, {userName}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 border text-white border-white rounded hover:bg-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-3 py-1 border border-red-400 text-white rounded hover:bg-red-500 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-3 py-1 border border-red-400 text-white rounded hover:bg-red-500 transition"
              >
                Signup
              </button>
            </>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="text-white w-6 h-6 hover:text-red-500 transition" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 bg-gray-800 p-4 rounded shadow-lg">
          <Link to="/" className="text-white hover:text-red-400 mx-auto" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/menu" className="text-white hover:text-red-400 mx-auto" onClick={() => setMenuOpen(false)}>Menu</Link>
          <Link to="/favorites" className="text-white hover:text-red-400 mx-auto" onClick={() => setMenuOpen(false)}>Favorites</Link>
          <Link to="/myorders" className="text-white hover:text-red-400 mx-auto" onClick={() => setMenuOpen(false)}>My Orders</Link>

          {isLoggedIn ? (
            <>
              <span className="text-gray-400">👤 Hi, {userName}</span>
              <button
                onClick={() => { setMenuOpen(false); handleLogout(); }}
                className="px-3 py-1 border border-white text-white rounded hover:bg-red-500 transition text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { setMenuOpen(false); navigate("/login"); }}
                className="px-3 py-1 border border-red-400 text-white rounded hover:bg-red-500 transition"
              >
                Login
              </button>
              <button
                onClick={() => { setMenuOpen(false); navigate("/signup"); }}
                className="px-3 py-1 border border-red-400 text-white rounded hover:bg-red-500 transition"
              >
                Signup
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
