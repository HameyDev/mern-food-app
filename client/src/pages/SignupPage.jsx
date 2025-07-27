import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';

const SignupPage = () => {

  const [formData, setFormData] = useState({ name: '', phone: '', password: '' });  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim()) {
    setError("Name is required");
    return;
    }

    if (!/^\d{11}$/.test(formData.phone)) {
      setError("Phone must be 11 digits");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      await axios.post("https://mern-food-app-030p.onrender.com/api/auth/send-otp", { phone: formData.phone });

      localStorage.setItem("pendingSignup", JSON.stringify(formData));
      toast.success("OTP sent!");
      setTimeout(() => {
        navigate("/verify-otp");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "OTP sending failed");
      toast.error("OTP Error");
    }  
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
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
        {success && <p className="text-green-500">{success}</p>}
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Send OTP
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;