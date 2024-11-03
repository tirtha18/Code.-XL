import React, { useEffect, useState } from "react";
import User_img from "../../images/User_img.png";
import { LuSchool } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";
import ProgressBar from "../ui/reusables/ProgressBar";
import DoughnutChart from "../ui/reusables/DoughnutChart";
import randomColor from "randomcolor";
import LineChart from "../ui/reusables/LineChart";
import Leetcode from "../../images/LC_logo.png";
import Gfg from "../../images/GFG_logo.png";
import Cflogo from "../../images/cflogo.png";
import NavTabs from "../ui/reusables/Tabs";
import DashboardSkeleton from "../ui/skeleton/DashboardSkeleton";
import { AvatarContext } from "../context/AvatarContext";
import ProfileImage from "../ui/reusables/ProfileImage";
import { Trophy } from 'lucide-react';

function ShowMockResults({ setShowMockdata, selectedmockdata }) {
  const correctq = selectedmockdata.correct_q;
  const totalq = selectedmockdata.total_q;
  const attemptedq = selectedmockdata.attempted_q;
  const [toggleresult, setToggleresult] = useState(false);

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen z-50 bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg text-zinc-300 flex-col flex items-center lg:w-[40%] lg:min-h-[40%] ">
        <div className="text-lg font-semibold border-b border-zinc-600 text-zinc-300 w-full p-4">
          {selectedmockdata.name}
          <button
            onClick={() => setShowMockdata(false)}
            className="absolute top-4 right-4"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6 text-zinc-400 hover:text-red-500 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="w-[90%] mt-4">
          <NavTabs setToggleresult={setToggleresult} />
        </div>
        {!toggleresult ? (
          <div className="mt-6 flex-col w-[90%] h-[90%]">
            <div className="text-zinc-300 bg-zinc-800 rounded-lg shadow-sm shadow-zinc-600 p-4">
              <div className="flex flex-row w-full justify-between">
                <h1>Attempted:</h1>
                <p className="ml-2 bg-zinc-700 px-2 text-zinc-400 py-0.5 text-sm rounded-lg">
                  {attemptedq + "/" + totalq}
                </p>
              </div>
              <div className="mt-3">
                <ProgressBar value={Math.floor((attemptedq / totalq) * 100)} />
              </div>
            </div>
            <div className="text-zinc-300 bg-zinc-800 rounded-lg p-4 mt-4 mb-6">
              <div className="flex flex-row w-full justify-between">
                <h1>Total Score:</h1>
                <p className="ml-2 bg-zinc-700 px-2 text-zinc-400 py-0.5 text-sm rounded-lg">
                  {correctq + "/" + totalq}
                </p>
              </div>
              <div className="mt-3">
                <ProgressBar value={Math.floor((correctq / totalq) * 100)} />
              </div>
              <div className="flex flex-row w-full justify-between mt-3">
                <h1>Accuracy</h1>
              </div>
              <div className="mt-3">
                <ProgressBar
                  value={
                    attemptedq !== 0
                      ? Math.floor((correctq / attemptedq) * 100)
                      : 0
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex-col w-[90%] max-h-96 overflow-auto space-y-2">
            {selectedmockdata.questions.map((question, index) => (
              <div key={question._id} className="flex flex-col py-2">
                <h1 className="text-zinc-300">
                  {index + 1 + ") "}
                  {question.problem}
                </h1>
                <h2 className="text-green-400 text-sm">
                  <span className="text-zinc-400">Correct Answer: </span>
                  {question.answer}
                </h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ShowSheetDetails({ selectedsheet, setSheetshow }) {
  if (!selectedsheet.sheet) return null;

  const dividedprob = selectedsheet.sheet.reduce((acc, prob) => {
    if (!acc[prob.tag]) acc[prob.tag] = [];
    acc[prob.tag].push(prob);
    return acc;
  }, {});

  const topicsCompstatus = [];
  const topicLabels = [];
  const topicCompletion = [];
  const topicColors = [];
  const borderColors = [];

  for (const [topic, problems] of Object.entries(dividedprob)) {
    const done = problems.filter((problem) => problem.status === "DONE");
    let completion = Math.floor((done.length / problems.length) * 100);
    topicsCompstatus.push({
      topic: topic,
      doneprob: done.length,
      totalprob: problems.length,
      completion: completion,
    });
    topicLabels.push(topic.toUpperCase());
    topicCompletion.push(done.length);
    topicColors.push(randomColor({ luminosity: "bright" }));
    borderColors.push("rgb(39 39 42)");
  }

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center min-h-screen w-screen z-50 bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg text-zinc-300 flex-col flex items-center">
        <div className="text-lg font-semibold p-4 border-b border-zinc-600 text-zinc-300 w-full  ">
          Progress:
          <button
            onClick={() => setSheetshow(false)}
            className="absolute top-4 right-4"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6 text-zinc-400 hover:text-red-500 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center flex-row space-x-16 mt-8 mb-8">
          <div className="flex items-center">
            <div className="w-[550px] capitalize mt-4">
              <DoughnutChart
                topicColors={topicColors}
                topicLabels={topicLabels}
                topicCompletion={topicCompletion}
                borderColors={borderColors}
              />
            </div>
          </div>
          <div></div>
          <div></div>
          <div className="flex flex-col overflow-auto h-[600px]">
            {topicsCompstatus.map((it, index) => (
              <ul
                key={index}
                className="flex flex-col min-w-72 text-sm pr-2 py-2 space-y-2 text-zinc-400 font-semibold"
              >
                <div className="">
                  <h4>{it.topic.toUpperCase()}</h4>
                </div>
                <div className="">
                  <ProgressBar value={it.completion} />
                </div>
              </ul>
            ))}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
function TimeLeft({ timeLeft }) {
  timeLeft = Math.floor(timeLeft / 1000);
  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = (timeLeft % 3600) % 60;
  const [hours, setHours] = useState(h);
  const [minutes, setMinutes] = useState(m);
  const [seconds, setSeconds] = useState(s);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else if (seconds === 0 && minutes > 0) {
        setMinutes((prevMinutes) => prevMinutes - 1);
        setSeconds(59);
      } else if (seconds === 0 && minutes === 0 && hours > 0) {
        setHours((prevhours) => prevhours - 1);
        setMinutes(59);
        setSeconds(59);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <div>
      {formatTime(hours) <= 48 ? (
        <h1>
          {formatTime(hours) < 0
            ? "Ended"
            : `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
                seconds
              )}`}
        </h1>
      ) : (
        <h1>
          {Math.floor(hours / 24)}
          {" days"}
        </h1>
      )}
    </div>
  );
}
export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [user_id, setUserid] = useState(null);
  const { user } = useContext(AuthContext);
  const [sheets, setSheets] = useState([]);
  const [selectedsheet, setSelectedsheet] = useState({});
  const [sheetshow, setSheetshow] = useState(false);
  const [name, setName] = useState("");
  const [mockresults, setMockresults] = useState([]);
  const [mocklabels, setMocklabels] = useState([]);
  const [mockdata, setMockdata] = useState([]);
  const [showMockdata, setShowMockdata] = useState(false);
  const [selectedmockdata, setSelectedmocckdata] = useState(null);
  const { avatar, updateAvatar } = useContext(AvatarContext);
  const [User,setUser] =useState({});
  const [cfdata, setcfdata] = useState({
    contest_name: "",
    contest_link: "",
    contest_datetime: "",
  });
  const [gfgdata, setgfgdata] = useState({
    contest_name: "",
    contest_link: "",
    contest_datetime: "",
  });
  const currentTime = new Date();
  useEffect(() => {
    const getCfdata = async () => {
      try {
        const response = await axios.get(
          "https://code-xl-1.onrender.com/scrape_cf"
        );
        setcfdata(response.data.contest_info);
      } catch (error) {
        console.log(error);
      }
    };
    const getGfgdata = async () => {
      try {
        const response = await axios.get(
          "https://code-xl-1.onrender.com/scrape_gfg"
        );
        setgfgdata(response.data.contest_info);
        //console.log(response.data.contest_info);
      } catch (error) {
        console.log(error);
      }
    };
    getCfdata();
    getGfgdata();
  }, []);
  useEffect(() => {
    const getSheets = async () => {
      try {
        if (!user) return console.log("User ID not available");
        const user_id = user._id;
        setUserid(user_id);
        setLoading(true);
        const response = await axios.get(
          "https://code-xl.onrender.com/api/getSheets",
          {
            params: { user_id: user_id },
          }
        );
        setSheets(response.data.sheets);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    const getUser = async () => {
      try {
        if (!user) return console.log("User ID not available");
        const user_id = user._id;
        setUserid(user_id);
        setLoading(true);
        const response = await axios.get(
          "https://code-xl.onrender.com/api/getUser",
          {
            params: { user_id: user_id },
          }
        );
        setUser(response.data);
        updateAvatar(response.data.avatar);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    const getMock = async () => {
      try {
        if (!user) return console.log("User ID not available");
        const user_id = user._id;
        setUserid(user_id);
        setLoading(true);
        const response = await axios.get(
          "https://code-xl.onrender.com/api/getMock",
          {
            params: { user_id: user_id },
          }
        );
        //console.log(response.data);
        setMockresults(response.data);
        const labels = [];
        const data = [];
        for (let i = 0; i < response.data.length; i++) {
          let correctq = Number(response.data[i].correct_q);
          let totalq = Number(response.data[i].total_q);
          data.push(Math.floor((correctq / totalq) * 100));
          labels.push(response.data[i].name);
        }
        setMockdata(data);
        setMocklabels(labels);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMock();
    getSheets();
    getUser();
  }, [user]);
  const EmptyProgress = () => (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      <p className="text-zinc-400 mb-4 text-center">
        No progress sheets found. Start by adding some practice sheets!
      </p>
      <button
        onClick={() => navigate("/sheets")}
        className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
      >
        Add Sheets
      </button>
    </div>
  );

  const EmptyMockTest = () => (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      <p className="text-zinc-400 mb-4 text-center">
        No mock assessments taken yet. Start practicing with mock tests!
      </p>
      <button
        onClick={() => navigate("/mockassessment")}
        className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
      >
        Take Mock Test
      </button>
    </div>
  );
  const editedsheets = sheets;
  for (let i = 0; i < sheets.length; i++) {
    const temp = sheets[i].sheet;
    const done = temp.filter((problem) => {
      return problem.status === "DONE";
    });
    editedsheets[i]["completionStatus"] = Math.floor(
      (done.length / temp.length) * 100
    );
  }
  return (
    <div
      className="text-white overflow-auto bg-zinc-950  "
      style={{
        overflowY: "scroll",
        scrollbarWidth: "thin",
        msOverflowStyle: "none",
        scrollbarColor: "#10B981 transparent",
      }}
    >
      {!loading ? (
        <div className="m-4 h-full flex  ">
          <div className="flex flex-col items-center lg:justify-center lg:flex-row h-[110%] w-full lg:space-y-0 space-y-4">
            <div className="border border-zinc-700/50 bg-zinc-950/50 flex flex-col items-center px-6 py-8 lg:h-full w-full min-w-72 lg:justify-center lg:w-1/3 rounded-xl shadow-lg">
              <div className="flex flex-col w-full h-full items-center space-y-6">
                <ProfileImage
                  avatar={avatar}
                  fallbackImage={User_img}
                  className="w-32 h-32 rounded-full border-4 border-green-500/20 shadow-lg shadow-green-500/10"
                />

                <div className="flex flex-col items-center space-y-2">
                  <h1 className="text-2xl font-bold text-zinc-100">{User.name}</h1>
                  <h2 className="text-zinc-400">{User.username}</h2>
                </div>

                <div className="w-full pt-6 border-t border-zinc-700/50">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-zinc-900/80 rounded-xl shadow-inner">
                        <LuSchool size={24} className="text-green-400" />
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-sm text-zinc-500">College</h2>
                        <h2 className="text-zinc-200 font-semibold">
                          {User.collegeName}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-zinc-900/80 rounded-xl shadow-inner">
                        <IoLocationSharp size={24} className="text-green-400" />
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-sm text-zinc-500">Location</h2>
                        <h2 className="text-zinc-200 font-semibold">{User.location}</h2>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full pt-6 border-t border-zinc-700/50">
                  {/* You can add more content here if needed */}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full lg:h-full lg:pl-4 ">
              <div className="flex lg:flex-row lg:h-1/2 flex-col w-full lg:space-y-0 space-y-4">
                <div className="border border-zinc-700/50 bg-zinc-950/50 rounded-xl mr-4 lg:w-2/3 w-full overflow-hidden flex flex-col h-full shadow-lg">
                  {/* Header with gradient border bottom */}
                  <div className="text-lg text-zinc-100 font-semibold p-4 border-b border-zinc-700/50 bg-zinc-900/30 backdrop-blur-sm">
                    <h2 className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                      Progress
                    </h2>
                  </div>

                  {/* Content area with custom scrollbar */}
                  <div className="flex-grow overflow-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-transparent hover:scrollbar-thumb-green-600">
                    {editedsheets.length > 0 ? (
                      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 p-6">
                        {editedsheets.map((sheet) => (
                          <div
                            key={sheet._id}
                            className="group flex flex-col items-center justify-center p-6 bg-zinc-900/40 rounded-xl border border-zinc-800/50 hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/5"
                            onClick={() => {
                              setSelectedsheet(sheet);
                              setSheetshow(true);
                            }}
                          >
                            {/* Progress Circle Container */}
                            <div className="w-28 h-28 transition-transform duration-300 group-hover:scale-105">
                              <CircularProgressbar
                                value={sheet.completionStatus}
                                text={`${sheet.completionStatus}%`}
                                styles={buildStyles({
                                  pathColor: "rgb(34 197 94)",
                                  textColor: "rgb(34 197 94)",
                                  trailColor: "rgba(63, 63, 70, 0.3)",
                                  textSize: "16px",
                                  textWeight: "bold",
                                  // Add subtle rotation animation
                                  rotation: 0.25,
                                  pathTransition:
                                    "stroke-dashoffset 0.5s ease 0s",
                                })}
                              />
                            </div>

                            {/* Sheet Name */}
                            <div className="mt-4 text-center w-full">
                              <h3 className="text-zinc-400 font-medium group-hover:text-green-400 transition-colors truncate max-w-[150px] mx-auto">
                                {sheet.name.substring(0, sheet.name.length - 5)}
                              </h3>
                              {/* Optional: Add completion status text */}
                              <p className="text-xs text-zinc-500 mt-1">
                                {sheet.completionStatus === 100
                                  ? "Completed"
                                  : "In Progress"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <EmptyProgress />
                    )}
                  </div>
                </div>
                <div className="border border-zinc-700/50 bg-zinc-950/50 flex flex-col rounded-xl lg:h-full ml-auto lg:w-2/5 w-full shadow-lg">
                  {/* Header */}
                  <div className="text-lg font-semibold  p-4 border-b border-zinc-700/50 bg-zinc-900/30 backdrop-blur-sm">
                    <h2 className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent ">
                      Upcoming Contests
                    </h2>
                  </div>

                  {/* Contest List Container */}
                  <div className="flex-grow overflow-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-transparent hover:scrollbar-thumb-green-600">
                    <div className="flex flex-col space-y-3 p-4">
                      {/* Leetcode Weekly Contest */}
                      <a
                        href="https://leetcode.com/contest/weekly-contest-411/"
                        target="blank"
                        className="group"
                      >
                        <div className="flex justify-between p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/50 transition-all duration-300 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/5">
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-2">
                              <h2 className="text-zinc-100 font-medium group-hover:text-green-400 transition-colors">
                                Leetcode
                              </h2>
                              <img
                                className="w-6 h-6"
                                src={Leetcode}
                                alt="Leetcode"
                              />
                            </div>
                            <h3 className="text-sm text-zinc-400">
                              Weekly-411
                            </h3>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-sm text-zinc-300">
                              Starts in:
                            </span>
                            <span className="text-sm text-zinc-400 mt-1">
                              <TimeLeft
                                timeLeft={
                                  Date.parse("2024-08-18T05:30:00.000") -
                                  currentTime
                                }
                              />
                            </span>
                          </div>
                        </div>
                      </a>

                      {/* Codeforces Contest */}
                      <a
                        href={cfdata.contest_link}
                        target="blank"
                        className="group"
                      >
                        <div className="flex justify-between p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/50 transition-all duration-300 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/5">
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-2">
                              <h2 className="text-zinc-100 font-medium group-hover:text-green-400 transition-colors">
                                Codeforces
                              </h2>
                              <img
                                className="w-6 h-6"
                                src={Cflogo}
                                alt="Codeforces"
                              />
                            </div>
                            <h3 className="text-sm text-zinc-400">
                              {cfdata.contest_name}
                            </h3>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-sm text-zinc-300">
                              Starts in:
                            </span>
                            <span className="text-sm text-zinc-400 mt-1">
                              {cfdata.contest_datetime && (
                                <TimeLeft
                                  timeLeft={
                                    Date.parse(cfdata.contest_datetime) -
                                    currentTime
                                  }
                                />
                              )}
                            </span>
                          </div>
                        </div>
                      </a>

                      {/* GFG Contest */}
                      <a
                        href={gfgdata.contest_link}
                        target="blank"
                        className="group"
                      >
                        <div className="flex justify-between p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/50 transition-all duration-300 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/5">
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-2">
                              <h2 className="text-zinc-100 font-medium group-hover:text-green-400 transition-colors">
                                GFG
                              </h2>
                              <img className="w-6 h-6" src={Gfg} alt="GFG" />
                            </div>
                            <h3 className="text-sm text-zinc-400">
                              {gfgdata?.contest_name || ""}
                            </h3>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-sm text-zinc-300">
                              Starts in:
                            </span>
                            <span className="text-sm text-zinc-400 mt-1">
                              {gfgdata.contest_datetime && (
                                <TimeLeft
                                  timeLeft={
                                    Date.parse(gfgdata.contest_datetime) -
                                    currentTime
                                  }
                                />
                              )}
                            </span>
                          </div>
                        </div>
                      </a>

                      {/* Leetcode Biweekly Contest */}
                      <a
                        href="https://leetcode.com/contest/biweekly-contest-137/"
                        target="blank"
                        className="group"
                      >
                        <div className="flex justify-between p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/50 transition-all duration-300 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/5">
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-2">
                              <h2 className="text-zinc-100 font-medium group-hover:text-green-400 transition-colors">
                                Leetcode
                              </h2>
                              <img
                                className="w-6 h-6"
                                src={Leetcode}
                                alt="Leetcode"
                              />
                            </div>
                            <h3 className="text-sm text-zinc-400">
                              Biweekly-137
                            </h3>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-sm text-zinc-300">
                              Starts in:
                            </span>
                            <span className="text-sm text-zinc-400 mt-1">
                              <TimeLeft
                                timeLeft={
                                  Date.parse("2024-08-17T05:30:00.000") -
                                  currentTime
                                }
                              />
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-zinc-700/50 bg-zinc-950/50 rounded-xl overflow-hidden flex mt-4 flex-col shadow-lg">
                {/* Header */}
                <div className="bg-zinc-900/30 backdrop-blur-sm px-6 py-4 border-b border-zinc-700/50">
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    Mock Assessment Analysis
                  </h2>
                </div>

                {/* Content Container */}
                <div className="w-full flex lg:flex-grow flex-row overflow-y-hidden justify-center p-6 gap-6">
                  {/* Chart Section */}
                  <div className="flex w-[90%] justify-center items-center bg-zinc-900/40 rounded-xl p-6 border border-zinc-800/50 hover:border-green-500/20 transition-colors duration-300 shadow-lg hover:shadow-green-500/5">
                    {!loading && (
                      <div className="w-full">
                        <LineChart
                          mockdata={mockdata}
                          mocklabels={mocklabels}
                        />
                      </div>
                    )}
                  </div>

                  {/* Results List Section */}
                  <div className="w-[60%] lg:flex hidden">
                    <div className="w-full h-full flex flex-col bg-zinc-900/40 rounded-xl border border-zinc-800/50 hover:border-green-500/20 transition-colors duration-300 shadow-lg">
                      <div className="flex flex-col space-y-3 p-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-transparent hover:scrollbar-thumb-green-600">
                        {mockresults.map((result) => (
                          <div
                            key={result._id}
                            className="group w-full rounded-xl bg-zinc-800/50 hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer border border-transparent hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/5"
                            onClick={() => {
                              setSelectedmocckdata(result);
                              setShowMockdata(true);
                            }}
                          >
                            <div className="p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <p className="text-zinc-300 font-medium group-hover:text-green-400 transition-colors">
                                  {result.name}
                                </p>
                                <span className="px-3 py-1.5 bg-zinc-900/70 rounded-full text-sm text-green-400 font-medium border border-green-500/20 group-hover:bg-green-500/10 transition-colors">
                                  {result.correct_q}/{result.total_q}
                                </span>
                              </div>

                              {/* Progress Bar */}
                              <div className="w-full h-2.5 bg-zinc-700/30 rounded-full overflow-hidden">
                                <div
                                  style={{
                                    width: `${Math.floor(
                                      (Number(result.correct_q) /
                                        Number(result.total_q)) *
                                        100
                                    )}%`,
                                  }}
                                  className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500 ease-out group-hover:scale-x-105"
                                />
                              </div>
                              <div className="text-xs text-zinc-500 text-right">
                                {Math.floor(
                                  (Number(result.correct_q) /
                                    Number(result.total_q)) *
                                    100
                                )}
                                % Attempted
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="flex items-center justify-center p-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {showMockdata && (
            <ShowMockResults
              setShowMockdata={setShowMockdata}
              selectedmockdata={selectedmockdata}
            />
          )}
        </div>
      ) : (
        <DashboardSkeleton />
      )}
      {sheetshow && (
        <ShowSheetDetails
          selectedsheet={selectedsheet}
          setSheetshow={setSheetshow}
        />
      )}
    </div>
  );
}
