import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider";
import Hero from "../../images/Heroimg.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
    if (!fullName || !username || !password || !confirmPassword || !location || !college) {
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

    if(user)
    navigate("/sheets");
    else
    navigate("/home");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center min-h-screen w-screen bg-zinc-200 z-10">
      <div className="top-0 right-0 fixed h-full w-1/2 overflow-hidden border-l-4 border-black">
        <img
          src={Hero}
          alt="#"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="relative bg-zinc-100 p-8 rounded-lg shadow-lg w-full max-w-md text-black flex-col flex items-center">
        <button
          onClick={() => {
             handleClose();
          }}
          className="absolute top-4 right-4 text-black"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6">
          {activeCard === "login" ? "Login" : "Create Account"}
        </h2>
        {activeCard === "login" ? (
          <form className="w-4/5" onSubmit={handleLoginSubmit}>
            <div className="form-group mb-4">
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="mt-1 p-2 w-full border rounded-lg bg-white text-black placeholder-gray-400 shadow-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mb-8 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                className="mt-1 p-2 w-full border rounded-lg bg-white text-black placeholder-gray-400 shadow-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center h-full translate-y-[2.7px]"
              >
                {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-lg"
            >
              Login
            </button>
          </form>
        ) : (
          <form className="w-4/5" onSubmit={handleRegisterSubmit}>
            <div className="form-group mb-4">
              <input
                type="text"
                id="full-name"
                placeholder="Full Name"
                className="mt-1 p-2 w-full border rounded-lg bg-white text-black placeholder-gray-400 shadow-md"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="mt-1 p-2 w-full border rounded-lg bg-white text-black placeholder-gray-400 shadow-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                id="location"
                placeholder="Location"
                className="mt-1 p-2 w-full border rounded-lg bg-white text-black placeholder-gray-400 shadow-md"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                id="college"
                placeholder="College"
                className="mt-1 p-2 w-full border rounded-lg bg-white text-black placeholder-gray-400 shadow-md"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />
            </div>
            <div className="form-group mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                className="mt-1 p-2 w-full border rounded-lg bg-white text-black placeholder-gray-400 shadow-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center h-full translate-y-[2.7px]"
              >
                {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
              </button>
            </div>
            <div className="form-group mb-8 relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                placeholder="Confirm Password"
                className="mt-1 p-2 w-full border rounded-lg bg-white text-black placeholder-gray-400 shadow-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center h-full translate-y-[2.7px]"
              >
                {showConfirmPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-lg"
            >
              Create Account
            </button>
          </form>
        )}
        <p className="mt-4 text-center font-extralight text-gray-400">
          {activeCard === "login" ? (
            <span>
              Don't have an account?{" "}
              <a
                href="#"
                onClick={() => toggleCard("register")}
                className="text-gray-900 hover:underline font-semibold"
              >
                Create Account
              </a>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <a
                href="#"
                onClick={() => toggleCard("login")}
                className="text-gray-900 hover:underline font-semibold"
              >
                Login
              </a>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
