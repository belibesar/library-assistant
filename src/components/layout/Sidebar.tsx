"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  BookOpen,
  FileCheck,
  Search,
  Settings,
  BarChart2,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarProps } from "@/libs/types";

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user, logout, role } = useAuth();
  const [activeItem, setActiveItem] = useState("Obrolan"); // State untuk menu aktif

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleMenuClick = (menuName: string) => {
    setActiveItem(menuName);
  };

  return (
    <>
      {isOpen && (
        <div
          className="bg-grey fixed inset-0 z-40 opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-base-100 z-50 flex h-screen w-64 flex-col border border-gray-200 p-4 transition-transform duration-300 ease-in-out lg:relative lg:h-full lg:flex-shrink-0 lg:translate-x-0`}
      >
        <div className="mb-8 flex items-center justify-between lg:justify-start">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <BookOpen size={30} color="#113FF7" />
            <h1 className="text-xl font-semibold">Perpustakaan USD</h1>
          </div>
          <button
            className="btn btn-ghost lg:hidden"
            aria-label="Toggle menu"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="menu text-base-content w-full flex-grow p-0">
          <ul>
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-800 active:text-white"
              >
                <MessageSquare size={20} color="#111d22" />
                Obrolan
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/books"
                className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-800 active:text-white"
              >
                <BookOpen size={20} color="#111d22" />
                Jelajahi Koleksi
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/plagiarism"
                className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-800 active:text-white"
              >
                <FileCheck size={20} color="#111d22" />
                Cek Plagiat
              </Link>
            </li>
            {/* role implementation on analysis and pengaturan */}
            {role === "admin" && (
              <>
                <li>
                  <Link
                    href="/dashboard/analytics"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-800 active:text-white"
                  >
                    <BarChart2 size={20} color="#111d22" />
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-800 active:text-white"
                  >
                    <Settings size={20} color="#111d22" />
                    Pengaturan
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        {/* ubah hr jadi full dan grey 200 */}
        <hr className="-mx-4 my-4 border-t border-gray-300" />
        {/* hr ini ya */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <div>
            <div className="text-sm">{user?.email || "Guest"}</div>
            <div className="text-sm">{user?.name || "Unknown User"}</div>
          </div>
          <button
            className="btn btn-ghost btn-circle"
            aria-label="Logout"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H9"
              />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
