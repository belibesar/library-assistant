"use client";

import { Clock, BookOpen, User, Newspaper, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale"; // Indonesian locale

interface ActivityItem {
  id: string;
  type: "book" | "journal" | "thesis" | "user";
  title: string;
  action: "view" | "borrow" | "return" | "login";
  timestamp: Date;
  user?: string;
}

export default function RecentActivity() {
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "book",
      title: "Pemrograman JavaScript Modern",
      action: "borrow",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      user: "Ahmad Fauzi",
    },
    {
      id: "2",
      type: "journal",
      title: "Jurnal Teknologi Pendidikan Vol. 12",
      action: "view",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      user: "Siti Rahayu",
    },
    {
      id: "3",
      type: "thesis",
      title: "Analisis Sentimen Media Sosial",
      action: "view",
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    },
    {
      id: "4",
      type: "user",
      title: "Admin Login",
      action: "login",
      timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    },
    {
      id: "5",
      type: "book",
      title: "Sistem Basis Data",
      action: "return",
      timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
      user: "Budi Santoso",
    },
  ];

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "book":
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case "journal":
        return <Newspaper className="h-4 w-4 text-purple-500" />;
      case "thesis":
        return <FileText className="h-4 w-4 text-orange-500" />;
      case "user":
        return <User className="h-4 w-4 text-green-500" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getActionText = (action: ActivityItem["action"]) => {
    switch (action) {
      case "view":
        return "melihat";
      case "borrow":
        return "meminjam";
      case "return":
        return "mengembalikan";
      case "login":
        return "login ke sistem";
      default:
        return "berinteraksi dengan";
    }
  };

  const getActivityType = (type: ActivityItem["type"]) => {
    switch (type) {
      case "book":
        return "buku";
      case "journal":
        return "jurnal";
      case "thesis":
        return "skripsi";
      case "user":
        return "sistem";
      default:
        return "item";
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div className="mt-1 flex-shrink-0">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1">
            <p className="text-sm">
              {activity.user ? (
                <span className="font-medium text-gray-900">
                  {activity.user}
                </span>
              ) : (
                <span className="font-medium text-gray-900">Pengguna</span>
              )}{" "}
              {getActionText(activity.action)}{" "}
              <span className="font-medium text-gray-900">
                {activity.type !== "user" ? activity.title : ""}
              </span>{" "}
              {activity.type !== "user" && getActivityType(activity.type)}
            </p>
            <div className="mt-1 flex items-center text-xs text-gray-500">
              <Clock className="mr-1 h-3 w-3" />
              {formatDistanceToNow(activity.timestamp, {
                addSuffix: true,
                locale: id, // Indonesian locale
              })}
            </div>
          </div>
        </div>
      ))}
      <div className="border-t border-gray-100 pt-2">
        <button className="text-sm text-blue-600 hover:text-blue-800">
          Lihat Semua Aktivitas →
        </button>
      </div>
    </div>
  );
}
