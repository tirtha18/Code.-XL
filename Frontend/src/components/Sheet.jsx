import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import Spinner from "./SpinnerAni";
export default function Sheet({
  setSheetshow,
  selectedsheet,
  sheet_id,
  sheets_id,
  setReload,
}) {
  const [problem_id, setProblem_id] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sheetdata, setSheetdata] = useState(selectedsheet);

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

  return (
    <div className="p-4 capitalize m-6">
      <button
        className="px-4 py-2 rounded-lg text-black bg-white mb-8 font-bold flex flex-row items-center space-x-1"
        onClick={() => setSheetshow(false)}
      >
        <IoMdArrowRoundBack size={20} />
        <div>Back</div>
      </button>
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-700 bg-gray-900 text-left">
                Status
              </th>
              <th className="py-2 px-4 border-b border-gray-700 bg-gray-900 text-left">
                Topic Name
              </th>
              <th className="py-2 px-4 border-b border-gray-700 bg-gray-900 text-left">
                Problem Name
              </th>
              <th className="py-2 px-4 border-b border-gray-700 bg-gray-900 text-left">
                Practice
              </th>
              <th className="py-2 px-4 border-b border-gray-700 bg-gray-900 text-left">
                Video
              </th>
            </tr>
          </thead>
          <tbody>
            {sheetdata.sheet.map((problem, index) => (
              <tr
                key={problem._id}
                className={
                  index % 2 === 0
                    ? "bg-gray-700"
                    : "bg-gray-800 hover:bg-gray-700"
                }
              >
                <td className="py-2 px-4 border-b border-gray-700">
                  <button onClick={() => handleStatusToggle(problem._id)}>
                    {problem.status === "DONE" ? (
                      <div className="font-semibold rounded-2xl px-2 flex items-center justify-center bg-green-800 text-green-400">
                        Done
                      </div>
                    ) : (
                      <div className="font-semibold rounded-2xl px-2 flex items-center justify-center bg-red-800 text-red-400">
                        Pending
                      </div>
                    )}
                  </button>
                </td>
                <td className="py-2 px-4 border-b border-gray-700">
                  {problem.tag}
                </td>
                <td className="py-2 px-4 border-b border-gray-700">
                  {problem.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-700">
                  <a
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 underline"
                  >
                    Practice Link
                  </a>
                </td>
                <td className="py-2 px-4 border-b border-gray-700">
                  <a
                    href={problem.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 underline"
                  >
                    Video Link
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <Spinner />}
    </div>
  );
}
