import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { FileUploader } from "react-drag-drop-files";
import Sheet from "./Sheet";
import Spinner from "./SpinnerAni";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
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
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ">
      <div className="bg-black bg-opacity-50 backdrop-blur-sm absolute inset-0 "></div>
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
      {loading && <Spinner />}
    </div>
  );
}

export default function Sheets() {
  const [sheetshow, setSheetshow] = useState(false);
  const [selectedsheet, setSelectedsheet] = useState([]);
  const { user } = useContext(AuthContext);
  const [sheets, setSheets] = useState([]);
  const [fileshow, setFileshow] = useState(false);
  const [userid, setUserid] = useState("");
  const [reload, setReload] = useState(false);
  const [sheet_id, setSheet_id] = useState("");
  const [sheets_id, setSheets_id] = useState("");
  const [loading, setLoading] = useState(true);
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
        console.log("sheets_id ", response.data._id);
        setSheets_id(response.data._id);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getSheets();
  }, [user, reload]);

  return (
    <div
      className="overflow-auto"
      style={{
        overflowY: "scroll",
        scrollbarWidth: "thin",
        msOverflowStyle: "none",
        scrollbarColor: "#10B981 transparent",
      }}
    >
      {loading ? (
        <Spinner />
      ) : !sheetshow ? (
        <div className="px-10 py-10 h-full w-full">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-zinc-300">
              Personalized Sheets
            </h1>
            <p className="mt-4 text-lg text-zinc-400">
              Our Personalized Sheets feature revolutionizes study efficiency by
              allowing users to upload Excel or similar sheets. Automatically
              extracting and categorizing problems by topic, it seamlessly
              integrates with YouTube to provide relevant video links. Users can
              easily track completion status, checking off solved problems for a
              clear overview of their progress. Enhance your learning experience
              with organized, interactive study tools tailored to your needs.
              Get started with Striver's famous SDE sheet and level up your learning game!{" "}
              <a
                href="https://docs.google.com/spreadsheets/d/1SJYYWag2RNONf8BNW3W8z92nhJotSDm_/edit?usp=sharing&ouid=104446117698915010531&rtpof=true&sd=true"  target="_blank"
                className=" capitalize hover:underline ml-1 text-zinc-200 text-sm bg-zinc-900 px-2 py-1 rounded-3xl  font-semibold hover:scale-105 duration-200 shadow-sm border border-zinc-800  hover:text-green-500"
              >
                Striver's SDE sheet 
              </a>
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 md:gap-8 gap-4">
            <div
              onClick={() => setFileshow(true)}
              className="hover:cursor-pointer hover:scale-105 duration-200 bg p-5 rounded-xl h-44 flex text-3xl font-bold border border-green-500 hover:border-2 bg-zinc-900 items-center justify-center text-green-500"
            >
              <FiPlus className="hover:scale-105 duration-200" size={100} />
            </div>

            {sheets.map((it) => (
              <div
                key={it._id}
                onClick={() => {
                  setSelectedsheet(it);
                  setSheetshow(true);
                  setSheet_id(it._id);
                }}
                className="hover:cursor-pointer hover:scale-105 duration-200 p-5 rounded-xl h-44 flex flex-col bg text-2xl text-gray-300 font-bold bg-zinc-900 border-zinc-700 border hover:border-2 hover:text-green-500 hover:border-green-500 "
              >
                <div>{it.name.substring(0, it.name.length - 5)}</div>
                <div className="text-sm font-sans font mt-auto underline flex flex-row items-center">
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
  );
}
