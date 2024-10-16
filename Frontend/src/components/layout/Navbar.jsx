import { React, useContext, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { RiClipboardFill } from "react-icons/ri";
import { MdOutlineComputer } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { MdOutlineAssessment } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AuthContext } from "../context/AuthContextProvider";
import { navContext } from "../context/NavContextProvider";
import "react-toastify/dist/ReactToastify.css";
import { IoIosArrowBack } from "react-icons/io";
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
    icon: <MdOutlineAssessment size={22} />,
    name: "Mock Assessment",
    link: "/mockassessment",
  },
];

export default function Navbar() {
  const { activeNav, changeActiveNav } = useContext(navContext);
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleNavclick = (index) => {
    console.log(activeNav);
    changeActiveNav(index);
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen&&(<div className="md:hidden fixed top-4 left-4 z-30  ">
        <button onClick={() => setIsOpen(!isOpen)}>
          <FaBars className="text-white text-3xl" />
        </button>
      </div>)}
      <div
        className={ `bg-black h-full fixed md:static top-0 left-0 w-64 flex-col flex text-white md:h-screen items-center text-xl shadow-md shadow-zinc-500 z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 duration-300`}
      >
        <div className="flex flex-col  items-center  w-full">
          <div className=" w-full md:justify-center flex-row py-133  flex mt-8 rounded-lg text-white font-semibold items-center" >
            <h1 className="px-2 text-3xl md:text-[40px]">Code.XL</h1>
            {isOpen && (<button onClick={() => setIsOpen(false)} className="md:hidden ml-auto mr-2 p-1 rounded-lg bg-green-900 border border-green-500 text-green-400"><IoIosArrowBack size={22}/></button>)}
          </div>
          <div className="mt-[30%] w-[93%]">
            {navItems.map((item) => (
              <Link key={item.ind} to={item.link}>
                <div
                  onClick={() => handleNavclick(item.ind)}
                  className={`flex flex-row space-x-5 items-center ${
                    activeNav[item.ind] ? "bg-white text-black scale-105" : ""
                  } py-[8%] px-4 w-full rounded-lg hover:cursor-pointer hover:scale-105 mb-1`}
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
            }}
            className="  flex items-center mt-auto w-[98%] justify-center text-lg mb-4 py-2 px-[10%] rounded-lg text-zinc-900 bg-white flex-row space-x-2 hover:cursor-pointer duration-200 hover:bg-red-600 hover:text-zinc-300"
          >
            <div>Logout |</div> <MdOutlineLogout />
          </div>
        )}
      </div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
        />
      )}
    </>
  );
}
