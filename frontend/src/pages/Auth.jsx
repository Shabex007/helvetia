import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm/AuthForm";

const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-[#ff4b2b] transition-colors duration-300 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 group-hover:-translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="font-medium">Back to Home</span>
      </button>

      {/* Auth Form */}
      <AuthForm />
    </div>
  );
};

export default AuthPage;
