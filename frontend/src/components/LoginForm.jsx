import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";
export function LoginForm({ className = "", ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signin", {
        email,
        password,
      });

      // Handle successful login
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      navigate("/dashboard"); // Redirect to the dashboard or any other page
    } catch (err) {
      // Handle errors
      console.error("Login failed:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "An error occurred");
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`space-y-8 ${className}`}
        {...props}
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">
            Login to your account
          </h1>
          <p className="text-sm text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder-gray-500"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200"
              >
                Password
              </label>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder-gray-500"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
          >
            Sign In
          </button>
        </div>
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}