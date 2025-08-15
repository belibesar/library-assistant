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

export const useAllLibraryItems = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<LibraryItemType | "all">("all");
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [total, setTotal] = useState(0);
  const [totalCollections, setTotalCollections] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (search) params.append("search", search);

      // Tentukan URL berdasarkan kategori
      let url: string;
      if (category === "all") {
        url = `/api/collections?${params.toString()}`;
      } else {
        url = `/api/${endpointMap[category]}?${params.toString()}`;
      }

      const res = await fetch(url);

      if (!res.ok) {
        let errorMessage = `Gagal mengambil data ${category === "all" ? "koleksi" : category} (Status: ${res.status})`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonParseError) {
          console.error("Failed to parse error response:", jsonParseError);
        }
        showNotification(errorMessage, "error");
        setItems([]);
        setTotal(0);
        setTotalCollections(0);
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

          // Deteksi tipe berdasarkan kategori yang dipilih atau field yang ada
          if (
            category === "book" ||
            item.type === "book" ||
            item.penerbit_id ||
            item.pengarang_id ||
            item.lokasi ||
            item.rak ||
            item.sinopsis
          ) {
            return {
              ...base,
              penerbit_id: item.penerbit_id || "",
              pengarang_id: item.pengarang_id || "",
              pengarang: item.pengarang || null,
              penerbit: item.penerbit || null,
              lokasi: item.lokasi || "",
              rak: item.rak || "",
              sinopsis: item.sinopsis || "",
              type: "book",
            } as Book;
          } else if (
            category === "journal" ||
            item.type === "journal" ||
            item.jurnal_id ||
            item.publikasi ||
            item.authors
          ) {
            return {
              ...base,
              jurnal_id: item.jurnal_id || "",
              authors: item.authors || "",
              link: item.link || "",
              type: "journal",
              publikasi: item.publikasi || null,
            } as Journal;
          } else if (
            category === "skripsi" ||
            item.type === "thesis" ||
            item.type === "skripsi" ||
            item.tahun ||
            item.nim
          ) {
            return {
              ...base,
              tahun: item.tahun || "",
              nim: item.nim || "",
              link: item.link || "",
              type: "skripsi",
              nama_mahasiswa: item.nama_mahasiswa || "",
              fakultas: item.fakultas || "",
              program_studi: item.program_studi || "",
              mahasiswa: item.mahasiswa || null,
            } as Skripsi;
          }

          return base as LibraryItem;
        });

        setItems(mappedItems);

        // Set total dan totalCollections
        if (category === "all") {
          console.log(json, "<-----json");

          // setTotal(json.data.length);
          setTotal(json?.pagination?.total); //fix
          setTotalCollections(json.pagination?.totalCollections || 0);
        } else {
          setTotal(
            json.pagination?.totalItems || json.total || json.data.length,
          );
          // Untuk kategori spesifik, ambil total collections dari endpoint collections
          fetchTotalCollections();
        }
      } else {
        setItems([]);
        setTotal(0);
        setTotalCollections(0);
        showNotification(
          json.message ||
            `Gagal mengambil data ${category === "all" ? "koleksi" : category}.`,
          "error",
        );
      }
    } catch (e: any) {
      console.error(
        `Error fetching ${category === "all" ? "collections" : category}:`,
        e,
      );
      setItems([]);
      setTotal(0);
      setTotalCollections(0);
      showNotification(
        `Terjadi kesalahan jaringan saat mengambil ${category === "all" ? "koleksi" : category}.`,
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalCollections = async () => {
    try {
      const res = await fetch(`/api/collections?page=${page}&limit=${limit}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.pagination?.totalCollections) {
          setTotalCollections(json.pagination.totalCollections);
        }
      }
    } catch (error) {
      console.error("Error fetching total collections:", error);
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
    setCategory(e.target.value as LibraryItemType | "all");
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
    limit,
    items,
    page,
    total,
    totalCollections,
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
