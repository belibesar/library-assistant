import { useState, useEffect } from "react";
import {
  BaseItem,
  Book,
  Journal,
  LibraryItem,
  LibraryItemType,
  Notification,
  Skripsi,
} from "@/libs/types/libraryType";
import { endpointMap } from "@/utils/libraryUtil";

export const useLibraryItems = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<LibraryItemType>("book");
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const fetchItems = async () => {
    if (!category) {
      setItems([]);
      setTotal(0);
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (search) params.append("search", search);

      const url = `/api/${endpointMap[category]}?${params.toString()}`;
      const res = await fetch(url);

      if (!res.ok) {
        let errorMessage = `Gagal mengambil data ${category} (Status: ${res.status})`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonParseError) {
          console.error("Failed to parse error response:", jsonParseError);
        }
        showNotification(errorMessage, "error");
        setItems([]);
        setTotal(0);
        return;
      }

      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        const mappedItems: LibraryItem[] = json.data.map((item: any) => {

          const base: BaseItem = {
            _id: String(item._id),
            id: item.id || item._id,
            judul: item.judul || "",
            abstrak: item.abstrak || "",
            jumlah: Number(item.jumlah) || 0,
            tersedia: Number(item.tersedia) || 0,
            dipinjam: Number(item.dipinjam) || 0,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            count: Number(item.count) || 0,
          };

          if (item.penerbit_id || item.pengarang_id) {
            return {
              ...base,
              penerbit_id: item.penerbit_id || "",
              pengarang_id: item.pengarang_id || "",
              pengarang: item.pengarang || "",
              penerbit: item.penerbit || "",
              lokasi: item.lokasi || "",
              rak: item.rak || "",
              sinopsis: item.sinopsis || "",
              type: "book",
            } as Book;
          } else if (item.jurnal_id || item.publikasi || item.authors || (category === "journal")) {
            return {
              ...base,
              jurnal_id: item.jurnal_id || "",
              authors: item.authors || "",
              link: item.link || "",
              type: "journal",
              publikasi: item.publikasi,
            } as Journal;
          } else if (item.tahun || item.nim) {
            return {
              ...base,
              tahun: item.tahun || "",
              nim: item.nim || "",
              link: item.link || "",
              type: "skripsi",
              mahasiswa: item.mahasiswa,
            } as Skripsi;
          }
          return base as LibraryItem;
        });
        setItems(mappedItems);
        setTotal(
          json.pagination?.totalItems || json.total || mappedItems.length,
        );
      } else {
        setItems([]);
        setTotal(0);
        showNotification(
          json.message || `Gagal mengambil data ${category}.`,
          "error",
        );
      }
    } catch (e: any) {
      console.error(`Error fetching ${category}s:`, e);
      setItems([]);
      setTotal(0);
      showNotification(
        `Terjadi kesalahan jaringan saat mengambil ${category}.`,
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [page, limit, search, category]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as LibraryItemType);
    setSearch("");
    setPage(1);
  };

  const totalPages = Math.ceil(total / limit);
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return {
    search,
    category,
    setItems,
    setPage,
    setTotal,
    items,
    page,
    total,
    loading,
    notification,
    totalPages,
    setCategory,
    handleSearchChange,
    handleCategoryChange,
    handlePrev,
    handleNext,
    fetchItems,
    showNotification,
  };
};
