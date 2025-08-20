"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  BookOpen,
  FileCheck,
  Search,
  Settings,
  BarChart2,
  Users,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarProps } from "@/libs/types";

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user, logout, role } = useAuth();
  const [activeItem, setActiveItem] = useState("Obrolan");

  const handleLogout = () => {
    logout();
    window.location.href = "/";
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
          {/* Header and Logo Sidebar */}
          <div className="flex items-center gap-2">
            {/* Logo SadharLib on Sidebar */}
            {/* status: nonaktif */}
            {/* <div className="relative">
              <img
                src="logo.png"
                alt="Logo Perpustakaan USD"
                className="h-12 max-h-14 w-auto align-middle"
                style={{ objectFit: "contain" }}
              />
            </div> */}
            {/* Text "SadharLIB on Sidebar" */}
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-2xl font-black text-transparent transition-all duration-300 group-hover:from-slate-900 group-hover:to-slate-700">
                  Sadhar<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-black text-transparent transition-all duration-300 group-hover:from-blue-700 group-hover:to-indigo-700">Lib</span>
                </span>
                {/* <span className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-black text-transparent transition-all duration-300 group-hover:from-blue-700 group-hover:to-indigo-700">
                  Lib
                </span> */}
              </div>
              <p className="mt-1 text-sm font-semibold text-gray-500">
                NPP 3404072D2020617
              </p>
            </div>
          </div>
          <button className="btn btn-ghost lg:hidden" onClick={toggleSidebar}>
            <svg
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

        <nav className="menu text-base-content w-full flex-grow">
          <ul className="space-y-1">
            {/* === Bagian Umum === */}
            {/* <li className="px-3 py-1 text-sm font-semibold text-gray-500 uppercase">
              Umum
            </li> */}
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-200"
              >
                <MessageSquare size={20} />
                Obrolan
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/books"
                className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-200"
              >
                <BookOpen size={20} />
                Jelajahi Koleksi
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/plagiarism"
                className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-200"
              >
                <FileCheck size={20} />
                Cek Plagiat
              </Link>
            </li>

            {/* === Bagian Admin === */}
            {role === "admin" && (
              <>
                {/* <li className="mt-4 px-3 py-1 text-sm font-semibold text-gray-500 uppercase">
                  Kontrol Admin
                </li> */}
                <li>
                  <Link
                    href="/dashboard/admin/collections"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-200"
                  >
                    <Layers size={20} />
                    Manajemen Koleksi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/admin/users"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-200"
                  >
                    <Users size={20} />
                    Manajemen Pengguna
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/admin/analytics"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-200"
                  >
                    <BarChart2 size={20} />
                    Statistik & Analisis
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/admin/settings"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-200"
                  >
                    <Settings size={20} />
                    Pengaturan
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <hr className="-mx-4 my-4 border-t border-gray-300" />

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
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
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
