import React from "react";
import { MdOutlineLogin } from "react-icons/md";
export default function Header() {
  return (
    <div className="fixed-header min-h-[72px] flex shadow-sm shadow-gray-700 items-center z-10">
      <div className="text-black px-4 py-2 bg-white rounded-lg ml-auto mr-5 hover:cursor-pointer hover:scale-105 space-x-1 flex flex-row items-center">
        <div>Login |</div><MdOutlineLogin size={20}/>
      </div>
    </div>
  );
}
