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
import randomColor from 'randomcolor';
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
    topicColors.push(randomColor({ luminosity: 'bright' }));
    borderColors.push("rgb(39 39 42 )");
  }

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center min-h-screen w-screen z-50 bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-zinc-800 border-zinc-600 border  rounded-lg shadow-lg text-zinc-300 flex-col flex items-center">
      <div className="text-lg font-semibold p-4 border-b border-zinc-600 text-zinc-300 w-full">
                  Progress: <button
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
            <div  className=" w-[550px] capitalize mt-4"><DoughnutChart topicColors={topicColors} topicLabels={topicLabels} topicCompletion={topicCompletion} borderColors={borderColors}/></div>
          </div>
          <div ></div>
          <div></div>
          <div className="flex flex-col overflow-auto h-[600px] ">
            {topicsCompstatus.map((it,index) => (
              <ul key={index} className="flex flex-col min-w-72 text-sm pr-2 py-2 space-y-2 text-zinc-400 font-semibold ">
                <div className=""><h4>{it.topic.toUpperCase()}</h4></div>
                <div className=""><ProgressBar value = {it.completion}/></div>
              </ul>
            ))}
          </div>
        </div>
        <div></div>
      </div>
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
    getSheets();
    getUser();
  }, [user]);
  const editedsheets = sheets;
  console.log(sheets);
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
    <div className="text-white overflow-auto">
      <div className="m-4">
        <div className="flex flex-row h-full">
          <div className="w border border-zinc-700 flex flex-col items-center bg-zinc-900 px-2 min-h-screen max-h-full min-w-1/3 rounded-lg">
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
          <div className="md:flex flex-col w-full pl-4">
            <div className="flex flex-row">
              <div className="bg-zinc-900 border border-zinc-700 rounded-lg h-full mr-4 w-3/5">
                <div className="text-lg text-zinc-100 font-semibold p-4 border-b border-zinc-600">
                  Progress
                </div>

                <div
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  className="flex overflow-auto h-64 mb-4 w-full  "
                >
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-auto gap-x-12 gap-y-8 my-8">
                    {editedsheets.map((sheet) => (
                      <div
                        key={sheet._id}
                        className="w-32 flex flex-col items-center hover:cursor-pointer"
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
              <div className=" border border-zinc-700 rounded-lg h-full ml-auto w-2/5 ">
                <div className="text-lg font-semibold p-4 border-b border-zinc-600 text-zinc-300">
                  Upcoming Contests
                </div>
                <div>
                  <div></div>
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
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
