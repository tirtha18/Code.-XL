import { React, useContext, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { RiClipboardFill } from "react-icons/ri";
import { MdOutlineComputer } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { ImBooks } from "react-icons/im";
import { AuthContext } from "./AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { NavContextProvider, navContext } from "./NavContextProvider";
import { useNavigate } from "react-router-dom";
const navItems = [
  {
    ind: 0,
    icon: <IoIosHome />,
    name: "Home",
    link: "/",
  },
  {
    ind: 1,
    icon: <MdDashboard />,
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    ind: 2,
    icon: <RiClipboardFill />,
    name: "Sheets",
    link: "/sheets",
  },
  {
    ind: 3,
    icon: <MdOutlineComputer />,
    name: "Core Subjects",
    link: "/coresub",
  },
  {
    ind: 4,
    icon: <ImBooks />,
    name: "Mock Assesment",
    link: "/mockassessment",
  },
  {
    ind: 5,
    icon: <FaUsers />,
    name: "Community",
    link: "/community",
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { activeNav, changeActiveNav } = useContext(navContext);
  const { user, logout } = useContext(AuthContext);
  const handleNavclick = (index) => {
    console.log(activeNav);
    changeActiveNav(index);
  };
  return (
    <>
      <div className="md:flex flex-col bg-black text-white md:h-screen items-center text-xl shadow-md shadow-gray-500 hidden">
        <div className="flex flex-col items-center">
          <div className="text-3xl mt-4 py-3 px-10 rounded-lg text-gray-800 bg-white font-semibold ">
            Code. XL
          </div>
          <div className="mt-20">
            {navItems.map((item) => (
              <Link key={item.ind} to={item.link}>
                <div
                  onClick={() => handleNavclick(item.ind)}
                  className={`flex flex-row space-x-5 items-center ${
                    activeNav[item.ind] ? "bg-white text-black scale-105" : ""
                  }   lg:py-4 py-4 px-4 w-full rounded-lg hover:cursor-pointer hover:scale-105 mb-1`}
                >
                  {item.icon}
                  <div>{item.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {user && (
          <div
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center text mt-auto text-lg mb-4 py-2 px-10 rounded-lg text-zinc-900 bg-white flex-row space-x-2 hover:cursor-pointer hover:scale-105 duration-200 hover:bg-red-600 hover:text-zinc-300"
          >
            <div>Logout |</div> <MdOutlineLogout />
          </div>
        )}
      </div>
    </>
  );
}
