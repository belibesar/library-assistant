import { LibraryItemType } from "@/libs/types/libraryType";
import { BookOpen, FileText, GraduationCap, BarChart3 } from "lucide-react";

interface CategorySelectorProps {
  selectedViewMode: "overview" | LibraryItemType;
  onSelect: (category: "overview" | LibraryItemType) => void;
  stats: {
    totalBooks: number;
    totalJournals: number;
    totalThesis: number;
  };
}

export const CategorySelector = ({
  selectedViewMode,
  onSelect,
  stats,
}: CategorySelectorProps) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <h3 className="mb-4 text-lg font-semibold text-gray-900">Kelola Koleksi</h3>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <button
        onClick={() => onSelect("overview")}
        className={`rounded-lg border-2 p-4 transition-all ${
          selectedViewMode === "overview"
            ? "border-blue-500 bg-blue-50 text-blue-700"
            : "border-gray-200 text-gray-700 hover:border-gray-300"
        }`}
      >
        <BarChart3 className="mx-auto mb-2 h-5 w-5" />
        <span className="text-sm font-medium">Overview</span>
      </button>

      <button
        onClick={() => onSelect("book")}
        className={`rounded-lg border-2 p-4 transition-all ${
          selectedViewMode === "book"
            ? "border-blue-500 bg-blue-50 text-blue-700"
            : "border-gray-200 text-gray-700 hover:border-gray-300"
        }`}
      >
        <BookOpen className="mx-auto mb-2 h-5 w-5" />
        <span className="text-sm font-medium">Buku</span>
        <div className="mt-1 text-xs text-gray-500">
          {stats.totalBooks} items
        </div>
      </button>

      <button
        onClick={() => onSelect("journal")}
        className={`rounded-lg border-2 p-4 transition-all ${
          selectedViewMode === "journal"
            ? "border-purple-500 bg-purple-50 text-purple-700"
            : "border-gray-200 text-gray-700 hover:border-gray-300"
        }`}
      >
        <FileText className="mx-auto mb-2 h-5 w-5" />
        <span className="text-sm font-medium">Jurnal</span>
        <div className="mt-1 text-xs text-gray-500">
          {stats.totalJournals} items
        </div>
      </button>

      <button
        onClick={() => onSelect("skripsi")}
        className={`rounded-lg border-2 p-4 transition-all ${
          selectedViewMode === "skripsi"
            ? "border-orange-500 bg-orange-50 text-orange-700"
            : "border-gray-200 text-gray-700 hover:border-gray-300"
        }`}
      >
        <GraduationCap className="mx-auto mb-2 h-5 w-5" />
        <span className="text-sm font-medium">Skripsi</span>
        <div className="mt-1 text-xs text-gray-500">
          {stats.totalThesis} items
        </div>
      </button>
    </div>
  </div>
);
