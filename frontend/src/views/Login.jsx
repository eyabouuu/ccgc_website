import React from "react";
import { LoginForm } from "../components/LoginForm";
import wheal from "../Assets/wheal.jpg";
import { FaMoneyBillWheat } from "react-icons/fa6";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-grey-500 flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-10 lg:p-12 bg-black">
        <div className="mb-8 flex justify-center lg:justify-start">
          <a
            href="/"
            className="flex items-center gap-2 text-lg font-semibold text-white"
          >
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <FaMoneyBillWheat />
            </div>
           SMCSA "GC".
          </a>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="hidden lg:block w-1/2 bg-gray-800 relative">
        <img
          src={wheal}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover "
        />
        <div className="absolute inset-0 bg-gray-900/50"></div>
      </div>
    </div>
  );
}