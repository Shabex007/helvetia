import React from "react";
import IconButton from "../components/UI/IconButton";
import user from "../assets/user.svg";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">My Account</h1>
      <p className="text-center mb-6">
        Manage your account settings and preferences.
      </p>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          onClick={() => navigate("/auth")}
        >
          Login/Register
        </button>
      </div>
    </div>
  );
};

export default MyAccount;
