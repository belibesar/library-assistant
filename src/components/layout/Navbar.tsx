"use client";
import { BookOpen } from "lucide-react";
import Button from "../Button";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  console.log("Navbar - User:", user);
  console.log("Navbar - isLoading:", isLoading);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="navbar bg-base-100 border-b border-gray-200">
        <div className="navbar-start">
          <div className="flex items-center px-7">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Perpustakaan USD
            </span>
          </div>
        </div>
        <div className="navbar-end">
          <div className="loading loading-spinner loading-sm"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 border-b border-gray-200">
      <div className="navbar-start">
        <div className="flex items-center px-7">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">
            Perpustakaan USD
          </span>
        </div>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-800">
              Hi, {user.name}
            </span>
            <Button
              buttonName="Logout"
              className="btn btn-soft btn-error"
              onClick={handleLogout}
            />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              buttonName="Masuk"
              className="btn btn-soft btn-info"
              onClick={handleLogin}
            />
            <Button
              buttonName="Register"
              className="btn btn-soft btn-success"
              onClick={handleRegister}
            />
          </div>
        )}
      </div>
    </div>
  );
}
