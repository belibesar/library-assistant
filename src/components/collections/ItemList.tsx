import { Edit, Trash2, Eye } from "lucide-react";
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
      <div className="grid grid-cols-1 gap-4 pt-1">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            if (item.type === "book") {
              return (
                <BookCard
                  key={`book-${item.id}`}
                  book={item}
                  onViewDetail={() => onViewDetail(item)}
                  onEdit={() => onEditItem(item)}
                  onDelete={() => onDeleteItem(item.id, item.type)}
                />
              );
            } else if (item.type === "journal") {
              return (
                <JournalCard
                  key={`journal-${item.id}`}
                  journal={item}
                  onViewDetail={() => onViewDetail(item)}
                  onEdit={() => onEditItem(item)}
                  onDelete={() => onDeleteItem(item.id, item.type)}
                />
              );
            } else if (item.type === "skripsi") {
              return (
                <SkripsiCard
                  key={`skripsi-${item.id}`}
                  skripsi={item}
                  onViewDetail={() => onViewDetail(item)}
                  onEdit={() => onEditItem(item)}
                  onDelete={() => onDeleteItem(item.id, item.type)}
                />
              );
            }
            return null;
          })
        ) : (
          <div className="p-8 text-center text-gray-500">
            Tidak ada data yang ditemukan
          </div>
        )}
      </div>
    </div>
  );
};
