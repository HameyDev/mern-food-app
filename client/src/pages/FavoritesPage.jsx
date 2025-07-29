import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    document.title = "Favorites | FlavorVerse";
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://mern-food-app-030p.onrender.com/api/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(res.data.user || []);
    } catch (err) {
      console.error("Failed to load favorites:", err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Favorites ❤️</h2>
      {favorites.length === 0 ? (
        <p>No favorite products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <ProductCard
              key={item._id}
              item={item}
              isFavorite={true}
              refreshFavorites={fetchFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
