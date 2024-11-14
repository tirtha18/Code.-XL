import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { navContext } from "../context/NavContextProvider";
import { motion } from "framer-motion";
import {
  FaCode,
  FaLaptopCode,
  FaUserGraduate,
  FaUsers,
  FaGithub,
  FaLinkedin,
  FaClipboardList
} from "react-icons/fa";
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiExpress,
} from "react-icons/si";

const FeatureCard = ({ icon, title, description, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-zinc-800/50 p-8 rounded-xl border border-zinc-700 hover:border-green-500 transition-all duration-300 cursor-pointer backdrop-blur-sm"
    onClick={onClick}
  >
    {icon}
    <h3 className="text-xl font-bold mt-4 mb-2 text-white">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const TechStack = ({ icon: Icon, name }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    className="flex flex-col items-center justify-center p-4 bg-zinc-800/30 rounded-lg backdrop-blur-sm"
  >
    <Icon className="text-3xl text-green-500 mb-2" />
    <span className="text-sm text-zinc-400">{name}</span>
  </motion.div>
);

// Landing Page
export default function LandingPage() {
  const { changeActiveNav } = useContext(navContext);
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaCode className="text-4xl text-green-500" />,
      title: "Personalized Sheets",
      description:
        "Upload excel sheets and get curated problem lists with comprehensive video tutorials tailored to your learning pace.",
      nav: { path: "/sheets", id: 2 },
    },
    {
      icon: <FaLaptopCode className="text-4xl text-green-500" />,
      title: "Mock Assessments",
      description:
        "Create and take custom practice tests focusing on key software development concepts and track your progress.",
      nav: { path: "/mockassessment", id: 4 },
    },
    {
      icon: <FaUserGraduate className="text-4xl text-green-500" />,
      title: "Core Subjects",
      description:
        "Master fundamental computer science topics with our expertly curated content and structured learning paths.",
      nav: { path: "/coresub", id: 3 },
    },
    {
      icon: <FaClipboardList className="text-4xl text-green-500" />,
      title: "Resume Questions",
      description:
        "Get insights into potential interview questions based on your resume to prepare effectively for your next job interview.",
      nav: { path: "/resume-questions", id: 6 },
    },
  ];

  const techStack = [
    { icon: SiJavascript, name: "JavaScript" },
    { icon: SiReact, name: "React" },
    { icon: SiNodedotjs, name: "Node.js" },
    { icon: SiMongodb, name: "MongoDB" },
    { icon: SiTailwindcss, name: "Tailwind" },
    { icon: SiExpress, name: "Express" },
  ];
  useEffect(() => {
    alert(
      "If you are a recruiter please wait 50 second after you click the register button as it is deployed for free on render. Thank You!"
    );
  }, []);
  return (
    <div className=" max-h-full overflow-auto text-zinc-300 
     bg-black ">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            Level Up Your Coding Journey
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Transform your software development skills with personalized
            learning paths, expert-curated content, and a supportive community.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300"
            onClick={() => {
              navigate("/sheets");
              changeActiveNav(2);
            }}
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              onClick={() => {
                navigate(feature.nav.path);
                changeActiveNav(feature.nav.id);
              }}
            />
          ))}
        </div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            Built with Modern Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <TechStack key={index} {...tech} />
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="text-center text-zinc-400 py-8 border-t border-zinc-800">
          <div className="flex justify-center gap-4  mb-4">
            <a
              href="https://github.com/tirtha18/"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="text-2xl text-zinc-400 hover:text-green-500 transition-colors duration-300" />
            </a>
            <a
              href="https://www.linkedin.com/in/tirtha-biswas-594581230/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="text-2xl text-zinc-400 hover:text-green-500 transition-colors duration-300" />
            </a>
          </div>
          <p>&copy; 2024 Code.XL. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
