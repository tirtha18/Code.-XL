import React from "react";
import Navbar from "./LandNavbar";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Heroimg from "../../images/Heroimg.png";
import html from "../../images/html.png";
import css from "../../images/css.png";
import express from "../../images/expressjs.png";
import reactjs from "../../images/react.png";
import mongodb from "../../images/mongo.png";
import tailwind from "../../images/tailwind.png";
import js from "../../images/js.png";
import { FaArrowRight } from "react-icons/fa";
const techstack = [
  {
    id: 1,
    src: html,
    title: "HTML",
    style: "shadow-orange-500",
  },
  {
    id: 2,
    src: css,
    title: "CSS",
    style: "shadow-blue-500",
  },
  {
    id: 3,
    src: js,
    title: "JavaScript",
    style: "shadow-yellow-500",
  },
  {
    id: 4,
    src: reactjs,
    title: "React",
    style: "shadow-blue-500",
  },
  {
    id: 5,
    src: tailwind,
    title: "Tailwind",
    style: "shadow-cyan-500",
  },
  {
    id: 6,
    src: express,
    title: "Express.js",
    style: "shadow-gray-500",
  },
  {
    id: 7,
    src: mongodb,
    title: "Mongodb",
    style: "shadow-green-500",
  },
];
export default function LandHome() {
  const navigate = useNavigate();
  return (
    <div className="absolute z-10 top-0 left-0 min-h-screen w-screen bg-black ">
      <Navbar />
      <div
        name="home"
        className="h-screen bg-gradient-to-b from-black to-gray-800 flex flex-col text-gray-300"
      >
        <div className="max-w-screen mx-auto flex items-center justify-center h-full px-4 ml-[9%]">
          <div className="flex flex-col w-[50%] justify-center h-full">
            <h2 className="text-5xl  font-bold">Welcome To Code. XL</h2>
            <p className="py-4 text-gray-500 max-w-lg mt-2">
              Transform your software development journey with Code.XL: upload
              study sheets, get curated problem lists with tutorials, track
              progress with visual graphs, and customize mock tests on key
              topics like OOP, DBMS, and OS. Access expert materials, engage
              with a vibrant community, and achieve your coding dreams.
            </p>
            <div
              onClick={() => {
                navigate("/sheets");
              }}
              className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-green-600 to hover:cursor-pointer bg-green-500 hover:scale-105 duration-300"
            >
              Get Started
              <span className="">
                <AiOutlineRight size={17} className="ml-1" />
              </span>
            </div>
          </div>
          <div>
            <img src={Heroimg} className="rounded-2xl mx-auto w-1/2 " alt="" />
          </div>
        </div>
      </div>
      <div
        name="features"
        className="min-h-screen bg-gradient-to-b from-gray-800 to-black flex flex-col text-gray-300 items-center justify-center py-24"
      >
        <div className=" grid grid-cols-3 gap-6 h-full mb-16">
          <div onClick={() => {navigate("/sheets");}} className="flex bg-black flex-col max-w-56 p-4 pt-12 pb-8 rounded-3xl items-center text-center m-2 border hover:scale-105 duration-200 hover:cursor-pointer">
            <h1 className="text-lg text-white font-semibold">
              Personalized Sheets
            </h1>
            <p className="text-sm mt-4 text-gray-400">
              Code.XL lets users upload study materials, transforming them into
              curated problem lists with video tutorials, offering personalized
              learning and seamless progress tracking tailored to individual
              study needs.
            </p>
            <div className="mt-auto">
              <FaArrowRight size={18}/>
            </div>
          </div>
          <div onClick={() => {navigate("/mockassessment");}} className="flex bg-black flex-col max-w-56 p-4 pt-12 pb-8 rounded-3xl items-center text-center m-2 border hover:scale-105 duration-200 hover:cursor-pointer">
            <h1 className="text-lg text-white font-semibold">
              Custom Mock Assesment
            </h1>
            <p className="text-sm mt-4 text-gray-400 mb-6">
              Custom Mock Assignments in Code.XL allow users to create
              personalized practice tests on key subjects like OOP, DBMS, and
              OS, ensuring preparedness for software development challenges.
            </p>
            <div className="mt-auto">
              <FaArrowRight size={18} />
            </div>
          </div>
          <div onClick={() => {navigate("/coresub");}} className="flex bg-black flex-col max-w-56 p-4 pt-12 pb-8 rounded-3xl items-center text-center m-2 border hover:scale-105 duration-200 hover:cursor-pointer ">
            <h1 className="text-lg text-white font-semibold">Core Subjects</h1>
            <p className="text-sm mt-4 text-gray-400 ">
              Code.XL's core subjects feature provides expertly crafted
              materials on essential computer science fundamentals, ensuring a
              solid foundation for aspiring software developers.
            </p>
            <div className="mt-auto">
              <FaArrowRight size={18}/>
            </div>
          </div>
          <div onClick={() => {navigate("/community");}} className="flex bg-black flex-col max-w-56 p-4 pt-12 pb-8 rounded-3xl items-center text-center m-2 border hover:scale-105 duration-200 hover:cursor-pointer">
            <h1 className="text-lg text-white font-semibold">Community</h1>
            <p className="text-sm mt-4 text-gray-400 ">
              Code.XL's community feature connects users with peers, fostering
              discussions and collaboration to solve doubts and enhance learning
              through shared knowledge and support.
            </p>
            <div className="mt-8">
              <FaArrowRight size={18}/>
            </div>
          </div>
        </div>
      </div>
      <div
        name="techstack"
        className="h-screen bg-gradient-to-b from-black to-gray-800 flex flex-col text-gray-300"
      >
        <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-ful text-white">
          <div>
            <p className="text-4xl font-bold border-b-4 border-gray-500 p-2 inline">
              Techstack
            </p>
            <p className="py-6">
              These are the technologies used in the project
            </p>
          </div>
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-8 text-center py-8 px-12 sm:px-0">
            {techstack.map(({ id, src, title, style }) => (
              <div
                key={id}
                className={`shadow-md hover:scale-110 duration-500 py-8 rounded-lg ${style}`}
              >
                <img src={src} alt="html" className="w-20 mx-auto" />
                <p className="mt-4">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
      name="contact"
      className="w-full h-screen bg-gradient-to-b from-gray-800 to-black text-white"
    >
      <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            Contact
          </p>
          <p className="py-6">Submit the form to get in touch with us</p>
        </div>
        <div className="flex justify-center items-center">
          <form
            action="https://getform.io/f/awngngwb"
            className="flex flex-col w-full md:w-1/2"
            method="POST"
          >
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="p-2 bg-transparent border-2 rounded-md text-white focus-outline-none"
            ></input>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="p-2 bg-transparent border-2 rounded-md text-white focus-outline-none my-4"
            ></input>
            <textarea
              placeholder="Enter your message!"
              name="message"
              rows="10"
              className="p-2 bg-transparent border-2 rounded-md text-white focus-outline-none"
            ></textarea>
            <button className="text-white bg-gradient-to-r  from-green-700 to-green-500 mx-auto flex items-center rounded-md hover:scale-110 duration-300 px-6 py-3 my-6">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}
