'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Hamburger menu for mobile */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button className="btn btn-ghost btn-circle" onClick={toggleSidebar} aria-label="Open sidebar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}