import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatsCard = ({ title, value, icon: Icon, trend, color }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-full bg-${color}-100 flex items-center justify-center`}
        >
          <Icon className={`w-6 h-6 text-${color}-500`} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-1 text-sm">
          {trend > 0 ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={trend > 0 ? "text-green-500" : "text-red-500"}>
            {Math.abs(trend)}%
          </span>
          <span className="text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
