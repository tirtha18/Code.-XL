import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import Spinner from "../ui/reusables/SpinnerAni";
import { IoAddSharp } from "react-icons/io5";
import { RiArrowDropUpLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { LiaRandomSolid } from "react-icons/lia";
import GFG_logo from "../../images/GFG_logo1.png";
import YT_logo from "../../images/YT_logo.png";
import LC_logo from "../../images/LC_logo.png";
import { FaRandom } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { FiEdit3 } from "react-icons/fi";
function Notes({
  setShownotes,
  user_id,
  selectedProblem,
  setSelectedproblem,
  sheetdata,
  setSheetdata,
}) {
  const addNotes = async () => {
    if (selectedProblem && user_id) {
      try {
        const response = await axios.post(
          "https://code-xl.onrender.com/api/addNotes",
          {
            problem_id: selectedProblem._id,
            user_id: user_id,
            notes: selectedProblem.notes,
          }
        );
        const updatedSheetdata_ = { ...sheetdata };
        const ind = updatedSheetdata_.sheet.findIndex(
          (problem) => problem._id === selectedProblem._id
        );
        updatedSheetdata_.sheet[ind]["notes"] = selectedProblem.notes;
        setSheetdata(updatedSheetdata_);
        toast.success("Notes Updated Successfully!");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    let temp = { ...selectedProblem };
    temp["notes"] = e.target.value;
    setSelectedproblem(temp);
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen z-50 bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-zinc-800 border-zinc-600 border  rounded-lg shadow-lg text-zinc-300 flex-col flex items-center w-[50%] ">
        <div className="text-lg font-semibold  border-b border-zinc-600 text-zinc-300 w-full  p-4">
          Notes
        </div>
        <button
          onClick={() => setShownotes(false)}
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
        <div className="mt-4 w-full h-[90%] px-4 rounded-lg">
          <textarea
            name="notes"
            id={selectedProblem._id}
            className=" border bg-zinc-800 border-zinc-600 w-full h-96 text-zinc-400 rounded-lg p-3 mb-4"
            onChange={(e) => handleChange(e)}
            value={selectedProblem.notes}
          >
            {selectedProblem.notes}
          </textarea>
        </div>
        <button
          onClick={() => {
            addNotes();
          }}
          className="ml-auto mr-4 mt-auto mb-4 px-4 py-2 bg-green-700 rounded-lg"
        >
          {" "}
          Save Notes
        </button>
      </div>
    </div>
  );
}
export default function Sheet({ setSheetshow, selectedsheet, user_id }) {
  const [loading, setLoading] = useState(false);
  const [sheetdata, setSheetdata] = useState(selectedsheet);
  const [showNotes, setShownotes] = useState(false);
  const [selectedProblem, setSelectedproblem] = useState({});
  const [showRevision, setShowRevision] = useState(false);
  const [divprobRev, setDivprobRev] = useState([]);
  const [Sheet, setSheet] = useState([]);
  const dividedprob = sheetdata.sheet.reduce((acc, prob) => {
    if (!acc[prob.tag]) acc[prob.tag] = [];
    acc[prob.tag].push(prob);
    return acc;
  }, {});
  useEffect(() => {
    const revisionprob = sheetdata.sheet.filter(
      (problem) => problem.isInrevision === true
    );
    const dividedrevprob = revisionprob.reduce((acc, prob) => {
      if (!acc[prob.tag]) acc[prob.tag] = [];
      acc[prob.tag].push(prob);
      return acc;
    }, {});
    setDivprobRev(dividedrevprob);
  }, [sheetdata]);
  const toggleProblemstatus = async (problem_id) => {
    if (problem_id && user_id) {
      try {
        const response = await axios.post(
          "https://code-xl.onrender.com/api/toggleprobstatus",
          { problem_id: problem_id, user_id: user_id }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const toggleRevisionstatus = async (problem_id) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/toggle_rev_probstatus",
        { problem_id, user_id }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRevision = (problem_id) => {
    const updatedSheet = { ...sheetdata };
    const ind = updatedSheet.sheet.findIndex(
      (problem) => problem._id === problem_id
    );
    updatedSheet.sheet[ind]["isInrevision"] =
      !updatedSheet.sheet[ind]["isInrevision"];
    setSheetdata(updatedSheet);
  };
  const handleStatusToggle = (problem_id) => {
    const updatedSheet = { ...sheetdata };
    const ind = updatedSheet.sheet.findIndex(
      (problem) => problem._id === problem_id
    );
    if (updatedSheet.sheet[ind].status === "DONE")
      updatedSheet.sheet[ind].status = "PENDING";
    else updatedSheet.sheet[ind].status = "DONE";
    setSheetdata(updatedSheet);
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
  const handleShowRevision = () => {
    if (showRevision) {
      setSheet(divprobRev);
    } else setSheet(dividedprob);
  };
  useEffect(() => {
    handleShowRevision();
  }, [showRevision, divprobRev]);
  const getProblemsCount = (problems) => {
    const total = problems.length;
    const solved = problems.filter(
      (problem) => problem.status === "DONE"
    ).length;
    return `${solved}/${total}`;
  };
  return (
    <div className=" capitalize ">
      <div className="mb-6 min-w-full flex flex-row justify-between items-center">
        <button
          className="px-3.5 py-3 rounded-lg text-gray-300 border border-zinc-600 bg-zinc-800 font-bold flex flex-row items-center space-x-1 hover:scale-105 duration-300"
          onClick={() => setSheetshow(false)}
        >
          <IoChevronBackOutline size={22} />
        </button>
        <span className=" text-zinc-400 text-xl "><h1>{selectedsheet.name.substring(0,selectedsheet.name.length-5)}</h1></span>
        <div className=" items-center flex space-x-4">
          <button className="py-2 px-2.5 text-zinc-300 border rounded-lg border-zinc-600  bg-zinc-800 hover:cursor-pointer hover:scale-105 duration-200">
            <LiaRandomSolid size={22} />
          </button>
          <button
            className="px-2 py-2 h-10 rounded-lg bg-green-700 font-medium font-sans text-zinc-200 hover:cursor-pointer hover:scale-105 duration-200"
            onClick={() => {
              setShowRevision(!showRevision);
            }}
          >
            {!showRevision ? "Show Revision" : "Hide Revision"}
          </button>
        </div>
      </div>

      <div className="">
        <div className=" ">
          {Object.entries(Sheet).map(([tag, problems], index) => (
            <div
              key={tag}
              className=" mb-6 border-zinc-700 bg-zinc-900 border rounded-lg "
            >
              <div></div>
              <div
                onClick={() => {
                  handleDropdown(index);
                }}
                className={`w-full bg-zinc-900 flex px-4 py-3 flex-row hover:cursor-pointer text-gray-300 rounded-t-lg justify-between items-center ${
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
                <div className="flex flex-row justify-center items-center">
                  <span className="mr-4 text-sm font-medium px-2 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg">
                    {getProblemsCount(problems)}
                  </span>
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
              </div>
              {dropdown[index] && (
                <div className=" bg-zinc-900  m-8 border rounded-lg border-zinc-600">
                  <table className="w-full text-gray-400 min-h-full ">
                    <thead>
                      <tr className="text-sm">
                        <th className=" text-center">STATUS</th>
                        <th className="py-2 px-4 text-left border-l border-zinc-600">
                          NAME
                        </th>
                        <th className="py-2 px-4 text-center border-l border-zinc-600">
                          PRACTICE
                        </th>
                        <th className="py-2 px-4 text-center border-l border-zinc-600">
                          NOTES
                        </th>
                        <th className="py-2 px-4 text-center border-l border-zinc-600">
                          REVISION
                        </th>
                        <th className="py-2 px-4 text-center border-l border-zinc-600">
                          VIDEO
                        </th>
                      </tr>
                    </thead>
                    <tbody className=" text-zinc-300 ">
                      {problems.map((problem) => (
                        <tr key={problem._id} className=" ">
                          {showNotes && (
                            <Notes
                              setShownotes={setShownotes}
                              user_id={user_id}
                              setSelectedproblem={setSelectedproblem}
                              selectedProblem={selectedProblem}
                              sheetdata={sheetdata}
                              setSheetdata={setSheetdata}
                            />
                          )}
                          <td className="py-2 px-1 border-t text-center border-zinc-600">
                            <label className="flex justify-center items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={problem.status === "DONE"}
                                onChange={() => {
                                  handleStatusToggle(problem._id);
                                  toggleProblemstatus(problem._id);
                                }}
                                className="appearance-none h-5 w-5 border-2 border-zinc-600 rounded-md checked:bg-green-500 checked:border-zinc-600 checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 cursor-pointer transition duration-200 relative"
                              />
                            </label>
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
                              {problem.link.substring(0, 16) ===
                              "https://leetcode" ? (
                                <img
                                  src={LC_logo}
                                  alt="#"
                                  className=" w-8 py-2"
                                />
                              ) : (
                                <img src={GFG_logo} alt="#" className=" w-24" />
                              )}
                            </a>
                          </td>
                          <td className="py-2 text-center border-t border-x border-zinc-600">
                            <div className="flex justify-center w-full h-full items-center">
                              <button
                                onClick={() => {
                                  setShownotes(true);
                                  setSelectedproblem(problem);
                                }}
                                className="p-[2px] rounded-lg bg-zinc-800"
                              >
                                {problem.notes === "" ? (
                                  <IoAddSharp
                                    size={24}
                                    className="flex justify-center w-full h-full items-center"
                                  />
                                ) : (
                                  <FiEdit3
                                    className="px-1 text-green-500"
                                    size={26}
                                  />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-2 text-center  border-t border-x border-zinc-600">
                            <div className="flex justify-center w-full h-full items-center text-zinc-700">
                              <FaStar
                                className={`${
                                  problem.isInrevision
                                    ? "text-yellow-400 hover:cursor-pointer"
                                    : "hover:cursor-pointer"
                                }`}
                                size={22}
                                onClick={() => {
                                  toggleRevisionstatus(problem._id);
                                  handleRevision(problem._id);
                                }}
                              />
                            </div>
                          </td>
                          <td className="py-1 border-t text-center border-zinc-600">
                            <a
                              className="flex justify-center w-full items-center"
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
