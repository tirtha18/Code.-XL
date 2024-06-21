import {React,useContext} from "react";
import { MdOutlineLogin } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { AuthContext } from "./AuthProvider";
import { FaCircleUser } from "react-icons/fa6";
export default function Header() {
  const { user, token, login, logout } = useContext(AuthContext);
  return (
    <div className="fixed-header min-h-[72px] flex shadow-sm shadow-gray-700 flex-row items-center z-10 w-full">
      <div className="ml-auto">
        {(!user) ?
        (<Link to={"/login"}>
          <button className="text-black px-4 py-2 bg-white rounded-lg ml-auto mr-5 hover:cursor-pointer hover:scale-105 space-x-1 flex flex-row items-center">
            <div className="flex flex-row items-center">
              <div>Login |</div>
              <MdOutlineLogin size={20} />
            </div>
          </button>
        </Link>
        ):(<Link to={"/dashboard"}><div className=" text-white mr-6 hover:cursor-pointer"><FaCircleUser size={50} /></div></Link>)}
      </div>
    </div>
  );
}
