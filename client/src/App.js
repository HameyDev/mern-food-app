import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";
import ProductDetail from "./pages/ProductDetailPage";
import ThankYouPage from "./pages/ThankYouPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoritesPage from "./pages/FavoritesPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import OtpVerificationPage from "./pages/OtpVerificationPage";


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
        <Route path="/myorders" element={<MyOrdersPage />} />
        <Route path="/orders/:id" element={<OrderPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/verify-otp" element=<OtpVerificationPage /> />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
