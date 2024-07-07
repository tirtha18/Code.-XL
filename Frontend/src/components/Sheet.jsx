import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import Spinner from "./SpinnerAni";
import { RiArrowDropUpLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import GFG_logo from "../images/GFG_logo1.png";
import YT_logo from "../images/YT_logo.png";
import LC_logo from "../images/LC_logo.png";
export default function Sheet({
  setSheetshow,
  selectedsheet,
  sheet_id,
  sheets_id,
}) {
  const [problem_id, setProblem_id] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sheetdata, setSheetdata] = useState(selectedsheet);
  const dividedprob = sheetdata.sheet.reduce((acc, prob) => {
    if (!acc[prob.tag]) acc[prob.tag] = [];
    acc[prob.tag].push(prob);
    return acc;
  }, {});

  useEffect(() => {
    const toggleProblemstatus = async () => {
      if (problem_id && sheet_id && sheets_id) {
        try {
          const response = await axios.post(
            "https://code-xl.onrender.com/api/toggleprobstatus",
            { problem_id, sheets_id, sheet_id }
          );
          console.log(response);
          setProblem_id("");
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    toggleProblemstatus();
  }, [problem_id]);

  const handleStatusToggle = (problem_id) => {
    const updatedSheet = { ...sheetdata };
    const ind = updatedSheet.sheet.findIndex(
      (problem) => problem._id === problem_id
    );
    console.log(ind);
    if (updatedSheet.sheet[ind].status === "DONE")
      updatedSheet.sheet[ind].status = "PENDING";
    else updatedSheet.sheet[ind].status = "DONE";
    setSheetdata(updatedSheet);
    setProblem_id(problem_id);
    setLoading(true);
  };
  const topiclength = Object.keys(dividedprob).length;
  const temp = [];
  for (let i = 0; i < topiclength; i++) {
    temp.push(false);
  }
  const [dropdown, setDropdown] = useState(temp);
  const handleDropdown = (index) => {
    const tem = { ...dropdown };
    tem[index] = !tem[index];
    setDropdown(tem);
  };

  return (
    <div className="p-4 capitalize m-6">
      <button
        className="px-4 py-2 rounded-lg text-black bg-white mb-10 font-bold flex flex-row items-center space-x-1 hover:scale-105 duration-300"
        onClick={() => setSheetshow(false)}
      >
        <IoMdArrowRoundBack size={20} />
        <div>Back</div>
      </button>
      <div className="">
        <div className=" ">
          {Object.entries(dividedprob).map(([tag, problems], index) => (
            <div key={tag} className=" mb-6 border-zinc-700 bg-zinc-900 border rounded-lg ">
              <div
                onClick={() => {
                  handleDropdown(index);
                }}
                className={`w-full bg-zinc-900 flex p-4 flex-row hover:cursor-pointer text-gray-300 rounded-t-lg justify-between items-center ${
                  dropdown[index]
                    ? "border-b border-zinc-500"
                    : "duration-200 rounded-b-lg shadow-md shadow-zinc-700"
                }`}
              >
                <div
                  className={`text-xl font-bold ${
                    dropdown[index] ? "mb-2" : ""
                  }`}
                >
                  {tag}
                </div>
                <div
                  className={`${
                    dropdown[index]
                      ? " bg-green-900 border text-green-300 border-green-500"
                      : "bg-zinc-800"
                  } rounded-lg p-1`}
                >
                  {!dropdown[index] ? (
                    <RiArrowDropDownLine
                      className="hover:cursor-pointer"
                      size={28}
                    />
                  ) : (
                    <RiArrowDropUpLine
                      className="hover:cursor-pointer"
                      size={28}
                    />
                  )}
                </div>
              </div>
              {dropdown[index] && (
                <div
                  className="max-h-64 overflow-auto  bg-zinc-900  m-8 border rounded-lg border-zinc-600"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <table className="w-full text-gray-400 min-h-full ">
                    <thead>
                      <tr className="text-sm">
                        <th className=" text-center">
                          STATUS
                        </th>
                        <th className="py-2 px-4 text-left border-l border-zinc-600">
                          NAME
                        </th>
                        <th className="py-2 px-4 text-center border-l border-zinc-600">
                          PRACTICE
                        </th>
                        <th className="py-2 px-4 text-center border-l border-zinc-600">
                          VIDEO
                        </th>
                      </tr>
                    </thead>
                    <tbody className=" text-zinc-300 ">
                      {problems.map((problem) => (
                        <tr key={problem._id}className=" ">
                          <td className="py-2 px-1 border-t text-center border-zinc-600">
                            <button
                              onClick={() => handleStatusToggle(problem._id)}
                            >
                              {problem.status === "DONE" ? (
                                <div className="font-semibold rounded-2xl px-3 flex items-center justify-center bg-green-800 text-green-300">
                                  Done
                                </div>
                              ) : (
                                <div className="font-semibold rounded-2xl px-3 flex items-center justify-center bg-red-800 text-red-400">
                                  Pending
                                </div>
                              )}
                            </button>
                          </td>
                          <td className="py-2 pl-4 border-t border-x border-zinc-600">
                            {problem.name}
                          </td>
                          <td className="py-1 border-t text-center border-r border-zinc-600">
                            <a
                              className="flex justify-center w-full h-full items-center"
                              href={problem.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              { problem.link.substring(0,16) === "https://leetcode" ? 
                              (<img src={LC_logo} alt="#" className=" w-8 py-2"  />): (<img src={GFG_logo} alt="#" className=" w-24" />)}
                            </a>
                          </td>
                          <td className="py-1 border-t text-center border-zinc-600">
                            <a className="flex justify-center w-full items-center"
                              href={problem.videoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img src={YT_logo} alt="#" className="w-8" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
        {loading && <Spinner />}
      </div>
    </div>
  );
}
