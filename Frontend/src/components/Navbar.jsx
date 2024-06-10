import React from "react";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { RiClipboardFill } from "react-icons/ri";
import { MdOutlineComputer } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
const navItems = [
  { icon: <FaUser />, name: "Profile" },
  { icon: <MdDashboard />, name: "Dashboard" },
  { icon: <RiClipboardFill />, name: "Sheets" },
  { icon: <MdOutlineComputer />, name: "Core Subjects" },
  { icon: <FaUsers />, name: "Community" },
];

export default function Navbar() {
  return (
    <div className="flex flex-col bg-black text-white h-screen items-center text-xl shadow-md shadow-gray-500">
      <div className="flex flex-col items-center">
        <div className="text-3xl mt-4 py-3 px-10 rounded-lg text-gray-800 bg-white font-semibold ">
          Code. XL
        </div>
        <div className="mt-20">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="flex flex-row space-x-7 items-center hover:bg-white hover:text-black  lg:py-4 py-4 px-4 w-full rounded-lg hover:cursor-pointer hover:scale-105"
            >
              {item.icon}
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="  flex items-center text mt-auto mb-4 py-2 px-10 rounded-lg text-gray-800 bg-white flex-row space-x-2 hover:cursor-pointer ">
        <div>Logout |</div> <MdOutlineLogout />
      </div>
    </div>
  );
}
