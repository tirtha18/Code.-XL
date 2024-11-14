import React, { useState } from "react";
import { FaEdit, FaTimes, FaSpinner, FaCamera } from "react-icons/fa";
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
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-zinc-950 border border-zinc-800/50 rounded-2xl shadow-2xl text-zinc-300 flex flex-col items-center w-96 p-8 animate-slideUp">
        {/* Decorative Elements */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none" />
        <div className="absolute -inset-[1px] bg-gradient-to-b  rounded-2xl blur-sm pointer-events-none " />

        {/* Close Button */}
        <button
          onClick={closeCard}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-red-500 transition-all duration-300 hover:rotate-90 transform"
          aria-label="Close"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          Upload Avatar
        </h2>

        {/* Avatar Preview */}
        <div className="relative w-40 h-40 mx-auto mb-6 group">
          {preview ? (
            <img
              src={preview}
              alt="Avatar Preview"
              className="w-full h-full rounded-full object-cover border-4 border-green-500/30 shadow-lg shadow-green-500/20 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-zinc-800/50 flex flex-col items-center justify-center border-4 border-zinc-700/30 transition-all duration-300 group-hover:border-green-500/30">
              <FaCamera className="text-3xl text-zinc-600 mb-2" />
              <span className="text-zinc-500 text-sm">No Avatar</span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full flex items-center justify-center backdrop-blur-sm">
            <label
              htmlFor="avatar-upload"
              className="text-white flex flex-col items-center gap-2 cursor-pointer transform transition-transform duration-300 hover:scale-110"
            >
              <FaEdit className="text-2xl text-green-400" />
              <span className="text-sm font-medium">Change Avatar</span>
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

        {/* File Name */}
        {selectedFile && (
          <div className="mt-2 px-4 py-2 bg-zinc-800/50 rounded-lg text-sm text-zinc-400 max-w-[250px] truncate">
            {selectedFile.name}
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={isLoading}
          className={`mt-6 px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed
            ${
              isLoading
                ? "bg-zinc-700 text-zinc-400"
                : "bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700"
            }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <FaSpinner className="animate-spin" />
              <span>Uploading...</span>
            </div>
          ) : (
            "Upload Avatar"
          )}
        </button>

        {/* Status Message */}
        {uploadStatus && (
          <div
            className={`mt-4 px-4 py-2 rounded-lg text-sm ${
              uploadStatus.includes("failed")
                ? "bg-red-500/10 text-red-400"
                : "bg-green-500/10 text-green-400"
            }`}
          >
            {uploadStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default OverlayAvatarUploadCard;