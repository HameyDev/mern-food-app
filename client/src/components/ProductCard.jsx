import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { Link } from "react-router-dom";

const ProductCard = ({ item, isFavorite = false, refreshFavorites }) => {
  const [liked, setLiked] = useState(isFavorite);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLiked(isFavorite);
  }, [isFavorite]);

  const handleToggleFavorite = async () => {
    if (!token) {
    toast.warning("You must be logged in to add favorites!");
    return;
  }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://mern-food-app-030p.onrender.com/api/favorites",
        { productId: item._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLiked((prev) => {
        const newLiked = !prev;
        toast.success(newLiked ? "Added to Favorites" : "Removed from Favorites");
        return newLiked;
      });

      if (refreshFavorites) refreshFavorites(); // For Favorite page
    } catch (err) {
      toast.error("Failed to toggle favorite");
      console.error(err);
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-xl transition">
      <Link to={`/menu/${item._id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-40 object-cover rounded-lg mb-2 cursor-pointer group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        <h3 className="text-lg font-semibold hover:text-green-600 transition">
          {item.title}
        </h3>
      </Link>
      <p className="text-sm text-gray-600">{item.description?.slice(0, 50)}...</p>
      <p>Rs. {item.basePrice}</p>
      <div className="mt-2 flex justify-between items-center">
        <Link to={`/menu/${item._id}`}>
          <button className="px-3 py-1 bg-green-600 text-white rounded-lg">
            Add to Cart
          </button>
        </Link>  
        <button
          onClick={handleToggleFavorite}
          className="text-xl"
        >
          {liked ? <AiFillHeart className="text-red-600" /> : <AiOutlineHeart className="text-gray-400" />}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
