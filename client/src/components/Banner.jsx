import { Link } from 'react-router-dom';
import './Banner.css'; // Import the CSS file

const Banner = () => (
  <div className="relative h-[400px] text-white px-4 overflow-hidden">
    {/* Background Image with zoom animation */}
    <div className="absolute inset-0 bg-cover bg-center animate-zoom" style={{ backgroundImage: `url('/banner.jpg')` }}>
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>

    {/* Content */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
        Delicious Food, Delivered Fast
      </h1>
      <p className="mb-6 text-lg text-gray-100 drop-shadow">
        Order now and get exclusive deal!
      </p>
      <Link
        to="/menu"
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl transition duration-300 shadow-lg"
      >
        View Menu
      </Link>
    </div>
  </div>
);

export default Banner;
