import { React, useContext } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { AuthContext } from "./AuthProvider";
import User_img from "../images/User_img.png";
export default function Header() {
  const { user, token, login, logout } = useContext(AuthContext);
  return (
    <div className="fixed-header min-h-[64px] flex shadow-sm shadow-gray-700 flex-row items-center z-10 w-full">
      <div className="ml-auto">
        {!user ? (
          <Link to={"/login"}>
            <button className="text-black px-4 py-2 bg-white rounded-lg ml-auto mr-5 hover:cursor-pointer hover:scale-105 space-x-1 flex flex-row items-center duration-200 hover:bg-green-500 hover:text-white">
              <div className="flex flex-row items-center">
                <div>Login |</div>
                <MdOutlineLogin size={20} />
              </div>
            </button>
          </Link>
        ) : (
          <Link to={"/dashboard"}>
            <div className=" text-white mr-6 hover:cursor-pointer border border-zinc-600 rounded-full">
              <img width="50" height="50" src={User_img} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
