import { useAuth } from "@/contexts/AuthContext";
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
  const { role } = useAuth();
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
          {/* role implementation */}
          {role === "admin" && (
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
          )}
        </div>

        <div className="space-y-3">
          <h3 className="line-clamp-2 text-xl leading-tight font-bold text-gray-900">
            {skripsi.judul}
          </h3>

          <div className="flex flex-col gap-1">
            <p className="text-base text-gray-600">
              Nama Mahasiswa: {skripsi.mahasiswa?.name}
            </p>
            <p className="text-base text-gray-600">
              Fakultas: {skripsi.mahasiswa?.fakultas || "N/A"}
            </p>
            <p className="text-base text-gray-600">
              Program Studi: {skripsi.mahasiswa?.program_studi || "N/A"}
            </p>
          </div>

          <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            Tahun: {skripsi.tahun}
          </span>

          <p className="line-clamp-3 text-base leading-relaxed text-gray-600">
            {skripsi.abstrak}
          </p>
        </div>
      </div>

      {/* Card Footer with Stats */}
      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
        {skripsi.count !== undefined && (
          <div className="mt-2 text-right text-base text-gray-500">
            Dilihat: {skripsi.count} kali
          </div>
        )}
      </div>
    </div>
  );
};
