import { Edit, Trash2, Eye, BookOpen } from "lucide-react";
import { BookCard } from "@/components/library/BookCard";
import { JournalCard } from "@/components/library/JournalCard";
import { SkripsiCard } from "@/components/library/SkripsiCard";
import { LibraryItem, LibraryItemType } from "@/libs/types/libraryType";

interface ItemsListProps {
  items: LibraryItem[];
  selectedViewMode: "overview" | LibraryItemType;
  onEditItem: (item: LibraryItem) => void;
  onViewDetail: (item: LibraryItem) => void;
  onDeleteItem: (id: string, type: LibraryItemType) => void;
  role: string | null;
}

export const ItemsList = ({
  items,
  selectedViewMode,
  onEditItem,
  onViewDetail,
  onDeleteItem,
  role,
}: ItemsListProps) => {
  const filteredItems =
    selectedViewMode === "overview"
      ? items
      : items.filter((item) => item.type === selectedViewMode);

  console.log("Filtered Items:", filteredItems);
  console.log("Selected View Mode:", selectedViewMode);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {selectedViewMode === "overview"
            ? "Semua Koleksi"
            : selectedViewMode === "book"
              ? "Manajemen Buku"
              : selectedViewMode === "journal"
                ? "Manajemen Jurnal"
                : "Manajemen Skripsi"}
        </h3>
      </div>

      <div className="p-6">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredItems.map((item) => {
              if (item.type === "book") {
                return (
                  <BookCard
                    key={`book-${item.id || item._id}`}
                    book={item}
                    onViewDetail={onViewDetail}
                    onEdit={onEditItem}
                    onDelete={onDeleteItem}
                  />
                );
              } else if (item.type === "journal") {
                return (
                  <JournalCard
                    key={`journal-${item.id || item._id}`}
                    journal={item}
                    onViewDetail={onViewDetail}
                    onEdit={onEditItem}
                    onDelete={onDeleteItem}
                  />
                );
              } else if (item.type === "skripsi") {
                return (
                  <SkripsiCard
                    key={`skripsi-${item.id || item._id}`}
                    skripsi={item}
                    onViewDetail={onViewDetail}
                    onEdit={onEditItem}
                    onDelete={onDeleteItem}
                  />
                );
              }
              return null;
            })}
          </div>
        ) : (
          <div className="py-16 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Tidak ada data yang ditemukan
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {selectedViewMode === "overview"
                ? "Belum ada koleksi yang tersedia"
                : `Belum ada ${selectedViewMode === "book" ? "buku" : selectedViewMode === "journal" ? "jurnal" : "skripsi"} yang tersedia`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
