import { React, useContext } from "react";
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

const navItems = [
  {
    ind: 1,
    icon: <IoIosHome />,
    name: "Home",
    link: "/",
  },
  {
    ind: 2,
    icon: <MdDashboard />,
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    ind: 3,
    icon: <RiClipboardFill />,
    name: "Sheets",
    link: "/sheets",
  },
  {
    ind: 4,
    icon: <MdOutlineComputer />,
    name: "Core Subjects",
    link: "/coresub",
  },
  {
    ind: 5,
    icon: <ImBooks />,
    name: "Mock Assesment",
    link: "/Mockiassesment",
  },
  { ind: 6, icon: <FaUsers />, name: "Community", link: "/community" },
];

export default function Navbar() {
  const { user, token, login, logout } = useContext(AuthContext);
  return (
    <>
      <div className="flex flex-col bg-black text-white h-screen items-center text-xl shadow-md shadow-gray-500">
        <div className="flex flex-col items-center">
          <div className="text-3xl mt-4 py-3 px-10 rounded-lg text-gray-800 bg-white font-semibold ">
            Code. XL
          </div>
          <div className="mt-20">
            {navItems.map((item) => (
              <Link key={item.ind} to={item.link}>
                <div className="flex flex-row space-x-5 items-center hover:bg-white hover:text-black lg:py-4 py-4 px-4 w-full rounded-lg hover:cursor-pointer hover:scale-105">
                  {item.icon}
                  <div>{item.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {user&&(
        <div
          onClick={() => {
            logout();
          }}
          className="flex items-center text mt-auto mb-4 py-2 px-10 rounded-lg text-gray-800 bg-white flex-row space-x-2 hover:cursor-pointer "
        >
          <div>Logout |</div> <MdOutlineLogout />
        </div>)}
      </div>
    </>
  );
}
