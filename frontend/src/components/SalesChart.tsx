"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Area
} from "recharts";

interface SalesChartProps {
  data: any[];
}

export default function SalesChart({ data }: SalesChartProps) {
  if (!data || data.length === 0) return null;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl shadow-xl">
          <p className="text-slate-300 font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-400 capitalize">
                {entry.name.replace("_", " ")}:
              </span>
              <span className="text-white font-bold">
                ₹{entry.value ? entry.value.toLocaleString(undefined, { maximumFractionDigits: 0 }) : "0"}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel rounded-2xl p-6 h-[400px] w-full">
      <h3 className="text-xl font-semibold text-white mb-6">Revenue Trend & Forecast</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#94a3b8" 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickMargin={10}
            minTickGap={30}
          />
          <YAxis 
            stroke="#94a3b8" 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "20px" }}/>
          
          <Area 
            type="monotone" 
            dataKey="sales" 
            name="Historical Sales"
            stroke="#3b82f6" 
            fillOpacity={1} 
            fill="url(#colorSales)" 
            strokeWidth={3}
            connectNulls
          />
          <Line 
            type="monotone" 
            dataKey="moving_average" 
            name="Moving Avg (3-mo)"
            stroke="#10b981" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            connectNulls
          />
          <Area 
            type="monotone" 
            dataKey="forecast" 
            name="AI Forecast"
            stroke="#8b5cf6" 
            fillOpacity={1} 
            fill="url(#colorForecast)" 
            strokeWidth={3}
            strokeDasharray="3 3"
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
