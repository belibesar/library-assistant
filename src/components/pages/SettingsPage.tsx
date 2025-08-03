"use client";

import { useState } from "react";
import { User, Book, Bell, Monitor, Settings } from "lucide-react";
import ProfileSettings from "../settings/tabs/ProfileSettings";
import SettingsHeader from "../settings/SettingsHeader";
import SettingsTab from "../settings/SettingsTab";
import BorrowingSettings from "../settings/tabs/BorrowingSettings";
import NotificationSettings from "../settings/tabs/NotificationSettings";
import SystemSettings from "../settings/tabs/SystemSettings";
import AppearanceSettings from "../settings/tabs/AppearanceSettings";


export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [userRole] = useState("admin");

  const tabs = [
    { id: "profile", name: "Profil", icon: <User className="h-4 w-4" /> },
    { id: "borrowing", name: "Peminjaman", icon: <Book className="h-4 w-4" /> },
    {
      id: "notifications",
      name: "Notifikasi",
      icon: <Bell className="h-4 w-4" />,
    },
    {
      id: "appearance",
      name: "Tampilan",
      icon: <Monitor className="h-4 w-4" />,
    },
    ...(userRole === "admin"
      ? [
          {
            id: "system",
            name: "Sistem",
            icon: <Settings className="h-4 w-4" />,
          },
        ]
      : []),
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "borrowing":
        return <BorrowingSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "appearance":
        return <AppearanceSettings />;
      case "system":
        return userRole === "admin" ? <SystemSettings /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 lg:px-8">
      <SettingsHeader
        title="Pengaturan Akun"
        description="Kelola informasi akun dan preferensi Anda"
      />

      <SettingsTab
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="mt-8">{renderTabContent()}</div>
    </div>
  );
}
