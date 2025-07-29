import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

const MenuPage = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    document.title = "Menu | FlavorVerse";
  }, []);

  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const category = query.get("category");
    if (category) setFilter(category.charAt(0).toUpperCase() + category.slice(1));
  }, [location.search]);

  useEffect(() => {
    axios.get("https://mern-food-app-030p.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filtered = filter === "All"
    ? products
    : products.filter((item) => item.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>

      <div className="flex gap-2 mb-6 flex-wrap">
        {["All", "Pizza", "Burger", "Deal", "Fries", "Drink"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg border ${
              filter === cat ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <motion.div
            key={item._id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ProductCard item={item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
