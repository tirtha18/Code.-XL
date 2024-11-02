import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider";
import Hero from "../../images/Heroimg.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { navContext } from "../context/NavContextProvider";
const LoginRegister = () => {
  const [activeCard, setActiveCard] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [college, setCollege] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  const { changeActiveNav } = useContext(navContext);
  const toggleCard = (cardType) => {
    setActiveCard(cardType);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill all the fields!");
      return;
    }
    login({
      username: username,
      password: password,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (
      !fullName ||
      !username ||
      !password ||
      !confirmPassword ||
      !location ||
      !college
    ) {
      toast.error("Please fill all fields!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(
        "https://code-xl.onrender.com/api/auth/register",
        {
          name: fullName,
          username: username,
          password: password,
          location: location,
          college: college,
        }
      );
      console.log("Registration successful:", response.data);
      toast.success("Registration successful");
      setTimeout(() => {
        toggleCard("login");
      }, 1000);
    } catch (error) {
      toast.error("Registration failed!");
      console.error("Registration failed:", error);
    }
  };

  const handleClose = () => {
    if (user) {
      changeActiveNav(1);
      navigate("/sheets");
    } else {
      changeActiveNav(0);
      navigate("/");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center min-h-screen w-screen bg-zinc-950 z-40">
      <div className="relative w-full max-w-lg mx-4 ">
        <button
          onClick={handleClose}
          className=" z-10 top-4 right-3 absolute text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Main Card */}
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r mt-4 from-green-400 to-green-600 bg-clip-text text-transparent mb-3">
              {activeCard === "login" ? "Welcome Back" : "Join Code.XL"}
            </h1>
            <p className="text-zinc-400">
              {activeCard === "login"
                ? "Enter your credentials to access your account"
                : "Create your account and start your coding journey"}
            </p>
          </div>

          {/* Forms */}

          {/* Login Form */}
          {activeCard === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-green-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                Sign In
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-green-500 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-green-500 transition-colors"
                />
                <input
                  type="text"
                  placeholder="College"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-green-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-green-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                Create Account
              </button>
            </form>
          )}

          {/* Toggle Form Type */}
          <div className="mt-6 text-center text-zinc-400">
            {activeCard === "login" ? (
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => toggleCard("register")}
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  Create Account
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => toggleCard("login")}
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
