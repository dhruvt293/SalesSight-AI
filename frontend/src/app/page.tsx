"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, ArrowRight, Activity, TrendingUp } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file first.");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Upload failed");
      }

      // Upload successful, navigate to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred during upload.");
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black">
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]"></div>
      </div>

      <div className="text-center max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-medium mb-6">
          <Activity size={16} />
          <span>v1.0 Live</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
          SalesSight AI
        </h1>
        <p className="text-xl text-slate-400 font-light mb-8 max-w-2xl mx-auto">
          Upload your historical sales data and instantly generate dynamic forecasts and business insights.
        </p>
      </div>

      <div className="w-full max-w-xl glass-panel rounded-2xl p-8 transform transition-all hover:scale-[1.01] hover:shadow-blue-500/10">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <TrendingUp className="text-blue-400" />
          Start Forecasting
        </h2>
        
        <div className="border-2 border-dashed border-slate-600 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-slate-800/50 transition-colors group cursor-pointer relative">
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <UploadCloud size={48} className="text-slate-400 mb-4 group-hover:text-blue-400 transition-colors" />
          <p className="text-lg font-medium text-slate-200 mb-1">
            {file ? file.name : "Drag & drop your CSV file"}
          </p>
          <p className="text-sm text-slate-500">
            {file ? "File selected" : "or click to browse"}
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <button 
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-3 px-6 rounded-xl shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <>
              Generate Insights <ArrowRight size={18} />
            </>
          )}
        </button>
        
        <p className="text-xs text-slate-500 mt-4 text-center">
          Example format: <code className="bg-slate-800 px-1 rounded text-slate-400">Date,Sales</code> (e.g., 2023-01-01, 12000)
        </p>
      </div>

      <div className="absolute bottom-6 text-slate-500 text-sm font-medium tracking-wide">
        Made by Dhruv Tuli
      </div>
    </div>
  );
}
