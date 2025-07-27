import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gray-900 text-white py-8 px-6 mt-10">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 items-center">
      {/* Left Side - Copyright */}
      <p className="text-center md:text-left text-sm md:text-base">
        &copy; {new Date().getFullYear()} <span className="font-bold text-red-400">FoodExpress</span>. All rights reserved.
      </p>

      {/* Right Side - Links */}
      <div className="flex justify-center md:justify-end gap-6 text-sm md:text-base">
        <Link to="/" className="hover:text-red-400 transition">Home</Link>
        <Link to="/menu" className="hover:text-red-400 transition">Menu</Link>
        <Link to="/cart" className="hover:text-red-400 transition">Cart</Link>
        <Link to="/checkout" className="hover:text-red-400 transition">Checkout</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
