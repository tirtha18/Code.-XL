import React, { useState, useEffect, useContext } from "react";
import { FiPlus } from "react-icons/fi";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider";
import { FileUploader } from "react-drag-drop-files";
import Sheet from "./Sheet";
import { CiSearch } from "react-icons/ci";
import { FaCode } from "react-icons/fa";
import {FiTrash } from "react-icons/fi";
import SheetSkeletonLoader from "../ui/skeleton/SheetSkeleton";
function FileUploadForm({ setFileshow, user_id, setReload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const FileUpload = async () => {
    if (!user_id) {
      return console.log("No user");
    }
    setLoading(true);
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
      setFileshow(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 backdrop-blur-sm absolute inset-0"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10 flex items-center flex-row">
        <FileUploader
          handleChange={handleFileChange}
          name="file"
          types={["XLSX"]}
        />
        <button
          className="bg-black text-gray-100 py-2 px-4 rounded-lg ml-7 hover:cursor-pointer hover:scale-105 duration-200"
          onClick={() => {
            if (!selectedFile) {
              alert("Select or drop a file to continue!");
            } else FileUpload();
          }}
        >
          Upload
        </button>
        <button
          className="bg-gray-200 border shadow-lg text-black py-2 px-4 rounded-lg ml-3 hover:cursor-pointer hover:scale-105 duration-300"
          onClick={() => {
            setFileshow(false);
            setSelectedFile(null);
          }}
        >
          Cancel
        </button>
      </div>
      {loading && <SheetSkeletonLoader />}
    </div>
  );
}

export default function Sheets() {
  const [sheetshow, setSheetshow] = useState(false);
  const [selectedsheet, setSelectedsheet] = useState([]);
  const { user } = useContext(AuthContext);
  const [sheets, setSheets] = useState([]);
  const [filteredSheets, setFilteredSheets] = useState([]);
  const [fileshow, setFileshow] = useState(false);
  const [userid, setUserid] = useState("");
  const [reload, setReload] = useState(false);
  const [sheet_id, setSheet_id] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://code-xl.onrender.com/api/sheets/${id}`);
      setReload(true); // Trigger reload after deletion
    } catch (error) {
      console.log("Error deleting sheet:", error);
    }
  };
  useEffect(() => {
    const getSheets = async () => {
      try {
        if (!user) return console.log("User ID not available");
        if (reload) setReload(false);
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
        setFilteredSheets(response.data.sheets);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getSheets();
  }, [user, reload]);
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === "") {
      setFilteredSheets(sheets);
    } else {
      const filtered = sheets.filter((sheet) =>
        sheet.name.toLowerCase().includes(query)
      );
      setFilteredSheets(filtered);
    }
  };
  return (
    <div
      className="overflow-auto w-full h-full"
      style={{
        overflowY: "scroll",
        scrollbarWidth: "thin",
        msOverflowStyle: "none",
        scrollbarColor: "#10B981 transparent",
      }}
    >
      <div className=" px-4 md:px-8 py-10 h-full w-full">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-zinc-300">
            Personalized Sheets
          </h1>
          <p className="mt-4 text-md text-zinc-400">
            Our Personalized Sheets feature revolutionizes study efficiency by
            allowing users to upload Excel or similar sheets. Automatically
            extracting and categorizing problems by topic, it seamlessly
            integrates with YouTube to provide relevant video links. Users can
            easily track completion status, checking off solved problems for a
            clear overview of their progress. Enhance your learning experience
            with organized, interactive study tools tailored to your needs.
          </p>
        </div>
        <div className="mb-9">
          <h2 className="text-xl font-bold text-zinc-300 ">Sample Sheets:</h2>
          <ul className="mt-4 space-x-3 flex flex-row mb-4">
            <li>
              <a
                href="https://docs.google.com/spreadsheets/d/1SJYYWag2RNONf8BNW3W8z92nhJotSDm_/edit"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-sm px-2 py-1 rounded-md font-semibold  hover:scale-105 duration-200 shadow-sm border  border-green-500 text-green-500 flex items-center"
              >
                Striver's SDE Sheet <FaExternalLinkAlt className="ml-2" />
              </a>
            </li>
            <li>
              <a
                href="https://docs.google.com/spreadsheets/d/test"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-sm px-2 py-1 rounded-md font-semibold  hover:scale-105 duration-200 shadow-sm border  border-green-500 text-green-500 flex items-center"
              >
                Test Sheet <FaExternalLinkAlt className="ml-2" />
              </a>
            </li>
          </ul>
        </div>

        <div className="mb-8 flex justify-center">
          <span className="flex flex-row space-x-3 items-center w-full p-2 border border-zinc-400 rounded-lg bg-zinc-900 text-zinc-300 focus-within:ring-2 focus-within:ring-green-500">
            <CiSearch size={22} />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search sheets..."
              className="w-full bg-zinc-900 text-zinc-300 placeholder:text-zinc-500 focus:outline-none"
            />
          </span>
        </div>
        {loading ? (
          <SheetSkeletonLoader />
        ) : !sheetshow ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4">
            <div
              onClick={() => setFileshow(true)}
              className="hover:cursor-pointer hover:scale-105 duration-200 bg p-5 rounded-xl h-44 flex flex-col items-center justify-center text-3xl font-bold border border-green-500 hover:border-2 bg-zinc-900 text-green-500"
            >
              <FiPlus className="hover:scale-105 duration-200" size={100} />
            </div>

            {filteredSheets.map((it, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedsheet(it);
                  setSheetshow(true);
                  setSheet_id(it._id);
                }}
                className="hover:cursor-pointer hover:scale-105 duration-200 p-5 rounded-xl h-44 flex flex-col bg text-2xl text-gray-300 font-bold bg-zinc-900 border-zinc-700 border hover:border-2 hover:text-green-500 hover:border-green-500"
              >
                <div className="flex flex-row items-center mb-3">
                  <div className="mr-3 text-green-500">
                    <FaCode size={32} />
                  </div>
                  <div>{it.name.substring(0, it.name.length - 5)}</div>
                </div>
                <div className="w-full justify-between flex flex-row mt-auto">
                <div className="text-sm font-sans font flex flex-row items-center">
                  View all
                  <div className="px-1">
                    <FaArrowRight />
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(it._id);
                  }}
                  className="ml-auto mt-auto text-zinc-700 hover:text-red-700"
                >
                  
                  <FiTrash size={24} />
                </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Sheet
            setSheetshow={setSheetshow}
            selectedsheet={selectedsheet}
            sheet_id={sheet_id}
            setReload={setReload}
            user_id={userid}
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
    </div>
  );
}
