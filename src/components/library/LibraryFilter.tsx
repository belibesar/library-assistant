import { Search, Filter } from "lucide-react";

interface LibraryFilterProps {
  search: string;
  category: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const LibraryFilter = ({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}: LibraryFilterProps) => (
  <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
      <div className="relative lg:col-span-9">
        <Search
          className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          size={16}
        />
        <input
          type="text"
          placeholder={`Cari ${
            category === "all"
              ? "semua koleksi"
              : category === "book"
                ? "buku"
                : category === "journal"
                  ? "jurnal"
                  : category === "skripsi"
                    ? "skripsi"
                    : "koleksi"
          }...`}
          value={search}
          onChange={onSearchChange}
          className="w-full rounded-md border border-gray-300 bg-gray-50 py-2 pr-3 pl-10 text-sm transition outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative lg:col-span-3">
        <Filter
          className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          size={14}
        />
        <select
          value={category}
          onChange={onCategoryChange}
          className="w-full appearance-none rounded-md border border-gray-300 bg-gray-50 py-2 pr-8 pl-10 text-sm transition outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Semua Koleksi</option>
          <option value="book">Buku</option>
          <option value="journal">Jurnal</option>
          <option value="skripsi">Skripsi</option>
        </select>
        <div className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2">
          <svg
            className="h-3.5 w-3.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
);
