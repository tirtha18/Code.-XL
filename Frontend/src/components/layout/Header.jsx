import { React, useContext, useEffect, useState } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import OverlayAvatarUploadCard from "../ui/reusables/AvatarUploadCard";
import { AuthContext } from "../context/AuthContextProvider";
import User_img from "../../images/User_img.png";
import { navContext } from "../context/NavContextProvider";
import { FaEdit, FaUser, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { AvatarContext } from "../context/AvatarContext";
import techQuotesData from "../../../dummy_dbs/techQuotes.json";
import { FaGithub } from "react-icons/fa";
import { BiCoffee } from "react-icons/bi";
import QRCodeIMG from "../../images/qr-code.jpg";
const quotes = techQuotesData.techQuotes;
const QRSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-50 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-zinc-900 border-l border-zinc-800 shadow-xl transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-green-400">
              Support My Work
            </h3>
            <button
              onClick={onClose}
              className=" text-zinc-400 hover:text-zinc-100 transition-colors"
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
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center gap-4 mt-12">
            <div className="bg-white p-3 rounded-xl">
              {/* Replace with your actual QR code image */}
              <img
                src={QRCodeIMG}
                alt="Buy Me a Coffee QR Code"
                className="w-48 h-48"
              />
            </div>

            <p className="text-center text-zinc-400">
              Scan this QR code or click the button below to support my work
            </p>

            <a
              href="https://buymeacoffee.com/tirthamunar nsd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-yellow-900 rounded-xl font-medium hover:bg-yellow-400 transition-colors"
            >
              <BiCoffee className="w-5 h-5" />
              Buy me a coffee
            </a>
          </div>
          <div className="space-y-4 w-full mt-6">
            <p className="text-center text-zinc-400">
              Your support helps me create more awesome websites like these!
            </p>

            <div className="flex flex-col gap-2">
              <button className="w-full px-4 py-2 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500/20 transition-colors">
                ☕ $3 - Coffee
              </button>
              <button className="w-full px-4 py-2 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500/20 transition-colors">
                🍱 $10 - Lunch
              </button>
              <button className="w-full px-4 py-2 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500/20 transition-colors">
                💝 $25 - Premium Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default function Header() {
  const { changeActiveNav } = useContext(navContext);
  const { user, logout } = useContext(AuthContext);
  const { avatar, updateAvatar } = useContext(AvatarContext);
  const navigate = useNavigate();
  const [isQRSidebarOpen, setIsQRSidebarOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [userid, setUserid] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getUser = async () => {
    try {
      if (!user) return;
      const user_id = user._id;
      setUserid(user_id);
      setLoading(true);
      const response = await axios.get(
        "https://code-xl.onrender.com/api/getUser",
        {
          params: { user_id: user_id },
        }
      );
      updateAvatar(response.data.avatar);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * quotes.length));
  }, []);

  return (
    <div className="w-full animate-fadeIn z-30">
      <div className="fixed-header h-16 flex items-center lg:justify-between justify-center px-4 md:px-8 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800/50 shadow-lg z-50">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-[33px] translate-y-1 md:text-3xl  md:hidden font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent font-heading">
            Code.XL
          </h1>
        </div>

        {/* Quote Display */}
        <div className="hidden lg:block flex-1 mx-8">
          <div className="py-2.5 px-4 bg-zinc-900/80 rounded-xl border border-zinc-800/50 text-sm transition-all duration-300 hover:border-green-500/30">
            <span className="text-zinc-300">{quotes[quoteIndex].quote}</span>
            <span className="text-green-500 ml-2">
              — {quotes[quoteIndex].author}
            </span>
          </div>
        </div>
        {/* Social Buttons */}
        <div className="hidden lg:flex items-center gap-2 mr-8">
          <a
            href="https://github.com/tirtha18/Code.-XL"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-zinc-400 rounded-xl border border-zinc-800/50 hover:border-zinc-600 transition-all duration-300 hover:scale-105"
          >
            <FaGithub className="w-5 h-5" />
            <span className="hidden xl:block">GitHub</span>
          </a>

          <button
            onClick={() => setIsQRSidebarOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-yellow-500 rounded-xl border border-yellow-500/30 hover:border-yellow-500 transition-all duration-300 hover:scale-105"
          >
            <BiCoffee className="w-5 h-5" />
            <span className="hidden xl:block">Buy me a coffee</span>
          </button>
        </div>

        {/* Auth Section */}
        <div className="lg:relative right-2  lg:right-0 absolute">
          {!user ? (
            <Link to="/login">
              <button className="group flex items-center gap-2 px-6 py-2.5 bg-zinc-900 text-green-400 rounded-xl border border-green-500/30 hover:border-green-500 transition-all duration-300 hover:scale-105">
                <span className="hidden xl:block">Login</span>
                <MdOutlineLogin className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative group mt-1.5"
              >
                <div className="w-12 h-12 rounded-xl border-2 border-green-500/30 group-hover:border-green-500 overflow-hidden transition-all duration-300 hover:scale-105">
                  <img
                    src={avatar || User_img}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 rounded-xl">
                    <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className=" absolute right-0 mt-2 w-48 py-2 bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl animate-fadeIn">
                  <button
                    onClick={() => {
                      setIsVisible(true);
                      setIsDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:text-green-400 hover:bg-zinc-800 transition-colors"
                  >
                    <FaEdit className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      changeActiveNav(1);
                      navigate("/dashboard");
                      setIsDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:text-green-400 hover:bg-zinc-800 transition-colors"
                  >
                    <FaUser className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:text-green-400 hover:bg-zinc-800 transition-colors"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <OverlayAvatarUploadCard
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        user_id={userid}
        getUser={getUser}
      />
      <div className="w-full animate-fadeIn">
        {/* QR Sidebar */}
        <QRSidebar
          isOpen={isQRSidebarOpen}
          onClose={() => setIsQRSidebarOpen(false)}
        />
      </div>
    </div>
  );
}
