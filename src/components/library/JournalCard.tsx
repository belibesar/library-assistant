import { Journal } from "../../libs/types/libraryType";
import { formatDateForInput } from "../../utils/libraryUtil";
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
}: JournalCardProps) => (
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
      </div>

      <div className="space-y-3">
        <h3 className="line-clamp-2 text-lg leading-tight font-bold text-gray-900">
          {journal.judul}
        </h3>
        <p className="text-sm text-gray-600">ID Jurnal: {journal.id}</p>
        <span className="inline-block rounded-full bg-gray-100 px-3 text-xs font-medium text-gray-700">
          Jurnal ID: {journal.jurnal_id}
        </span>
        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
          {journal.abstrak}
        </p>
      </div>
    </div>

    <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-gray-500">Total: {journal.jumlah}</span>
        <div className="flex gap-2">
          <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
            Tersedia: {journal.tersedia}
          </span>
          <span className="rounded-md bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-600">
            Dipinjam: {journal.dipinjam}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Dibuat: {formatDateForInput(journal.createdAt)}</span>
        <span>Diperbarui: {formatDateForInput(journal.updatedAt)}</span>
      </div>
      {journal.count !== undefined && (
        <div className="mt-2 text-right text-xs text-gray-500">
          Dilihat: {journal.count} kali
        </div>
      )}
    </div>
  </div>
);
