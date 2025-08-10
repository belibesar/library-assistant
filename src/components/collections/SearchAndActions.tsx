import { LibraryItemType } from "@/libs/types/libraryType";
import { Plus, Search } from "lucide-react";

interface SearchAndActionsProps {
  search: string;
  selectedViewMode: "overview" | LibraryItemType;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenFormModal: (itemType: LibraryItemType) => void;
  role: string | null;
}

export const SearchAndActions = ({
  search,
  selectedViewMode,
  onSearchChange,
  onOpenFormModal,
  role,
}: SearchAndActionsProps) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
      <div className="max-w-lg flex-1">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            placeholder={`Cari ${
              selectedViewMode === "overview"
                ? "semua item"
                : selectedViewMode === "book"
                  ? "buku"
                  : selectedViewMode === "journal"
                    ? "jurnal"
                    : "skripsi"
            }...`}
            value={search}
            onChange={onSearchChange}
            className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {role === "admin" && selectedViewMode !== "overview" && (
        <div className="flex space-x-2">
          <button
            onClick={() => onOpenFormModal(selectedViewMode as LibraryItemType)}
            className={`flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-white ${
              selectedViewMode === "book"
                ? "bg-blue-600 hover:bg-blue-700"
                : selectedViewMode === "journal"
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>
              Tambah{" "}
              {selectedViewMode === "book"
                ? "Buku"
                : selectedViewMode === "journal"
                  ? "Jurnal"
                  : "Skripsi"}
            </span>
          </button>
        </div>
      )}

      {role === "admin" && selectedViewMode === "overview" && (
        <div className="flex space-x-2">
          <button
            onClick={() => onOpenFormModal("book")}
            className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Buku</span>
          </button>
          <button
            onClick={() => onOpenFormModal("journal")}
            className="flex items-center space-x-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Jurnal</span>
          </button>
          <button
            onClick={() => onOpenFormModal("skripsi")}
            className="flex items-center space-x-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Skripsi</span>
          </button>
        </div>
      )}
    </div>
  </div>
);
