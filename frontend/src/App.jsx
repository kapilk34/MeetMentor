import React, { useState } from "react";
import FileUploader from "./FileUploader";

function App() {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);

  const downloadSummary = () => {
    const element = document.createElement("a");
    const file = new Blob([summaryData], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "meeting-summary.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-gray-800/30 backdrop-blur-xl border-b border-gray-700/50 shadow-lg w-full py-4 px-6 flex justify-between items-center z-50">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-purple-300 bg-clip-text text-transparent">
            MeetMentor
          </h1>
          <p className="text-sm text-gray-400">AI Meeting Summary Generator</p>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="flex flex-col xl:flex-row gap-8 w-full h-full max-w-[2000px] mx-auto">
          {/* Upload Section */}
          <div className="xl:w-2/5 2xl:w-1/3">
            <div className="bg-gray-800/20 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 h-fit">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Upload Meeting Recording
              </h2>
              <FileUploader setSummaryData={setSummaryData} setLoading={setLoading} />

              {loading && (
                <div className="mt-8 text-center animate-pulse">
                  <p className="text-gray-300 text-lg">
                    Processing your meeting with AI...
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Summary Section */}
          <div className="xl:w-3/5 2xl:w-2/3">
            {summaryData ? (
              <div className="bg-gray-800/20 rounded-3xl border border-gray-700/50 p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-blue-300 mb-4">
                  Meeting Summary
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                  {summaryData}
                </p>
                <button
                  onClick={downloadSummary}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-medium"
                >
                  📥 Download Summary
                </button>
              </div>
            ) : (
              !loading && (
                <div className="flex flex-col items-center justify-center h-full text-center border-2 border-dashed border-gray-600 rounded-3xl p-16 bg-gray-800/10">
                  <span className="text-5xl mb-6 opacity-70">📄</span>
                  <h3 className="text-3xl font-bold mb-4 text-gray-300">
                    Ready for Analysis
                  </h3>
                  <p className="text-gray-500 text-lg max-w-xl mx-auto">
                    Upload your meeting file to generate an AI-powered summary instantly.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/10 text-center border-t border-gray-700/50 py-4 text-gray-500 text-sm">
        © 2025 MeetMentor • Powered by Gemini AI ✨
      </footer>
    </div>
  );
}

export default App;
