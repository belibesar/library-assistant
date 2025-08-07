import { useAuth } from "@/contexts/AuthContext";
import { Journal } from "../../libs/types/libraryType";
import { Newspaper, Edit3, Trash2 } from "lucide-react";

interface JournalCardProps {
  journal: Journal;
  onEdit: (journal: Journal) => void;
  onDelete: (id: string, type: "journal") => void;
  onViewDetail: (item: Journal) => void;
}

export const JournalCard = ({
  journal,
  onEdit,
  onDelete,
  onViewDetail,
}: JournalCardProps) => {
  const { role } = useAuth();
  return (
    <div
      key={journal.id}
      className="cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100"
      onClick={() => onViewDetail(journal)}
    >
      <div className="p-4 pb-3">
        <div className="mb-1 flex items-start justify-between">
          <div>
            <Newspaper size={30} color="#8A2BE2" />
          </div>
          {/* role implementation */}
          {role === "admin" && (
            <div className="flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(journal);
                }}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-purple-50 hover:text-purple-600"
                title="Edit jurnal"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(journal.id, "journal");
                }}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                title="Hapus jurnal"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="line-clamp-2 text-xl leading-tight font-bold text-gray-900">
            {journal.judul}
          </h3>
          <p className="line-clamp-3 text-base leading-relaxed text-gray-600">
            Abstrak: {journal.abstrak || "Tidak ada abstrak"}
          </p>

          {journal.publikasi && (
            <div className="space-y-1">
              <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                {journal.publikasi.name}
              </span>
              <div className="flex gap-2">
                <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700">
                  Vol: {journal.publikasi.volume}
                </span>
                <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700">
                  Tahun: {journal.publikasi.tahun}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
        {journal.count !== undefined && (
          <div className="mt-2 text-right text-base text-gray-500">
            Dilihat: {journal.count} kali
          </div>
        )}
      </div>
    </div>
  );
};
