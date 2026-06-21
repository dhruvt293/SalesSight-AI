"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import KPIGrid from "@/components/KPIGrid";
import SalesChart from "@/components/SalesChart";
import AIInsights from "@/components/AIInsights";
import { Download, Sparkles, CalendarDays } from "lucide-react";

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [insights, setInsights] = useState<any>(null);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [forecastMonths, setForecastMonths] = useState(6);
  const [error, setError] = useState("");

  const fetchMetrics = async () => {
    try {
      const res = await axios.get("http://localhost:8000/metrics");
      setMetrics(res.data.kpis);
      setChartData(res.data.chart_data);
      setLoadingMetrics(false);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load metrics");
      setLoadingMetrics(false);
    }
  };

  const generateForecast = async () => {
    setLoadingForecast(true);
    try {
      const res = await axios.post("http://localhost:8000/forecast", {
        months: forecastMonths
      });
      // Merge forecast data with existing chart data
      setChartData((prev) => {
        // Remove old forecasts if generating a new one
        const historical = prev.filter(d => d.sales !== null);
        return [...historical, ...res.data.forecast];
      });
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to generate forecast");
    } finally {
      setLoadingForecast(false);
    }
  };

  const generateInsights = async () => {
    if (!metrics) return;
    setLoadingInsights(true);
    try {
      const res = await axios.post("http://localhost:8000/insights", {
        metrics: metrics
      });
      setInsights(res.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to generate insights");
    } finally {
      setLoadingInsights(false);
    }
  };

  const downloadReport = async () => {
    try {
      const response = await axios.get("http://localhost:8000/report", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "SalesSight_Report.pdf");
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) link.parentNode.removeChild(link);
    } catch (error) {
      setError("Failed to download report");
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (loadingMetrics) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 lg:p-10 pb-20 relative">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Executive Dashboard</h1>
            <p className="text-slate-400 mt-1">Review your business metrics and AI-driven forecasts</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={downloadReport}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-slate-700 flex items-center gap-2"
            >
              <Download size={18} /> Export Report
            </button>
            <button 
              onClick={generateInsights}
              disabled={loadingInsights}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 disabled:opacity-50"
            >
              <Sparkles size={18} /> {insights ? "Refresh Insights" : "Generate Insights"}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            {error}
          </div>
        )}

        {/* KPI Grid */}
        <KPIGrid metrics={metrics} />

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart data={chartData} />
          </div>
          
          <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Forecasting Setup</h3>
              <p className="text-sm text-slate-400 mb-6">Run Prophet model to predict future revenue based on historical trends.</p>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-300">Forecast Horizon</label>
                <div className="relative">
                  <select 
                    value={forecastMonths}
                    onChange={(e) => setForecastMonths(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value={3}>Next 3 Months</option>
                    <option value={6}>Next 6 Months</option>
                    <option value={12}>Next 12 Months</option>
                  </select>
                  <CalendarDays className="absolute right-4 top-3.5 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            <button 
              onClick={generateForecast}
              disabled={loadingForecast}
              className="w-full mt-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors border border-slate-600 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loadingForecast ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : "Run Prediction"}
            </button>
          </div>
        </div>

        {/* Insights Section */}
        {(insights || loadingInsights) && (
          <AIInsights insights={insights} loading={loadingInsights} />
        )}

      </div>
    </div>
  );
}
