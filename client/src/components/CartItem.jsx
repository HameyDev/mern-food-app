"use client";
import { useCart } from "../context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantity = (type) => {
    if (type === "increment") {
      updateQuantity(item.id, item.size, item.flavor, item.addOns, item.quantity + 1);
    } else if (type === "decrement" && item.quantity > 1) {
      updateQuantity(item.id, item.size, item.flavor, item.addOns, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id, item.size, item.flavor, item.addOns);
  };
console.log("Image URL:", item.image);
  return (
    <div className="flex gap-4 items-start justify-between border p-4 rounded-2xl shadow-sm bg-white">
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-cover rounded-xl"
      />

      <div className="flex flex-col flex-1">
        <h2 className="font-semibold text-lg">{item.title}</h2>

        {item.size && (
          <p className="text-sm text-gray-600">Size: <span className="font-medium">{item.size}</span></p>
        )}

        {item.flavor && (
          <p className="text-sm text-gray-600">Flavor: <span className="font-medium">{item.flavor}</span></p>
        )}

        {item.addOns?.length > 0 && (
          <p className="text-sm text-gray-600">
            Add-Ons:{" "}
            <span className="font-medium">{item.addOns.map(a => a.label).join(", ")}</span>
          </p>
        )}

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => handleQuantity("decrement")}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
          >
            <Minus size={16} />
          </button>

          <span className="font-medium text-lg">{item.quantity}</span>

          <button
            onClick={() => handleQuantity("increment")}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
          >
            <Plus size={16} />
          </button>

          <button
            onClick={handleRemove}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="text-right font-semibold text-lg">
        Rs {item.price * item.quantity}
      </div>
    </div>
  );
}
