import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RevenueChart = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Revenue Overview
          </h3>
          <p className="text-sm text-gray-500">Daily sales performance</p>
        </div>
        <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff4b2b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ff4b2b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#ff4b2b"
            strokeWidth={2}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
