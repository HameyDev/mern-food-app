import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://mern-food-app-030p.onrender.com/api/auth/login', formData);
      login(res.data.token, res.data.user);
      toast.success("Login Success!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
      toast.error("Login Failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
