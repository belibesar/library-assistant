'use client';

import React, { useState } from 'react';
import { MessageSquare, BookOpen, FileCheck, Search, Settings } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [activeItem, setActiveItem] = useState('Obrolan'); // State untuk menu aktif

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleMenuClick = (menuName: string) => {
    setActiveItem(menuName);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-grey opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out
                   w-64 bg-base-100 border border-gray-200 flex flex-col p-4 z-50 lg:relative lg:flex-shrink-0 h-screen lg:h-full`}
      >
        <div className="flex items-center justify-between lg:justify-start mb-8">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="menu p-0 text-base-content w-full flex-grow">
          <ul>
            <li>
              <Link href="#" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-800 active:text-white transition-colors duration-200 rounded-lg">
                <MessageSquare size={20} color="#111d22" />
                Obrolan
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-800 active:text-white transition-colors duration-200 rounded-lg">
                <BookOpen size={20} color="#111d22" />
                Jelajahi Koleksi
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-800 active:text-white transition-colors duration-200 rounded-lg">
                <FileCheck size={20} color="#111d22" />
                Cek Plagiat
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-800 active:text-white transition-colors duration-200 rounded-lg">
                <Search size={20} color="#111d22" />
                Pencarian
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-800 active:text-white transition-colors duration-200 rounded-lg">
                <Settings size={20} color="#111d22" />
                Pengaturan
              </Link>
            </li>
          </ul>
        </nav>
        {/* ubah hr jadi full dan grey 200 */}
        <hr className="my-4 -mx-4 border-t border-gray-300" />
        {/* hr ini ya */}
        <div className="pt-4 mt-auto flex justify-between items-center">
          <div>
            {/* <div className="text-sm text-neutral-content opacity-70">Mahasiswa</div>
            <div className="font-semibold text-neutral-content">Student</div> */}
            <div className="text-sm">
              {user?.email || 'Guest'}
            </div>
            <div className="text-sm">
              {user?.name || 'Unknown User'}
            </div>
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
              className="w-6 h-6"
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