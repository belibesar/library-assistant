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
      className="group card-hover cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100"
      onClick={() => onViewDetail(skripsi)}
    >
      <div className="p-4 pb-3">
        <div className="mb-1 flex items-start justify-between">
          <div className="transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3">
            <FileText size={30} color="#FFA500" />
          </div>
          {/* untuk admin.. */}
          {role === "admin" && (
            <div className="flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(skripsi);
                }}
                className="modal-button rounded-lg p-2 text-gray-400 transition-all duration-200 hover:scale-110 hover:bg-orange-50 hover:text-orange-600"
                title="Edit skripsi"
                aria-label="Edit skripsi"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(skripsi._id as string, "skripsi");
                }}
                className="modal-button rounded-lg p-2 text-gray-400 transition-all duration-200 hover:scale-110 hover:bg-red-50 hover:text-red-600"
                title="Hapus skripsi"
                aria-label="Hapus skripsi"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="line-clamp-2 text-xl leading-tight font-bold text-gray-900 transition-colors duration-200 group-hover:text-orange-700">
            {skripsi.judul}
          </h3>

          <div className="flex flex-col gap-1">
            <p className="text-base text-gray-600 transition-colors duration-200 group-hover:text-gray-700">
              Pengarang:{" "}
              {skripsi.nama_mahasiswa ? skripsi.nama_mahasiswa : "N/A"}
            </p>
            {/* <p className="text-base text-gray-600 transition-colors duration-200 group-hover:text-gray-700">
              Fakultas: {skripsi.fakultas ? skripsi.fakultas : "N/A"}
            </p>
            <p className="text-base text-gray-600 transition-colors duration-200 group-hover:text-gray-700">
              Program Studi:{" "}
              {skripsi.program_studi ? skripsi.program_studi : "N/A"}
            </p> */}
          </div>

          <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-all duration-200 group-hover:scale-105 group-hover:bg-orange-100 group-hover:text-orange-700">
            Tahun: {skripsi.tahun}
          </span>

          <p className="line-clamp-3 text-base leading-relaxed text-gray-600 transition-colors duration-200 group-hover:text-gray-700">
            {skripsi.abstrak}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 transition-colors duration-200 group-hover:bg-orange-50/30">
        {skripsi.count !== undefined && (
          <div className="mt-2 text-right text-base text-gray-500 transition-colors duration-200 group-hover:text-gray-600">
            Dilihat: {skripsi.count} kali
          </div>
        )}
      </div>
    </div>
  );
};
