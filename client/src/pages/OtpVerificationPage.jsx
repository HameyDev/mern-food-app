import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      document.title = "Verify Phone | FlavorVerse";
    }, []);

  const handleVerify = async () => {
    const pendingSignup = JSON.parse(localStorage.getItem("pendingSignup"));
    if (!pendingSignup) return toast.error("Session expired");

    try {
      await axios.post("https://mern-food-app-030p.onrender.com/api/auth/verify-otp", {
        ...pendingSignup,
        otp
      });

      localStorage.removeItem("pendingSignup");
      toast.success("Signup successful!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleVerify}
        className="bg-green-600 text-white w-full mt-4 py-2 rounded"
      >
        Verify
      </button>
    </div>
  );
};

export default OtpVerificationPage;
