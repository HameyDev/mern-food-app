import { Link } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';

const categories = [
  { name: 'Pizza', image: '/pizza.jpg' },
  { name: 'Burger', image: '/burger.jpg' },
  { name: 'Fries', image: '/fries.jpg' },
  { name: 'Drink', image: '/drink.jpg' },
  { name: 'Deal', image: '/deal.jpg' },
];

const CategoryCards = () => (
  <div className="py-14 px-6 bg-gradient-to-br from-white via-gray-50 to-red-50 rounded-xl shadow-inner">
    <div className="text-center mb-10">
      <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight flex items-center justify-center gap-3">
        <LayoutGrid className="w-7 h-7 text-red-500" />
        Browse by Category
      </h2>
      <p className="text-gray-500 text-sm mt-2">Choose what you're craving today</p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {categories.map((cat) => (
        <Link
          to={`/menu?category=${cat.name.toLowerCase()}`}
          key={cat.name}
          className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
        >
          <div className="overflow-hidden">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              loading="lazy"
            />
          </div>
          <div className="p-3 text-center">
            <p className="text-lg font-semibold text-gray-700 group-hover:text-red-500 transition-colors duration-300">
              {cat.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default CategoryCards;
