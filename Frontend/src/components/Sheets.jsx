import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { FileUploader } from "react-drag-drop-files";
import { IoMdArrowRoundBack } from "react-icons/io";

function FileUploadForm({ setFileshow, user_id, setReload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (file) => {
    setSelectedFile(file);
  };
  const FileUpload = async () => {
    if (!user_id) {
      return console.log("No user");
    }
    const formData = new FormData();
    formData.append("excelFile", selectedFile);
    formData.append("user_id", user_id);

    try {
      const response = await axios.post(
        "https://code-xl.onrender.com/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setReload(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-70 absolute inset-0"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10 flex items-center flex-row ">
        <FileUploader
          handleChange={handleFileChange}
          name="file"
          types={["XLSX"]}
        />
        <button
          className=" bg-black text-gray-100 py-2 px-4 rounded-lg ml-7 hover:cursor-pointer hover:scale-105 duration-200"
          onClick={() => {
            setFileshow(false);
            FileUpload();
            if (!selectedFile)
              return alert("Select or drop a file to continue");
          }}
          disabled={!selectedFile}
        >
          Upload
        </button>
        <button
          className=" bg-gray-100 border shadow-lg text-black py-2 px-4 rounded-lg ml-3 hover:cursor-pointer hover:scale-105 duration-300"
          onClick={() => {
            setFileshow(false);
            setSelectedFile(null);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function Sheet({
  setSheetshow,
  selectedsheet,
  sheet_id,
  sheets_id,
  setReload,
}) {
  const [problem_id, setProblem_id] = useState(null);

  useEffect(() => {
    const toggleProblemstatus = async () => {
      console.log(sheet_id, "/n", sheets_id, "/n", problem_id);
      if (problem_id && sheet_id && sheets_id) {
        try {
          
          const response = await axios.post(
            "https://code-xl.onrender.com/api/toggleprobstatus",
            { problem_id: problem_id, sheets_id: sheets_id, sheet_id: sheet_id }
          );
          setReload(true);
          setProblem_id("");
          console.log(1);
        } catch (error) {
          console.log(error);
        }
      }
    };
    toggleProblemstatus();
  }, [problem_id]);

  const handleStatusToggle = (problem_id) => {
    setProblem_id(problem_id);
  };

  return (
    <div className="p-4 capitalize m-6">
      <button
        className="px-4 py-2 rounded-lg text-black bg-white mb-8 font-bold flex flex-row items-center space-x-1"
        onClick={() => {
          setSheetshow(false);
        }}
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
            {selectedsheet.map((problem, index) => (
              <tr
                key={problem._id}
                className={
                  index % 2 === 0
                    ? "bg-gray-700"
                    : "bg-gray-800 hover:bg-gray-700"
                }
              >
                <td className="py-2 px-4 border-b border-gray-700">
                  <button
                    onClick={() => {
                      handleStatusToggle(problem._id);
                    }}
                  >
                    {problem.status === "DONE" ? (
                      <div className="  font-semibold rounded-2xl px-2 flex flex-auto items-center justify-center bg-green-800 text text-green-400">
                        Done
                      </div>
                    ) : (
                      <div className="font-semibold rounded-2xl px-2 flex flex-auto items-center justify-center bg-red-800 text text-red-400">
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
    </div>
  );
}

export default function Sheets() {
  const [sheetshow, setSheetshow] = useState(false);
  const [selectedsheet, setSelectedsheet] = useState([]);
  const { user, token, login, logout } = useContext(AuthContext);
  const [sheets, setSheets] = useState([]);
  const [fileshow, setFileshow] = useState(false);
  const [userid, setUserid] = useState("");
  const [reload, setReload] = useState(false);
  const [sheet_id, setSheet_id] = useState("");
  const [sheets_id, setSheets_id] = useState("");

  useEffect(() => {
    const getSheets = async () => {
      try {
        if (!user) return console.log("User ID not available");
        if (reload) setReload(false);
        const user_id = user._id;
        setUserid(user_id);
        const response = await axios.get(
          "https://code-xl.onrender.com/api/getSheets",
          {
            params: { user_id: user_id },
          }
        );
        setSheets(response.data.sheets);
        console.log("sheets_id ", response.data._id);
        setSheets_id(response.data._id);
      } catch (error) {
        console.log(error);
      }
    };
    getSheets();
  }, [user, reload]);
  return (
    <div className="overflow-auto">
      {!sheetshow ? (
        <div
          className="px-10 py-10 overflow-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="grid sm:grid-cols-1 md:grid-cols-3 md:gap-14 gap-4">
            <div
              onClick={() => setFileshow(true)}
              className="hover:cursor-pointer hover:scale-105 duration-300 bg p-5 rounded-xl h-44 flex border text-3xl text-gray-700 font-bold bg-white items-center justify-center"
            >
              <FiPlus className="hover:scale-105 duration-200" size={100} />
            </div>

            {sheets.map((it) => (
              <div
                key={it._id}
                onClick={() => {
                  setSelectedsheet(it.sheet);
                  setSheetshow(true);
                  setSheet_id(it._id);
                }}
                className="hover:cursor-pointer hover:scale-105 duration-300 p-5 rounded-xl h-44 flex border flex-col bg text-2xl text-black font-bold bg-white"
              >
                <div>{it.name.substring(0, it.name.length - 5)}</div>
                <div className="text-sm font-sans font mt-auto text-gray-900 underline flex flex-row items-center">
                  View all
                  <div className="px-1">
                    <FaArrowRight />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Sheet
          setSheetshow={setSheetshow}
          selectedsheet={selectedsheet}
          sheet_id={sheet_id}
          sheets_id={sheets_id}
          setReload={setReload}
        />
      )}
      {fileshow && (
        <FileUploadForm
          setFileshow={setFileshow}
          user_id={userid}
          setReload={setReload}
        />
      )}
    </div>
  );
}
