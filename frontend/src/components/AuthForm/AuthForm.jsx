import React, { useState, useRef, useEffect } from "react";
import "./AuthForm.css";

import Input from "../UI/Input";

import googleIcon from "../../assets/google.svg";
import appleIcon from "../../assets/apple.svg";
import microsoftIcon from "../../assets/microsoft.svg";

const AuthForm = () => {
  const containerRef = useRef(null);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      if (isSignUp) {
        containerRef.current.classList.add("right-panel-active");
      } else {
        containerRef.current.classList.remove("right-panel-active");
      }
    }
  }, [isSignUp]);

  return (
    <div className="auth-wrapper">
      <div className="container" ref={containerRef}>
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form className="bg-white flex flex-col items-center justify-center px-[50px] h-full text-center">
            <h3 className="text-[1.8em] font-bold mb-2">Create Account</h3>

            <div className="social-container my-5 flex">
              {[googleIcon, appleIcon, microsoftIcon].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="border border-gray-300 rounded-full h-10 w-10 flex items-center justify-center mx-1 hover:bg-gray-200 hover:text-[#ff4b2b] hover:border-transparent transition"
                >
                  <img src={icon} className="w-5" alt="icon" />
                </a>
              ))}
            </div>

            <span className="text-xs font-medium mb-2">
              or use your email for registration
            </span>

            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              required
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              required
            />

            <button
              type="submit"
              className="rounded-full border border-[#ff4b2b] bg-[#ff4b2b] text-white text-xs font-bold py-3 px-[45px] tracking-wider uppercase mt-2 transition-transform duration-100 ease-in active:scale-95 hover:bg-[#ff3a1a] focus:outline-none"
            >
              Register
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form className="bg-white flex flex-col items-center justify-center px-[50px] h-full text-center">
            <h3 className="text-[1.8em] font-bold mb-2">Login</h3>

            <div className="social-container my-5 flex">
              {[googleIcon, appleIcon, microsoftIcon].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="border border-gray-300 rounded-full h-10 w-10 flex items-center justify-center mx-1 hover:bg-gray-200 hover:text-[#ff4b2b] hover:border-transparent transition"
                >
                  <img src={icon} className="w-5" alt="icon" />
                </a>
              ))}
            </div>

            <span className="text-xs font-medium mb-2">
              or use your account
            </span>

            <Input type="email" name="email" placeholder="Email" required />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
            />

            <a
              href="#"
              className="text-sm text-gray-800 my-3 hover:text-[#a20009] transition-colors duration-300"
            >
              Forgot your password?
            </a>

            <button
              type="submit"
              className="rounded-full border border-[#ff4b2b] bg-[#ff4b2b] text-white text-xs font-bold py-3 px-[45px] tracking-wider uppercase mt-2 transition-transform duration-100 ease-in active:scale-95 hover:bg-[#ff3a1a] focus:outline-none"
            >
              Login
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
                Don’t have an account?
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
        &copy; {new Date().getFullYear()} by Dipesh
      </div>
    </div>
  );
};

export default AuthForm;
