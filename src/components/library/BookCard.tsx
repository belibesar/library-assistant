import { Book } from "../../libs/types/libraryType";
import { formatDateForInput } from "../../utils/libraryUtil";
import { BookOpen, Edit3, Trash2 } from "lucide-react";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string, type: "book") => void;
  onViewDetail: (item: Book) => void;
}

export const BookCard = ({
  book,
  onEdit,
  onDelete,
  onViewDetail,
}: BookCardProps) => (
  <div
    key={book.id}
    className="cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100"
    onClick={() => onViewDetail(book)}
  >
    <div className="p-4 pb-3">
      <div className="mb-1 flex items-start justify-between">
        <div>
          <BookOpen size={30} color="#113FF7" />
        </div>
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(book);
            }}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
            title="Edit buku"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(book.id, "book");
            }}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
            title="Hapus buku"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="line-clamp-2 text-lg leading-tight font-bold text-gray-900">
          {book.judul}
        </h3>
        <p className="text-sm text-gray-600">ID Buku: {book.id}</p>
        <p className="text-sm text-gray-600">
          Pengarang ID: {book.pengarang_id}
        </p>

        <span className="inline-block rounded-full bg-gray-100 px-3 text-xs font-medium text-gray-700">
          Penerbit ID: {book.penerbit_id}
        </span>

        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
          {book.abstrak}
        </p>
      </div>
    </div>

    <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-gray-500">Total: {book.jumlah}</span>
        <div className="flex gap-2">
          <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
            Tersedia: {book.tersedia}
          </span>
          <span className="rounded-md bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-600">
            Dipinjam: {book.dipinjam}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Dibuat: {formatDateForInput(book.createdAt)}</span>
        <span>Diperbarui: {formatDateForInput(book.updatedAt)}</span>
      </div>
      {book.count !== undefined && (
        <div className="mt-2 text-right text-xs text-gray-500">
          Dilihat: {book.count} kali
        </div>
      )}
    </div>
  </div>
);
