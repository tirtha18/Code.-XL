import React, { useState } from "react";
import { FaEdit, FaTimes, FaSpinner } from "react-icons/fa";
import axios from "axios";

const OverlayAvatarUploadCard = ({
  isVisible,
  setIsVisible,
  getUser,
  user_id,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    console.log(user_id);
    if (selectedFile && user_id) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("avatar", selectedFile);
      formData.append("user_id", user_id);
      try {
        const response = await axios.post(
          "https://code-xl.onrender.com/api/uploadAvatar",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        setUploadStatus("Upload successful!");
        setSelectedFile(null);
        setPreview(null);
        getUser();
      } catch (error) {
        console.error("Upload error:", error);
        setUploadStatus("Upload failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setUploadStatus("Please select a file to upload.");
    }
  };

  const closeCard = () => {
    setIsVisible(false);
    setUploadStatus("");
    setSelectedFile(null);
    setPreview(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-zinc-800 border-zinc-600 border rounded-lg shadow-lg text-zinc-300 flex flex-col items-center w-72 p-12">
        <button
          onClick={closeCard}
          className="absolute top-2 right-2 p-1 text-zinc-400 hover:text-red-500"
          aria-label="Close"
        >
          <FaTimes className="text-xl" />
        </button>

        <div className="relative w-32 h-32 mx-auto mt-4 mb-1">
          {preview ? (
            <img
              src={preview}
              alt="Avatar Preview"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Avatar</span>
            </div>
          )}

          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center">
            <label
              htmlFor="avatar-upload"
              className="text-white flex items-center gap-2 cursor-pointer translate-x-[15%]"
            >
              <FaEdit className="text-lg" />
              <span>Change Avatar</span>
            </label>
          </div>
        </div>

        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {selectedFile && (
          <p className="mt-4 text-center text-sm text-gray-500">
            {selectedFile.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={isLoading}
          className={`mt-4 ${
            isLoading ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
          } text-white px-4 py-2 rounded transition duration-200 flex items-center justify-center`}
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Uploading...
            </>
          ) : (
            "Upload"
          )}
        </button>

        {uploadStatus && (
          <p
            className={`mt-2 text-center text-sm ${
              uploadStatus.includes("failed")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default OverlayAvatarUploadCard;