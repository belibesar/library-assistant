import { Search } from "lucide-react";

const SearchAndFilter = ({
  searchTerm,
  roleFilter,
  onSearchChange,
  onRoleFilterChange,
  onResetFilters,
}: {
  searchTerm: string;
  roleFilter: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onResetFilters: () => void;
}) => (
  <div className="mb-6 space-y-4">
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          className="block w-full rounded-lg border border-gray-300 bg-white p-2 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Cari pengguna..."
        />
      </div>

      <select
        value={roleFilter}
        onChange={onRoleFilterChange}
        className="rounded-lg border border-gray-300 bg-white p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Semua Role</option>
        <option value="user">Mahasiswa</option>
        <option value="admin">Pegawai</option>
      </select>

      <button
        onClick={onResetFilters}
        className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
      >
        Reset Filter
      </button>
    </div>
  </div>
);

export default SearchAndFilter;