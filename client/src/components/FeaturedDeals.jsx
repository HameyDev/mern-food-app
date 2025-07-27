import { Link } from "react-router-dom";

const FeaturedDeals = () => (
  <div className="bg-gradient-to-br from-white to-gray-100 py-16 px-6">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">🔥 Featured Deals</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
        >
          <div className="overflow-hidden rounded-t-3xl">
            <img
              src={`/deal${i}.jpg`}
              alt={`Deal ${i}`}
              className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Deal {i}</h3>
            <p className="text-gray-600 text-sm mb-5">
              🍕 Pizza + 🥤 Drink + 🍟 Fries Combo – Perfect for sharing!
            </p>
            <Link
              to="/menu?category=deal"
              className="inline-block bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-full transition-all duration-300 shadow hover:shadow-md text-sm"
            >
              Order Now 🍽️
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FeaturedDeals;
