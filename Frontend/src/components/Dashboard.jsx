import React, { useEffect, useState } from "react";
import User_img from "../images/User_img.png";
import { LuSchool } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import Spinner from "./SpinnerAni";
import ProgressBar from "./ProgressBar";
import DoughnutChart from "./DoughnutChart";
import randomColor from "randomcolor";
import LineChart from "./LineChart";
import Leetcode from "../images/LC_logo.png";
import Gfg from "../images/GFG_logo.png";
import Cflogo from "../images/cflogo.png";
import NavTabs from "./Tabs";

function ShowMockResults({ setShowMockdata, selectedmockdata }) {
  //console.log(selectedmockdata);
  const correctq = selectedmockdata.correct_q;
  const totalq = selectedmockdata.total_q;
  const attemptedq = selectedmockdata.attempted_q;
  const [toggleresult, setToggleresult] = useState(false);
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen z-50 bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-zinc-800 border-zinc-600 border  rounded-lg shadow-lg text-zinc-300 flex-col flex items-center w-[40%] min-h-[40%]">
        <div className="text-lg font-semibold  border-b border-zinc-600 text-zinc-300 w-full  p-4">
          {selectedmockdata.name}
          <button
            onClick={() => setShowMockdata(false)}
            className="absolute top-4 right-4"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
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
            <div className=" text-zinc-300 bg-zinc-600 rounded-lg shadow-sm shadow-zinc-600 p-4">
              <div className="flex flex-row w-full justify-between">
                <h1>Attemted:</h1>
                <p className="ml-2 bg-zinc-800 px-2 text-zinc-400 py-0.5 text-sm rounded-lg">
                  {attemptedq + "/" + totalq}
                </p>
              </div>
              <div className=" mt-3">
                <ProgressBar value={Math.floor((attemptedq / totalq) * 100)} />
              </div>
            </div>
            <div className=" text-zinc-300 bg-zinc-700 rounded-lg  p-4 mt-4 mb-6">
              <div className="flex flex-row w-full justify-between">
                <h1>Total Score:</h1>
                <p className="ml-2 bg-zinc-800 px-2 text-zinc-400 py-0.5 text-sm rounded-lg">
                  {correctq + "/" + totalq}
                </p>
              </div>
              <div className=" mt-3">
                <ProgressBar value={Math.floor((correctq / totalq) * 100)} />
              </div>
              <div className="flex flex-row w-full justify-between mt-3">
                <h1>Accuracy</h1>
              </div>
              <div className=" mt-3">
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
          <div
            className="mt-6 flex-col w-[90%] max-h-96 overflow-auto space-y-2"
            style={{
              overflowY: "scroll",
              scrollbarWidth: "thin",
              msOverflowStyle: "none",
              scrollbarColor: "#10B981 transparent",
            }}
          >
            {selectedmockdata.questions.map((question, index) => (
              <div key={question._id} className="flex flex-col py-2">
                <h1 className=" text-zinc-300">
                  {index + 1 + ") "}
                  {question.problem}
                </h1>
                <h2 className="text-green-400 text-sm">
                  <h2 className="text-zinc-400">Correct Answer: </h2>{" "}
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
    borderColors.push("rgb(39 39 42 )");
  }

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center min-h-screen w-screen z-50 bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-zinc-800 border-zinc-600 border  rounded-lg shadow-lg text-zinc-300 flex-col flex items-center">
        <div className="text-lg font-semibold p-4 border-b border-zinc-600 text-zinc-300 w-full">
          Progress:
          <button
            onClick={() => setSheetshow(false)}
            className="absolute top-4 right-4"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
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
        <div className=" flex items-center flex-row space-x-16 mt-8 mb-8">
          <div className="flex items-center ">
            <div className=" w-[550px] capitalize mt-4">
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
          <div className="flex flex-col overflow-auto h-[600px] ">
            {topicsCompstatus.map((it, index) => (
              <ul
                key={index}
                className="flex flex-col min-w-72 text-sm pr-2 py-2 space-y-2 text-zinc-400 font-semibold "
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
          {`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}
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
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [mockresults, setMockresults] = useState([]);
  const [mocklabels, setMocklabels] = useState([]);
  const [mockdata, setMockdata] = useState([]);
  const [showMockdata, setShowMockdata] = useState(false);
  const [selectedmockdata, setSelectedmocckdata] = useState(null);
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
        setName(response.data.name);
        setUsername(response.data.username);
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
      className="text-white overflow-auto h-full"
      style={{
        overflowY: "scroll",
        scrollbarWidth: "thin",
        msOverflowStyle: "none",
        scrollbarColor: "#10B981 transparent",
      }}
    >
      <div className="m-4 h-full">
        <div className="flex flex-row h-full">
          <div className="w border border-zinc-700 flex flex-col items-center bg-zinc-900 px-2 h-full min-w-1/3 rounded-lg">
            <div className="m-2 flex flex-col items-center">
              <div className="my-4">
                <img width="120" height="120" src={User_img} alt="User" />
              </div>
              <div className="mt-1 flex flex-col items-center">
                <h1 className="text-2xl font-bold">{name}</h1>
                <h2 className="text-zinc-400 mt-1">{username}</h2>
              </div>
              <div className="mt-8 flex flex-col border-t border-zinc-700 items-center text-zinc-500">
                <div>
                  <div className="mt-12 flex flex-row">
                    <div className="p-2 bg-black rounded-lg">
                      <LuSchool size={24} />
                    </div>
                    <div className="flex flex-col text-sm">
                      <h2 className="px-2 text-zinc-600">College</h2>
                      <h2 className="px-2 text-zinc-200 font-semibold">
                        Jadavpur University
                      </h2>
                    </div>
                  </div>
                  <div className="mt-8 mb-16 flex flex-row">
                    <div className="p-2 bg-black rounded-lg">
                      <IoLocationSharp size={24} />
                    </div>
                    <div className="flex flex-col text-sm">
                      <h2 className="px-2 text-zinc-600">Location</h2>
                      <h2 className="px-2 text-zinc-200 font-semibold">
                        Kolkata
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="border-t w-72 border-zinc-700"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full pl-4 h-full">
            <div className="flex flex-row h-1/2">
              <div className=" border h-full border-zinc-700 rounded-lg mr-4 w-2/3 ">
                <div className="text-lg text-zinc-100 font-semibold p-4 border-b border-zinc-600">
                  Progress:
                </div>
                <div
                  className="flex w-full h-[80%] overflow-auto"
                  style={{
                    overflowY: "scroll",
                    scrollbarWidth: "thin",
                    msOverflowStyle: "none",
                    scrollbarColor: "#10B981 transparent",
                  }}
                >
                  <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 w-full h-full place-items-center mx-4 my-4">
                    {editedsheets.map((sheet) => (
                      <div
                        key={sheet._id}
                        className="w-auto my-4 mx-3 h-48 flex flex-col items-center hover:cursor-pointer"
                        onClick={() => {
                          setSelectedsheet(sheet);
                          setSheetshow(true);
                        }}
                      >
                        <CircularProgressbar
                          value={sheet.completionStatus}
                          text={`${sheet.completionStatus}%`}
                          styles={buildStyles({
                            pathColor: "rgb(34 197 94)",
                            textColor: "rgb(34 197 94)",
                            trailColor: "rgb(63, 63, 70)",
                            textSize: "14px",
                            textWeight: "bold",
                          })}
                        />
                        <div className="mt-2">
                          <h3 className="text-zinc-500">
                            {sheet.name.substring(0, sheet.name.length - 5)}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className=" border border-zinc-700 flex flex-col rounded-lg h-full ml-auto w-2/5 ">
                <div className="text-lg font-semibold p-4 border-b border-zinc-600 text-zinc-300">
                  Upcoming Contests:
                </div>
                <div
                  style={{
                    overflowY: "scroll",
                    scrollbarWidth: "thin",
                    msOverflowStyle: "none",
                    scrollbarColor: "#10B981 transparent",
                  }}
                  className=" flex flex-grow overflow-auto items-center"
                >
                  <div className="flex flex-col mx-2 h-full w-full  my-2">
                    <a href={"https://leetcode.com/contest/weekly-contest-410/"}>
                      <div className="flex flex-row w-full justify-between px-4 py-3 mt-2  rounded-lg hover:bg-zinc-800 hover:cursor-pointer ">
                        <div className="flex flex-col w-[70%]">
                          <div className="flex flex-row items-center">
                            <h2 className="text-lg">Leetcode </h2>
                            <img
                              className="w-7 h-7 ml-2"
                              src={Leetcode}
                              alt="#"
                            />
                          </div>
                          <h2 className="text-sm text-zinc-400">
                            Biweekly-410
                          </h2>
                        </div>
                        <div className="flex flex-col text-sm">
                          <span>
                            <h2>Starts in :</h2>
                            <h2 className="text-zinc-400 mt-2">
                              <TimeLeft
                                timeLeft={
                                  Date.parse("2024-08-11T05:30:00.000") -
                                  currentTime
                                }
                              />
                            </h2>
                          </span>
                          <h2 className="text-zinc-400 mt-2"></h2>
                        </div>
                      </div>
                    </a>
                    <a href={cfdata.contest_link} target="blank">
                      <div className="flex flex-row w-full justify-between px-4 py-3 rounded-lg mt-2 hover:bg-zinc-800 hover:cursor-pointer">
                        <div className="flex flex-col w-[70%]">
                          <div className="flex flex-row items-center">
                            <h2 className="text-lg">Codeforces</h2>
                            <img
                              className="w-7 h-7 ml-2"
                              src={Cflogo}
                              alt="#"
                            />
                          </div>
                          <h2 className="text-sm text-zinc-400">
                            {cfdata.contest_name}
                          </h2>
                        </div>
                        <div className="flex flex-col text-sm">
                          <span className="">
                            <h2>Starts in:</h2>
                          </span>
                          <h2 className="text-zinc-400 mt-2">
                            {cfdata.contest_datetime !== "" ? (
                              <TimeLeft
                                timeLeft={
                                  Date.parse(cfdata.contest_datetime) -
                                  currentTime
                                }
                              />
                            ) : (
                              ""
                            )}
                          </h2>
                        </div>
                      </div>
                    </a>
                    <a href={gfgdata.contest_link} target="blank">
                      <div className="flex flex-row w-full justify-between px-4 py-3  rounded-lg mt-2 hover:bg-zinc-800 hover:cursor-pointer">
                        <div className="flex flex-col w-[70%]">
                          <div className="flex flex-row items-center">
                            <h2 className="text-lg">GFG </h2>
                            <img className=" w-7 h-7 ml-2" src={Gfg} alt="#" />
                          </div>
                          <h2 className="text-sm text-zinc-400">
                            {gfgdata !== null ? gfgdata.contest_name : ""}
                          </h2>
                        </div>
                        <div className="flex flex-col text-sm">
                          <h2>Starts in :</h2>
                          <h2 className="text-zinc-400 mt-2">
                            {gfgdata.contest_datetime !== "" && (
                              <TimeLeft
                                timeLeft={
                                  Date.parse(gfgdata.contest_datetime) -
                                  currentTime
                                }
                              />
                            )}
                          </h2>
                        </div>
                      </div>
                    </a>
                    <a href="https://leetcode.com/contest/biweekly-contest-137/">
                      <div className="flex flex-row w-full justify-between px-4 py-3 mt-2  rounded-lg hover:bg-zinc-800 hover:cursor-pointer ">
                        <div className="flex flex-col w-[70%]">
                          <div className="flex flex-row items-center">
                            <h2 className="text-lg">Leetcode </h2>
                            <img
                              className="w-7 h-7 ml-2"
                              src={Leetcode}
                              alt="#"
                            />
                          </div>
                          <h2 className="text-sm text-zinc-400">
                            Biweekly-137
                          </h2>
                        </div>

                        <div className="flex flex-col text-sm">
                          <span>
                            <h2>Starts in :</h2>
                            <h2 className="text-zinc-400 mt-2">
                              <TimeLeft
                                timeLeft={
                                  Date.parse("2024-08-17T05:30:00.000") -
                                  currentTime
                                }
                              />
                            </h2>
                          </span>
                          <h2 className="text-zinc-400 mt-2"></h2>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className=" border border-zinc-700 rounded-lg ml-auto w-full mt-4 h-full flex flex-col">
              <div className="text-lg font-semibold p-4 border-b border-zinc-600 text-zinc-300">
                Mock Assessment Analysis:
              </div>
              <div className="w-full h-full flex flex-row">
                <div className=" flex w-[55%] h-full items-center border-r border-zinc-700">
                  <div className="h-[98%] py-2 w-[95%]">
                    <div className="h-full w-full mt-1 flex justify-center items-center">
                      <LineChart mockdata={mockdata} mocklabels={mocklabels} />
                    </div>
                  </div>
                </div>
                <div className=" flex flex-grow flex-col h-full items-center">
                  <div className=" w-full items mt-4">
                    <div
                      className=" flex flex-col ml-4 mr-1 overflow-auto max-h-52"
                      style={{
                        overflowY: "scroll",
                        scrollbarWidth: "thin",
                        msOverflowStyle: "none",
                        scrollbarColor: "#10B981 transparent",
                      }}
                    >
                      {mockresults.map((result) => (
                        <div
                          className="w-full rounded-lg py-3 space-y-2 text-sm text-zinc-300 hover:cursor-pointer mb-1 px-2  hover:bg-zinc-700"
                          onClick={() => {
                            setSelectedmocckdata(result);
                            setShowMockdata(true);
                          }}
                          key={result._id}
                        >
                          <div className="flex flex-row ">
                            <p>{result.name}</p>{" "}
                            <p className="ml-auto font-extralight py-0.5 bg-zinc-900 rounded-lg min-w-10 flex items-center justify-center ">
                              {result.correct_q}/{result.total_q}
                            </p>{" "}
                          </div>
                          <ProgressBar
                            value={Math.floor(
                              (Number(result.correct_q) /
                                Number(result.total_q)) *
                                100
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showMockdata && (
          <ShowMockResults
            setShowMockdata={setShowMockdata}
            selectedmockdata={selectedmockdata}
          />
        )}
        {loading && <Spinner />}
      </div>
      {sheetshow && (
        <ShowSheetDetails
          selectedsheet={selectedsheet}
          setSheetshow={setSheetshow}
        />
      )}
    </div>
  );
}
