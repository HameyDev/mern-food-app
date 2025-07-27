import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import PizzaOptions from "../components/options/PizzaOptions";
import BurgerOptions from "../components/options/BurgerOptions";
import DrinkOptions from "../components/options/DrinkOptions";
import FriesOptions from "../components/options/FriesOptions";
import DealOptions from "../components/options/DealOptions";
import { toast } from "react-toastify";


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [addons, setAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const { addToCart } = useCart(); // Use the helper
  const [selectedPizza, setSelectedPizza] = useState("");
  const [selectedBurger, setSelectedBurger] = useState("");
  const [selectedFries, setSelectedFries] = useState("");
  const [selectedDrink, setSelectedDrink] = useState("");

  useEffect(() => {
    axios
      .get(`https://mern-food-app-030p.onrender.com/api/products/${id}`)
      .then((res) => {
        const fetchedProduct = res.data;
        setProduct(fetchedProduct);

        if (fetchedProduct.availableSizes?.length > 0) {
          setSelectedSize(fetchedProduct.availableSizes[0]);
        } else {
          setUnitPrice(fetchedProduct.basePrice);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    if (!product) return;

    let base = selectedSize?.price ?? product.basePrice;
    const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);

    setUnitPrice(base + addonsTotal);
  }, [product, selectedSize, addons]);

  const handleAddonChange = (e, addonObj) => {
    const checked = e.target.checked;
    setAddons((prev) =>
      checked
        ? [...prev, addonObj]
        : prev.filter((a) => a.label !== addonObj.label)
    );
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      image:product.image,
      title: product.title,
      size: selectedSize?.label || null,        // for pizza           // for drinks or pizza
      selectedBurger: selectedBurger || null,   // for deals
      selectedPizza: selectedPizza || null,     // for deals
      selectedDrink: selectedDrink || null,     // for deals
      addOns: addons || [],
      quantity,
      price: unitPrice,
   };

    addToCart(cartItem);
    toast.success("Added to cart!", { position: "top-center" });

  };

  if (!product) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-72 object-cover rounded-xl mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-green-600 text-lg font-semibold mb-4">
        Total: Rs. {unitPrice * quantity}
      </p>

      {product.category === "pizza" && (
        <PizzaOptions 
          sizes={product.availableSizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          addons={product.addons}
          selectedAddons={addons}
          onAddonChange={handleAddonChange}
        />
      )}

      {product.category === "burger" && (
        <BurgerOptions 
          addons={product.addons}
          selectedAddons={addons}
          onAddonChange={handleAddonChange} 
        />
      )}

      {product.category === "drink" && (
        <DrinkOptions 
          sizes={product.availableSizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      )}


      {product.category === "fries" && (
        <FriesOptions 
          addons={product.addons}
          selectedAddons={addons}
          onAddonChange={handleAddonChange} 
        />
       
      )}

      {product.category === "deal" && (
        <DealOptions
          dealOptions={product.dealOptions}
          selectedBurger={selectedBurger}
          setSelectedBurger={setSelectedBurger}
          selectedPizza={selectedPizza}
          setSelectedPizza={setSelectedPizza}
          selectedFries={selectedFries}
          setSelectedFries={setSelectedFries}
          selectedDrink={selectedDrink}
          setSelectedDrink={setSelectedDrink}
          addons={product.addons}
          selectedAddons={addons}
          onAddonChange={handleAddonChange}
        />
      )}

      {/* Quantity */}
      <div className="mb-4 flex items-center gap-3">
        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 border px-2 py-1 rounded"
        />
      </div>

      <button
        onClick={handleAddToCart}
        className="px-6 py-2 bg-green-600 text-white rounded-lg"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;



