"use client";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: string;
  color?: "violet" | "coral" | "honey" | "green";
}

const colorMap = {
  violet: "bg-violet-50 text-violet",
  coral: "bg-coral-100 text-coral",
  honey: "bg-amber-50 text-amber-600",
  green: "bg-green-50 text-green-600",
};

export default function StatsCard({ title, value, change, changeType, icon, color = "violet" }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-secondary font-medium">{title}</p>
          <p className="text-2xl font-bold text-surface-text mt-1 font-manrope">{value}</p>
          {change && (
            <p className={`text-sm mt-2 font-medium ${changeType === "up" ? "text-green-600" : changeType === "down" ? "text-red-500" : "text-slate-secondary"}`}>
              {changeType === "up" ? "↑" : changeType === "down" ? "↓" : ""} {change}
            </p>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
          </svg>
        </div>
      </div>
    </div>
  );
}
