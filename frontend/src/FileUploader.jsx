import React, { useRef } from "react";

const FileUploader = ({ setSummaryData, setLoading }) => {
  const fileInputRef = useRef();

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setSummaryData(data.summary);
    } catch (error) {
      console.error("Upload failed:", error);
      setSummaryData("⚠️ Error: Could not process the meeting file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <input
        type="file"
        accept="audio/*,video/*"
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:scale-105 transition-transform"
      >
        Upload Meeting File
      </button>
    </div>
  );
};

export default FileUploader;
