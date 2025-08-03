import { BarChart2, HelpCircle } from "lucide-react";

interface AnalyticsHeaderProps {
  title: string;
  description: string;
}

export default function AnalyticsHeader({ 
  title, 
  description 
}: AnalyticsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BarChart2 className="h-6 w-6 text-blue-600" />
          {title}
        </h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
      <div className="mt-4 md:mt-0">
        <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
          <HelpCircle className="h-4 w-4" />
          Bantuan Analitik
        </button>
      </div>
    </div>
  );
}