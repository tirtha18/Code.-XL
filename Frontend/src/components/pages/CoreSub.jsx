import React from "react";
import { FaArrowRight } from "react-icons/fa6";
export default function CoreSub() {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="flex items-center w-[90%] h-[90%] justify-center">
        <div className="text-zinc-300 h-full w-full flex flex-col">
          <div>
            <h1 className="text-3xl font-bold">Core Concepts Archive</h1>
            <p className="mt-4 text-lg text-zinc-400">
              Code.XL's Core Concepts Archive provides users with a wealth of
              expertly crafted materials on essential topics such as Operating
              Systems (OS), Object-Oriented Programming (OOP), Database
              Management Systems (DBMS), and other critical computer science
              subjects. This feature is designed to ensure that aspiring
              software developers build a strong and comprehensive foundation in
              these core areas. By offering in-depth, high-quality content, the
              Core Concepts Archive equips users with the knowledge and skills
              necessary to excel in their careers, preparing them to tackle
              real-world challenges with confidence and expertise.
            </p>
          </div>
          <div className="grid grid-cols-4 h-full w-full mt-24 gap-x-8 gap-y-4 text-lg">
            <div className=" h-28 bg-green-600 p-4 rounded-lg font-semibold hover:scale-105 duration-300 hover:cursor-pointer flex-col flex">
              <h1>Operating System</h1>{" "}
              <div className="mt-auto  ml-auto mr-1 p-1 hover:bg-white hover:rounded-full hover:text-green-700">
                <FaArrowRight />
              </div>
            </div>
            <div className=" h-28 bg-green-600 p-4 rounded-lg font-semibold hover:scale-105 duration-200 hover:cursor-pointer flex-col flex">
              <h1>DBMS</h1>{" "}
              <div className="mt-auto  ml-auto mr-1 p-1 hover:bg-white hover:rounded-full hover:text-green-700">
                <FaArrowRight />
              </div>
            </div>
            <div className=" h-28 bg-green-600 p-4 rounded-lg font-semibold hover:scale-105 duration-200 hover:cursor-pointer flex-col flex">
              <h1>Computer Networks</h1>{" "}
              <div className="mt-auto  ml-auto mr-1 p-1 hover:bg-white hover:rounded-full hover:text-green-700">
                <FaArrowRight />
              </div>
            </div>
            <div className=" h-28 bg-green-600 p-4 rounded-lg font-semibold hover:scale-105 duration-200 hover:cursor-pointer flex-col flex">
              <h1>OOPs</h1>{" "}
              <div className="mt-auto ml-auto mr-1 p-1 hover:bg-white hover:rounded-full hover:text-green-700 ">
                <FaArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
