"use client";
import { BookOpen, User, LogOut, Menu, X } from "lucide-react";
import Button from "../shared/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  console.log("Navbar - User:", user);
  console.log("Navbar - isLoading:", isLoading);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    router.push("/login");
    setIsMobileMenuOpen(false);
  };

  const handleRegister = () => {
    router.push("/register");
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
    setIsMobileMenuOpen(false);
  };

  if (isLoading) {
    return (
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-slate-200/60 bg-white/95 shadow-lg backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="group flex items-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-30 blur-lg transition-opacity duration-300 group-hover:opacity-50"></div>
                <div className="relative">
                    <img src="logo.png" alt="Logo Perpustakaan USD" className="h-12 w-auto max-h-14 align-middle" style={{objectFit: 'contain'}} />
                </div>
              </div>
              <div className="ml-4 flex flex-col">
                <div className="flex items-center">
                  <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-2xl font-black text-transparent">
                    Perpustakaan
                  </span>
                  <span className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-black text-transparent">
                    USD
                  </span>
                </div>
                <span
                  className={`text-sm mt-1 text-black`}
                >
                  NPP 3404072D2020617
                </span>
              </div>
            </div>

            {/* Loading Spinner */}
            <div className="flex items-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200/60 bg-white/95 shadow-lg backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <div className="flex h-20 items-center justify-between">
    {/* Logo dan Judul */}
    <div
      className="group flex cursor-pointer items-center"
      onClick={() => router.push("/")}
    >
      <div className="relative">
      <img src="logo.png" alt="Logo Perpustakaan USD" className="h-12 w-auto max-h-14 align-middle" style={{objectFit: 'contain'}} />
      </div>
      <div className="ml-4 flex items-center">
        <div className="flex flex-col">
          <div className="flex items-center">
            <span
              className={`bg-clip-text text-2xl font-black transition-all duration-300 group-hover:from-slate-900 group-hover:to-slate-700 ${isScrolled ? 'bg-gradient-to-r from-slate-800 to-slate-600 text-transparent' : 'text-white'}`}
            >
              Perpustakaan
            </span>
            <span className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-black text-transparent transition-all duration-300 group-hover:from-blue-700 group-hover:to-indigo-700">
              USD
            </span>
          </div>
          <span
            className={`text-sm mt-1 ${isScrolled ? 'text-black' : 'text-white'}`}
          >
            NPP 3404072D2020617
          </span>
        </div>
      </div>
    </div>

    <div className="hidden items-center space-x-6 md:flex">
      {user ? (
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 rounded-full border border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50 px-4 py-2 shadow-sm">
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-400"></div>
            </div>
            <span className="bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-sm font-semibold text-transparent">
              Hi, {user.name}
            </span>
          </div>
          <div className="group relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-200 to-pink-200 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100"></div>
            <button
              onClick={handleLogout}
              className="relative flex items-center space-x-2 rounded-full border border-red-200 bg-white px-6 py-3 font-semibold text-red-600 shadow-sm transition-all duration-300 group-hover:border-red-300 hover:bg-red-50 hover:text-red-700 hover:shadow-md"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogin}
            className="rounded-full border border-slate-200 bg-white/80 px-6 py-3 font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-slate-300 hover:bg-white hover:text-slate-900 hover:shadow-md"
          >
            Masuk
          </button>

          {/* Tombol Daftar */}
          <div className="group relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-200 to-indigo-200 opacity-75 blur transition-opacity duration-300 group-hover:opacity-100"></div>
            <button
              onClick={handleRegister}
              className="relative transform rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      )}
    </div>

    <div className="md:hidden">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="rounded-full border border-slate-200 bg-white/80 p-3 shadow-sm transition-all duration-300 hover:shadow-md"
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5 text-slate-700" />
        ) : (
          <Menu className="h-5 w-5 text-slate-700" />
        )}
      </button>
    </div>
  </div>
</div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full right-0 left-0 border-b border-slate-200/60 bg-white/95 shadow-lg backdrop-blur-xl md:hidden">
          <div className="space-y-4 px-4 py-6">
            {user ? (
              <div className="space-y-4">
                {/* User Profile Mobile */}
                <div className="flex items-center space-x-3 rounded-2xl border border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50 p-4">
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-400"></div>
                  </div>
                  <span className="font-semibold text-slate-700">
                    Hi, {user.name}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center space-x-2 rounded-xl border border-red-200 bg-red-50 py-3 font-semibold text-red-600 transition-all duration-300 hover:bg-red-100 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleLogin}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:text-slate-900 hover:shadow-md"
                >
                  Masuk
                </button>
                <button
                  onClick={handleRegister}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
                >
                  Daftar Sekarang
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
