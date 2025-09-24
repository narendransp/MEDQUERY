import { useState } from "react";
import axios from "axios";

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const backend = "http://localhost:8000"; // FastAPI backend

  const handleYouTubeSubmit = async () => {
    if (!youtubeUrl) return;
    setLoading(true);
    try {
      const res = await axios.post(`${backend}/youtube`, { url: youtubeUrl });
      setSummary(res.data.summary);
    } catch (err) {
      setSummary("⚠️ Error fetching YouTube summary.");
    }
    setLoading(false);
  };

  const handlePdfSubmit = async () => {
    if (!pdfFile) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", pdfFile);
      const res = await axios.post(`${backend}/pdf`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSummary(res.data.summary);
    } catch (err) {
      setSummary("⚠️ Error fetching PDF summary.");
    }
    setLoading(false);
  };

  return (
  <div className="w-screen min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 p-6">
  <div className="w-full">

        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-10">
          🤖 AI Summarizer Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* YouTube Summarizer Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">🎥 YouTube Summarizer</h2>
            <input
              type="text"
              placeholder="Enter YouTube URL"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="w-full border-2 text-red border-indigo-200 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none placeholder-red-500"
            />
            <button
              onClick={handleYouTubeSubmit}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200"
            >
              {loading ? "Summarizing..." : "Summarize YouTube"}
            </button>
          </div>

          {/* PDF Summarizer Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700">📄 PDF Summarizer</h2>
            <h3 className="text-l font-semibold mb-4 text-purple-700">Upload PDF File</h3>
            <input
              type="file"
              accept=".pdf"
              placeholder="upload PDF file"
              onChange={(e) => setPdfFile(e.target.files[0])}
              className="w-full border-2 border-purple-200 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-purple-400 focus:outline-none placeholder-red-500"
            />
            <button
              onClick={handlePdfSubmit}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200"
            >
              {loading ? "Summarizing..." : "Summarize PDF"}
            </button>
          </div>
        </div>

        {/* Summary Output */}
        {summary && (
          <div className="bg-white p-6 rounded-2xl shadow-lg transition duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">📝 Summary</h2>
            <p className="whitespace-pre-line text-gray-800">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
