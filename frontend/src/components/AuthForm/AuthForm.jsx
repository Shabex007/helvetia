import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AuthForm.css";

import Input from "../UI/Input";

import googleIcon from "../../assets/google.svg";
import appleIcon from "../../assets/apple.svg";
import microsoftIcon from "../../assets/microsoft.svg";

const AuthForm = () => {
  const containerRef = useRef(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");

  const { login, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (containerRef.current) {
      if (isSignUp) {
        containerRef.current.classList.add("right-panel-active");
      } else {
        containerRef.current.classList.remove("right-panel-active");
      }
    }
  }, [isSignUp]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(loginEmail, loginPassword);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (registerPassword !== registerConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (registerPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      await register({
        email: registerEmail,
        password: registerPassword,
        password_confirm: registerConfirmPassword,
        first_name: registerFirstName,
        last_name: registerLastName,
        phone: registerPhone,
      });

      // After successful registration, switch to login view
      setIsSignUp(false);
      setError(
        "Registration successful! Please check your email to verify your account.",
      );

      // Clear registration form
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterConfirmPassword("");
      setRegisterFirstName("");
      setRegisterLastName("");
      setRegisterPhone("");
    } catch (err) {
      console.error("Registration error:", err);
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Registration failed. Please try again.";

      if (typeof errorMsg === "object") {
        // Handle validation errors
        const errors = Object.values(errorMsg).flat();
        setError(errors.join(", "));
      } else {
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Error/Success Message */}
      {error && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${
            error.includes("successful") ? "bg-green-500" : "bg-red-500"
          } text-white text-sm font-medium animate-pulse`}
        >
          {error}
        </div>
      )}

      <div className="container" ref={containerRef}>
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form
            className="bg-white flex flex-col items-center justify-center px-[50px] h-full text-center"
            onSubmit={handleRegister}
          >
            <h3 className="text-[1.8em] font-bold mb-2">Create Account</h3>

            <div className="social-container my-5 flex">
              {[googleIcon, appleIcon, microsoftIcon].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="border border-gray-300 rounded-full h-10 w-10 flex items-center justify-center mx-1 hover:bg-gray-200 hover:text-[#ff4b2b] hover:border-transparent transition"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src={icon} className="w-5" alt="icon" />
                </a>
              ))}
            </div>

            <span className="text-xs font-medium mb-2">
              or use your email for registration
            </span>

            <Input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={registerFirstName}
              onChange={(e) => setRegisterFirstName(e.target.value)}
              required
            />
            <Input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={registerLastName}
              onChange={(e) => setRegisterLastName(e.target.value)}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number (optional)"
              value={registerPhone}
              onChange={(e) => setRegisterPhone(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              name="password_confirm"
              placeholder="Confirm Password"
              value={registerConfirmPassword}
              onChange={(e) => setRegisterConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-full border border-[#ff4b2b] bg-[#ff4b2b] text-white text-xs font-bold py-3 px-[45px] tracking-wider uppercase mt-2 transition-transform duration-100 ease-in active:scale-95 hover:bg-[#ff3a1a] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form
            className="bg-white flex flex-col items-center justify-center px-[50px] h-full text-center"
            onSubmit={handleLogin}
          >
            <h3 className="text-[1.8em] font-bold mb-2">Login</h3>

            <div className="social-container my-5 flex">
              {[googleIcon, appleIcon, microsoftIcon].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="border border-gray-300 rounded-full h-10 w-10 flex items-center justify-center mx-1 hover:bg-gray-200 hover:text-[#ff4b2b] hover:border-transparent transition"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src={icon} className="w-5" alt="icon" />
                </a>
              ))}
            </div>

            <span className="text-xs font-medium mb-2">
              or use your account
            </span>

            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />

            <a
              href="#"
              className="text-sm text-gray-800 my-3 hover:text-[#a20009] transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                // Handle forgot password
                alert("Password reset link will be sent to your email.");
              }}
            >
              Forgot your password?
            </a>

            <button
              type="submit"
              disabled={loading}
              className="rounded-full border border-[#ff4b2b] bg-[#ff4b2b] text-white text-xs font-bold py-3 px-[45px] tracking-wider uppercase mt-2 transition-transform duration-100 ease-in active:scale-95 hover:bg-[#ff3a1a] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* Overlay Panel */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h3 className="text-[1.8em] font-bold mb-2">Welcome Back!</h3>
              <p className="text-sm font-medium leading-5 tracking-wide mb-6">
                Already have an account?
              </p>
              <button
                className="ghost text-white text-xs font-bold py-3 px-[45px] tracking-wider uppercase border border-white rounded-full hover:bg-white/10"
                onClick={() => setIsSignUp(false)}
              >
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h3 className="text-[1.8em] font-bold mb-2">Hello, Welcome!</h3>
              <p className="text-sm font-medium leading-5 tracking-wide mb-6">
                Don't have an account?
              </p>
              <button
                className="ghost text-white text-xs font-bold py-3 px-[45px] tracking-wider uppercase border border-white rounded-full hover:bg-white/10"
                onClick={() => setIsSignUp(true)}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright text-sm text-gray-400 fixed bottom-2 right-4 z-50">
        &copy; {new Date().getFullYear()} Helvetia Watches
      </div>
    </div>
  );
};

export default AuthForm;
