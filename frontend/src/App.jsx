import React, { useState, useEffect } from "react";
import FileUploader from "./FileUploader";
import { 
  Download, 
  Clock, 
  Users, 
  FileText, 
  Sparkles, 
  ChevronRight,
  PlayCircle,
  Calendar,
  CheckCircle2,
  BarChart3
} from "lucide-react";

function App() {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    meetingDuration: "45 minutes",
    participants: 8,
    keyPoints: 12,
    sentiment: "Positive"
  });
  const [activeTab, setActiveTab] = useState("summary");
  const [isHovering, setIsHovering] = useState(false);

  const downloadSummary = () => {
    const element = document.createElement("a");
    const file = new Blob([summaryData], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `meeting-summary-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const sampleSummary = summaryData || "No meeting analyzed yet. Upload a recording to see the AI-powered summary here.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl w-full py-5 px-8 flex justify-between items-center z-50">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                MeetMentor AI
              </h1>
              <p className="text-xs text-gray-400">Intelligent Meeting Analysis Platform</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <Calendar className="w-4 h-4" />
              <span>History</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </button>
          </div>
          <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm">AI Ready</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative px-4 md:px-8 py-8 max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-blue-400" />
              <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">Duration</span>
            </div>
            <h3 className="text-2xl font-bold">{stats.meetingDuration}</h3>
            <p className="text-gray-400 text-sm mt-2">Total meeting time</p>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-purple-400" />
              <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">People</span>
            </div>
            <h3 className="text-2xl font-bold">{stats.participants}</h3>
            <p className="text-gray-400 text-sm mt-2">Total participants</p>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 hover:border-green-500/50 transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-green-400" />
              <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">Points</span>
            </div>
            <h3 className="text-2xl font-bold">{stats.keyPoints}</h3>
            <p className="text-gray-400 text-sm mt-2">Key points identified</p>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 hover:border-pink-500/50 transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full">Sentiment</span>
            </div>
            <h3 className="text-2xl font-bold">{stats.sentiment}</h3>
            <p className="text-gray-400 text-sm mt-2">Overall meeting tone</p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Upload Section */}
          <div className="xl:w-2/5">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-xl rounded-3xl border border-gray-800/50 p-8 shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 h-fit sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                    <PlayCircle className="w-6 h-6" />
                  </div>
                  Upload Recording
                </h2>
                <div className="text-xs px-3 py-1 bg-gray-800/50 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  AI Active
                </div>
              </div>
              
              <FileUploader setSummaryData={setSummaryData} setLoading={setLoading} />
              
              <div className="mt-8 pt-8 border-t border-gray-800/50">
                <h3 className="font-semibold mb-4 text-gray-300">Supported Formats</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['MP4', 'MP3', 'WAV', 'MOV', 'AVI', 'M4A'].map((format) => (
                    <div key={format} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      {format}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Section */}
          <div className="xl:w-3/5">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-xl rounded-3xl border border-gray-800/50 shadow-2xl overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-800/50">
                {['summary', 'action-items', 'transcript', 'insights'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-medium transition-all duration-300 ${
                      activeTab === tab 
                        ? 'text-white border-b-2 border-blue-500 bg-blue-500/10' 
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/30'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {tab === 'summary' && <FileText className="w-4 h-4" />}
                      {tab === 'action-items' && <CheckCircle2 className="w-4 h-4" />}
                      {tab === 'transcript' && <FileText className="w-4 h-4" />}
                      {tab === 'insights' && <BarChart3 className="w-4 h-4" />}
                      {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                    </div>
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="p-8">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="relative">
                      <div className="w-24 h-24 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
                      </div>
                    </div>
                    <div className="mt-8 text-center">
                      <h3 className="text-xl font-semibold mb-2">Processing Meeting</h3>
                      <p className="text-gray-400">AI is analyzing audio, transcribing, and generating insights...</p>
                      <div className="mt-4 w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ) : summaryData ? (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          Meeting Summary
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                          Generated {new Date().toLocaleDateString()} • AI Confidence: 98%
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={downloadSummary}
                          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300">
                          Share
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 rounded-2xl border border-gray-800/50 p-6 mb-6">
                      <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                        {sampleSummary}
                      </p>
                    </div>

                    {/* Additional Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-900/40 rounded-xl p-5 border border-gray-800/30">
                        <h4 className="font-semibold mb-3 text-gray-300 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          Action Items
                        </h4>
                        <ul className="space-y-2">
                          {["Follow up with marketing team by Friday", "Prepare Q3 budget review", "Update project documentation"].map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-400">
                              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gray-900/40 rounded-xl p-5 border border-gray-800/30">
                        <h4 className="font-semibold mb-3 text-gray-300 flex items-center gap-2">
                          <Users className="w-4 h-4 text-purple-500" />
                          Key Participants
                        </h4>
                        <div className="space-y-3">
                          {["Sarah Johnson (Product Lead)", "Mike Chen (Engineering)", "Alex Rivera (Marketing)"].map((person, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-gray-400">{person}</span>
                              <span className="text-xs px-2 py-1 bg-gray-800/50 rounded-full">
                                {index === 0 ? "25 min" : index === 1 ? "18 min" : "12 min"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="relative mb-8"
                         onMouseEnter={() => setIsHovering(true)}
                         onMouseLeave={() => setIsHovering(false)}>
                      <div className={`w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center transition-all duration-500 ${isHovering ? 'scale-110' : ''}`}>
                        <FileText className="w-16 h-16 text-gray-500" />
                      </div>
                      {isHovering && (
                        <div className="absolute -top-2 -right-2 animate-bounce">
                          <Sparkles className="w-8 h-8 text-yellow-400" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-gray-300">
                      Ready for Analysis
                    </h3>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
                      Upload your meeting recording to unlock AI-powered insights, 
                      action items, and comprehensive summaries.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Real-time transcription
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Sentiment analysis
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Action items
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-12 bg-gray-900/50 backdrop-blur-xl border-t border-gray-800/50 py-6 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">MeetMentor AI</h3>
              <p className="text-gray-500 text-sm">Intelligent meeting analysis powered by AI</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <span>© 2024 MeetMentor AI</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Powered by Gemini AI ✨
            </span>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;