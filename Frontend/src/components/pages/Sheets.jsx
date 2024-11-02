import React, { useState, useEffect, useContext } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { FaArrowRight, FaExternalLinkAlt, FaCode } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider";
import { FileUploader } from "react-drag-drop-files";
import Sheet from "./Sheet";
import SheetSkeletonLoader from "../ui/skeleton/SheetSkeleton";

function FileUploadForm({ setFileshow, user_id, setReload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (file) => {
    setSelectedFile(file);
    setUploadProgress(0);
  };

  const FileUpload = async () => {
    if (!user_id) return console.log("No user");
    setLoading(true);
    const formData = new FormData();
    formData.append("excelFile", selectedFile);
    formData.append("user_id", user_id);

    try {
      const response = await axios.post(
        "https://code-xl.onrender.com/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        }
      );
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
      <div 
        className="bg-black bg-opacity-50 backdrop-blur-sm absolute inset-0 animate-fadeIn"
        onClick={() => setFileshow(false)}
      />
      <div className="bg-zinc-900 p-8 rounded-lg shadow-xl z-10 flex flex-col items-center transform animate-slideUp">
        <div className="mb-6">
          <FileUploader
            handleChange={handleFileChange}
            name="file"
            types={["XLSX"]}
          />
        </div>
        {uploadProgress > 0 && (
          <div className="w-full mb-4 bg-zinc-800 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
        <div className="flex space-x-4">
          <button
            className={`bg-green-500 text-white py-2 px-6 rounded-lg transition-all duration-300 
              ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600 hover:scale-105'}`}
            onClick={() => {
              if (!selectedFile) {
                alert("Select or drop a file to continue!");
              } else FileUpload();
            }}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
          <button
            className="bg-zinc-700 text-white py-2 px-6 rounded-lg hover:bg-zinc-600 transition-all duration-300 hover:scale-105"
            onClick={() => {
              setFileshow(false);
              setSelectedFile(null);
            }}
          >
            Cancel
          </button>
        </div>
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
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://code-xl.onrender.com/api/sheets/${id}`);
      setReload(true);
      setDeleteConfirm(null);
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
          { params: { user_id: user_id } }
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
    <div className="overflow-auto w-full h-full bg-zinc-950">
      <div className="px-4 md:px-8 py-10 h-full w-full max-w-7xl mx-auto">
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Personalized Sheets
          </h1>
          <p className="text-lg text-zinc-400 font-heading leading-relaxed">
            Our Personalized Sheets feature revolutionizes study efficiency by
            allowing users to upload Excel or similar sheets. Automatically
            extracting and categorizing problems by topic, it seamlessly
            integrates with YouTube to provide relevant video links.
          </p>
        </div>

        <div className="mb-9 animate-slideUp">
          <h2 className="text-2xl font-bold text-white mb-4 font-heading">
            Sample Sheets
          </h2>
          <ul className="flex flex-wrap gap-4">
            {['Striver\'s SDE Sheet', 'Test Sheet'].map((name, index) => (
              <li key={index}>
                <a
                  href={index === 0 
                    ? "https://docs.google.com/spreadsheets/d/1SJYYWag2RNONf8BNW3W8z92nhJotSDm_/edit"
                    : "https://docs.google.com/spreadsheets/d/1jVwt5re-jxnMXvOz2s-CHNm5-Xp8YT6C/edit"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 px-4 py-2 rounded-lg text-green-400 border border-green-500/30 hover:border-green-500 transition-all duration-300 hover:scale-105 bg-zinc-900/50"
                >
                  <span>{name}</span>
                  <FaExternalLinkAlt className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8 animate-slideUp">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search sheets..."
              className="w-full px-12 py-3 bg-zinc-900 text-zinc-300 rounded-xl border border-zinc-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 placeholder:text-zinc-600"
            />
            <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" size={22} />
          </div>
        </div>

        {loading ? (
          <SheetSkeletonLoader />
        ) : !sheetshow ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            <div
              onClick={() => setFileshow(true)}
              className="group relative bg-zinc-900 p-6 rounded-xl aspect-video flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 border border-zinc-800 hover:border-green-500"
            >
              <FiPlus className="text-green-500 transition-all duration-300 group-hover:scale-110" size={80} />
              <span className="mt-4 text-zinc-400 group-hover:text-green-500 transition-colors">Add New Sheet</span>
            </div>

            {filteredSheets.map((sheet, index) => (
              <div
                key={index}
                className="group relative bg-zinc-900 p-6 rounded-xl aspect-video flex flex-col cursor-pointer transition-all duration-300 hover:scale-105 border border-zinc-800 hover:border-green-500"
              >
                <div 
                  onClick={() => {
                    setSelectedsheet(sheet);
                    setSheetshow(true);
                    setSheet_id(sheet._id);
                  }}
                  className="flex-1"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <FaCode className="text-green-500" size={32} />
                    <h3 className="text-xl font-semibold text-zinc-300 group-hover:text-green-500 transition-colors">
                      {sheet.name.substring(0, sheet.name.length - 5)}
                    </h3>
                  </div>
                  <div className="mt-auto flex items-center text-sm text-zinc-500 group-hover:text-green-500 transition-colors">
                    View all
                    <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteConfirm(sheet._id);
                  }}
                  className="absolute top-4 right-4 p-2 text-zinc-600 hover:text-red-500 transition-colors"
                >
                  <FiTrash size={20} />
                </button>
                {deleteConfirm === sheet._id && (
                  <div className="absolute inset-0 bg-zinc-900/95 flex items-center justify-center rounded-xl animate-fadeIn">
                    <div className="text-center">
                      <p className="text-zinc-300 mb-4">Are you sure you want to delete this sheet?</p>
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={() => handleDelete(sheet._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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