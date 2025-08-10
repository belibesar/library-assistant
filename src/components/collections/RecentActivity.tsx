import { LibraryItemType } from "@/libs/types/libraryType";
import { Calendar, BookOpen, FileText, GraduationCap } from "lucide-react";

interface Activity {
  type: LibraryItemType;
  title: string;
  time: string;
}

interface RecentActivityProps {
  recentActivity: Activity[];
}

export const RecentActivity = ({ recentActivity }: RecentActivityProps) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
      <Calendar className="h-5 w-5 text-gray-400" />
    </div>
    <div className="space-y-3">
      {recentActivity.map((activity, index) => (
        <div
          key={index}
          className="flex items-start space-x-3 rounded-lg bg-gray-50 p-3"
        >
          <div
            className={`rounded-full p-2 ${
              activity.type === "book"
                ? "bg-blue-100"
                : activity.type === "journal"
                  ? "bg-purple-100"
                  : "bg-orange-100"
            }`}
          >
            {activity.type === "book" ? (
              <BookOpen className="h-4 w-4 text-blue-600" />
            ) : activity.type === "journal" ? (
              <FileText className="h-4 w-4 text-purple-600" />
            ) : (
              <GraduationCap className="h-4 w-4 text-orange-600" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {activity.title}
            </p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
