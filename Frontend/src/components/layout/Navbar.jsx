import { React, useContext, useState } from "react";
import {
  MdDashboard,
  MdOutlineComputer,
  MdOutlineLogout,
  MdOutlineAssessment,
} from "react-icons/md";
import {
  FaCode,
  FaLaptopCode,
  FaUserGraduate,
} from "react-icons/fa";
import { RiClipboardFill } from "react-icons/ri";
import { IoIosHome, IoIosArrowBack } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { navContext } from "../context/NavContextProvider";
import "react-toastify/dist/ReactToastify.css";

const navItems = [
  { ind: 0, icon: <IoIosHome size={22} />, name: "Home", link: "/" },
  {
    ind: 1,
    icon: <MdDashboard size={22} />,
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    ind: 2,
    icon: <FaCode size={22} />,
    name: "Sheets",
    link: "/sheets",
  },
  {
    ind: 3,
    icon: <FaUserGraduate size={22} />,
    name: "Core Subjects",
    link: "/coresub",
  },
  {
    ind: 4,
    icon: <FaLaptopCode size={22} />,
    name: "Mock Assessment",
    link: "/mockassessment",
  },
];

export default function Navbar() {
  const { activeNav, changeActiveNav } = useContext(navContext);
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleNavClick = (index) => {
    changeActiveNav(index);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`md:hidden fixed top-4 left-3 z-50 p-2 rounded-lg bg-zinc-900/80 backdrop-blur-sm 
          transition-all duration-300 hover:bg-zinc-800 
          ${isOpen ? "opacity-0" : "opacity-100"}`}
      >
        <FaBars className="text-green-400 text-2xl" />
      </button>

      {/* Main Navigation */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-72 bg-zinc-950 flex flex-col
          border-r border-zinc-800/50 shadow-xl shadow-black/20
          transition-all duration-500 ease-in-out transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 z-40`}
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center w-full pt-6 pb-4 px-4">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Code.XL
            </h1>
            {isOpen && (
              <button
                onClick={() => setIsOpen(false)}
                className="md:hidden p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors"
              >
                <IoIosArrowBack className="text-green-400" size={22} />
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent my-6" />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link key={item.ind} to={item.link}>
                <div
                  onClick={() => handleNavClick(item.ind)}
                  onMouseEnter={() => setHoveredIndex(item.ind)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group relative flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-300 
                    ${
                      activeNav[item.ind]
                        ? "bg-green-500/10 text-green-400"
                        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-green-400"
                    }`}
                >
                  <span
                    className={`transition-transform duration-300 
                    ${hoveredIndex === item.ind ? "scale-110" : "scale-100"}
                    ${activeNav[item.ind] ? "text-green-400" : ""}`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                  {activeNav[item.ind] && (
                    <span className="absolute inset-y-0 left-0 w-1 bg-green-400 rounded-r-full" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        {user && (
          <div className="p-4">
            <button
              onClick={logout}
              className="flex items-center justify-center w-full gap-2 px-4 py-3 
                text-zinc-400 rounded-lg border border-zinc-800/50
                transition-all duration-300
                hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50
                group"
            >
              <span>Logout</span>
              <MdOutlineLogout
                className="transition-all duration-300 group-hover:rotate-180"
                size={20}
              />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-30
            animate-fadeIn"
        />
      )}
    </>
  );
}
