import { Skripsi } from "../../libs/types/libraryType";
import { formatDateForInput } from "../../utils/libraryUtil";
import { FileText, Edit3, Trash2 } from "lucide-react";

interface SkripsiCardProps {
  skripsi: Skripsi;
  onEdit: (skripsi: Skripsi) => void;
  onDelete: (id: string, type: "skripsi") => void;
  onViewDetail: (skripsi: Skripsi) => void;
}

export const SkripsiCard = ({
  skripsi,
  onEdit,
  onDelete,
  onViewDetail,
}: SkripsiCardProps) => {
  return (
    <div
      key={skripsi.id}
      className="cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100"
      onClick={() => onViewDetail(skripsi)}
    >
      {/* Card Header with Icon and Action Buttons */}
      <div className="p-4 pb-3">
        <div className="mb-1 flex items-start justify-between">
          <div>
            <FileText size={30} color="#FFA500" />
          </div>
          <div className="flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(skripsi);
              }}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-orange-50 hover:text-orange-600"
              title="Edit skripsi"
              aria-label="Edit skripsi"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(skripsi.id, "skripsi");
              }}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
              title="Hapus skripsi"
              aria-label="Hapus skripsi"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Skripsi Content */}
        <div className="space-y-3">
          <h3 className="line-clamp-2 text-lg leading-tight font-bold text-gray-900">
            {skripsi.judul}
          </h3>

          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-600">ID Skripsi: {skripsi.id}</p>
            <p className="text-sm text-gray-600">NIM: {skripsi.nim}</p>
            {/* {skripsi.mahasiswa && (
              <>
                <p className="text-sm text-gray-600">Mahasiswa: {skripsi.mahasiswa.name}</p>
                <p className="text-sm text-gray-600">Fakultas: {skripsi.mahasiswa.fakultas}</p>
                <p className="text-sm text-gray-600">Program Studi: {skripsi.mahasiswa.program_studi}</p>
              </>
            )} */}
          </div>

          <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            Tahun: {skripsi.tahun}
          </span>

          <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
            {skripsi.abstrak}
          </p>
        </div>
      </div>

      {/* Card Footer with Stats */}
      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-500">Total: {skripsi.jumlah}</span>
          <div className="flex gap-2">
            <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
              Tersedia: {skripsi.tersedia}
            </span>
            <span className="rounded-md bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-600">
              Dipinjam: {skripsi.dipinjam}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Dibuat: {formatDateForInput(skripsi.createdAt)}</span>
          <span>Diperbarui: {formatDateForInput(skripsi.updatedAt)}</span>
        </div>

        {skripsi.count !== undefined && (
          <div className="mt-2 text-right text-xs text-gray-500">
            Dilihat: {skripsi.count} kali
          </div>
        )}
      </div>
    </div>
  );
};
