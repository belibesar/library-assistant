import { BookOpen } from "lucide-react";
import Button from "./Button";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="flex items-center px-7">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">
            Perpustakaan USD
          </span>
        </div>
      </div>

      <div className="navbar-end">
        <Button buttonName="Masuk" className="btn btn-soft btn-info" />
      </div>
    </div>
  );
}
