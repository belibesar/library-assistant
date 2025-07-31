import { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
  color: string;
  isPositive?: boolean;
}

export default function StatsCard({
  title,
  value,
  change,
  icon,
  color,
  isPositive = true,
}: StatsCardProps) {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${color}`}
        >
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span
          className={`flex items-center ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="mr-1 h-4 w-4" />
          ) : (
            <ArrowDownRight className="mr-1 h-4 w-4" />
          )}
          {change}
        </span>
        <span className="ml-2 text-gray-500">vs periode lalu</span>
      </div>
    </div>
  );
}
