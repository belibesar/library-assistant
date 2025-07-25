"use client";

import { useState, useEffect } from "react";
import { Search, Filter, BookOpen, Edit3, Trash2, Plus, FileText, Newspaper } from "lucide-react";
import { ZodError } from "zod";

interface BaseItem {
  _id?: { $oid: string } | string; 
  id: string;
  judul: string;
  abstrak: string;
  jumlah: number;
  tersedia: number;
  dipinjam: number;
  createdAt?: string;
  updatedAt?: string;
  count?: number;
}

interface Book extends BaseItem {
  penerbit_id: string;
  pengarang_id: string;
  type: "book";
}

interface Journal extends BaseItem {
  jurnal_id: string;
  type: "journal";
}

interface Skripsi extends BaseItem {
  tahun: string;
  nim: string;
  type: "skripsi";
}

type LibraryItem = Book | Journal | Skripsi;

interface BookFormInput {
  id: string;
  judul: string;
  abstrak: string;
  jumlah: number | string;
  tersedia: number | string;
  dipinjam: number | string;
  penerbit_id: string;
  pengarang_id: string;
  createdAt?: string;
  updatedAt?: string;
}

interface JournalFormInput {
  id: string;
  judul: string;
  abstrak: string;
  jumlah: number | string;
  tersedia: number | string;
  dipinjam: number | string;
  jurnal_id: string;
  createdAt?: string;
  updatedAt?: string;
}

interface SkripsiFormInput {
  id: string;
  judul: string;
  abstrak: string;
  jumlah: number | string;
  tersedia: number | string;
  dipinjam: number | string;
  tahun: string;
  nim: string;
  createdAt?: string;
  updatedAt?: string;
}

type FormInput = BookFormInput | JournalFormInput | SkripsiFormInput;

export default function LibraryCollectionPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"book" | "journal" | "skripsi" | "">("book");
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formInput, setFormInput] = useState<FormInput>({
    id: "",
    judul: "",
    abstrak: "",
    jumlah: "",
    tersedia: "",
    dipinjam: "",
  } as FormInput);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  const endpointMap: Record<string, string> = {
    book: "books",
    journal: "journals",
    skripsi: "thesis",
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

      const url = `/api/${endpointMap[category]}?${params.toString()}`; // Use endpointMap
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
            id: item._id?.$oid || item._id || item.id,
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
            return { ...base, penerbit_id: item.penerbit_id || "", pengarang_id: item.pengarang_id || "", type: "book" } as Book;
          } else if (item.jurnal_id) {
            return { ...base, jurnal_id: item.jurnal_id || "", type: "journal" } as Journal;
          } else if (item.tahun || item.nim) {
            return { ...base, tahun: item.tahun || "", nim: item.nim || "", type: "skripsi" } as Skripsi;
          }
          return base as LibraryItem; 
        });
        setItems(mappedItems);
        setTotal(json.pagination?.totalItems || json.total || mappedItems.length);
      } else {
        setItems([]);
        setTotal(0);
        showNotification(json.message || `Gagal mengambil data ${category}.`, "error");
      }
    } catch (e: any) {
      console.error(`Error fetching ${category}s:`, e);
      setItems([]);
      setTotal(0);
      showNotification(`Terjadi kesalahan jaringan saat mengambil ${category}.`, "error");
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
    setCategory(e.target.value as "book" | "journal" | "skripsi" | "");
    setSearch("");
    setPage(1);
  };

  const totalPages = Math.ceil(total / limit);
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const handleOpenFormModal = (itemType: "book" | "journal" | "skripsi") => {
    setCategory(itemType);
    setFormInput(getInitialFormInput(itemType));
    setFormErrors({});
    setIsFormModalOpen(true);
    setTimeout(() => {
      const idInput = document.getElementById(`${itemType}-id-input`);
      if (idInput) {
        (idInput as HTMLInputElement).focus();
      }
    }, 100);
  };

  const getInitialFormInput = (itemType: "book" | "journal" | "skripsi"): FormInput => {
    const commonFields = {
      id: "",
      judul: "",
      abstrak: "",
      jumlah: "",
      tersedia: "",
      dipinjam: "",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    if (itemType === "book") {
      return { ...commonFields, penerbit_id: "", pengarang_id: "" } as BookFormInput;
    } else if (itemType === "journal") {
      return { ...commonFields, jurnal_id: "" } as JournalFormInput;
    } else if (itemType === "skripsi") {
      return { ...commonFields, tahun: "", nim: "" } as SkripsiFormInput;
    }
    return commonFields as FormInput;
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    let newErrors: { [key: string]: string } = {};
    let payload: any;
    let endpoint = "";
    let isUpdating = false;
    let itemId = (formInput as any).id;

    if (!formInput.id.trim()) newErrors.id = "ID wajib diisi";
    if (!formInput.judul.trim()) newErrors.judul = "Judul wajib diisi";
    if (!formInput.abstrak.trim()) newErrors.abstrak = "Abstrak wajib diisi";
    if (!formInput.jumlah || Number(formInput.jumlah) < 1) newErrors.jumlah = "Jumlah harus minimal 1";
    if (!formInput.tersedia || Number(formInput.tersedia) < 0) newErrors.tersedia = "Tersedia tidak boleh negatif";
    if (!formInput.dipinjam || Number(formInput.dipinjam) < 0) newErrors.dipinjam = "Dipinjam tidak boleh negatif";

    const jumlahNum = Number(formInput.jumlah);
    const tersediaNum = Number(formInput.tersedia);
    const dipinjamNum = Number(formInput.dipinjam);

    if (tersediaNum + dipinjamNum !== jumlahNum) {
      newErrors.general = "Jumlah tersedia + dipinjam harus sama dengan total jumlah";
    }

    if (!formInput.createdAt) newErrors.createdAt = "Tanggal dibuat wajib diisi";
    if (!formInput.updatedAt) newErrors.updatedAt = "Tanggal diperbarui wajib diisi";

    if (category === "book") {
      const bookFormInput = formInput as BookFormInput;
      if (!bookFormInput.penerbit_id.trim()) newErrors.penerbit_id = "Penerbit ID wajib diisi";
      if (!bookFormInput.pengarang_id.trim()) newErrors.pengarang_id = "Pengarang ID wajib diisi";
      payload = {
        id: bookFormInput.id.trim(),
        judul: bookFormInput.judul.trim(),
        abstrak: bookFormInput.abstrak.trim(),
        jumlah: jumlahNum,
        tersedia: tersediaNum,
        dipinjam: dipinjamNum,
        penerbit_id: bookFormInput.penerbit_id.trim(),
        pengarang_id: bookFormInput.pengarang_id.trim(),
        createdAt: bookFormInput.createdAt,
        updatedAt: bookFormInput.updatedAt,
      };
      endpoint = "/api/books";
      isUpdating = items.some(item => item.id === bookFormInput.id && item.type === "book");

    } else if (category === "journal") {
      const journalFormInput = formInput as JournalFormInput;
      if (!journalFormInput.jurnal_id.trim()) newErrors.jurnal_id = "Jurnal ID wajib diisi";
      payload = {
        id: journalFormInput.id.trim(),
        judul: journalFormInput.judul.trim(),
        abstrak: journalFormInput.abstrak.trim(),
        jumlah: jumlahNum,
        tersedia: tersediaNum,
        dipinjam: dipinjamNum,
        jurnal_id: journalFormInput.jurnal_id.trim(),
        createdAt: journalFormInput.createdAt,
        updatedAt: journalFormInput.updatedAt,
      };
      endpoint = "/api/journals";
      isUpdating = items.some(item => item.id === journalFormInput.id && item.type === "journal");

    } else if (category === "skripsi") {
      const skripsiFormInput = formInput as SkripsiFormInput;
      if (!skripsiFormInput.tahun.trim()) newErrors.tahun = "Tahun wajib diisi";
      if (!skripsiFormInput.nim.trim()) newErrors.nim = "NIM wajib diisi";
      payload = {
        id: skripsiFormInput.id.trim(),
        judul: skripsiFormInput.judul.trim(),
        abstrak: skripsiFormInput.abstrak.trim(),
        jumlah: jumlahNum,
        tersedia: tersediaNum,
        dipinjam: dipinjamNum,
        tahun: skripsiFormInput.tahun.trim(),
        nim: skripsiFormInput.nim.trim(),
        createdAt: skripsiFormInput.createdAt,
        updatedAt: skripsiFormInput.updatedAt,
      };
      endpoint = "/api/thesis"; 
      isUpdating = items.some(item => item.id === skripsiFormInput.id && item.type === "skripsi");
    } else {
      newErrors.general = "Tipe kategori tidak valid.";
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    try {
      const url = isUpdating ? `${endpoint}/${itemId}` : endpoint;
      const method = isUpdating ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errorMessage = `Gagal ${isUpdating ? 'memperbarui' : 'menambahkan'} ${category}`;
        try {
          const errorData = await res.json();
          if (errorData.error && errorData.error.issues) {
            const zodErrors: { [key: string]: string } = {};
            errorData.error.issues.forEach((issue: any) => {
              zodErrors[issue.path[0]] = issue.message;
            });
            setFormErrors(zodErrors);
            showNotification("Validasi gagal: Periksa input Anda.", "error");
            return;
          }
          errorMessage = errorData.message || errorMessage;
        } catch (jsonParseError) {
          console.error("Failed to parse error response:", jsonParseError);
        }
        showNotification(errorMessage, "error");
        return;
      }

      const json = await res.json();

      if (json.success) {
        showNotification(
          `${category} berhasil ${isUpdating ? 'diperbarui' : 'ditambahkan'}!`,
          "success"
        );
        setIsFormModalOpen(false);
        await fetchItems();
        if (!isUpdating) {
          setPage(1);
        }
      } else {
        showNotification(
          json.message || `Gagal ${isUpdating ? 'memperbarui' : 'menambahkan'} ${category}`,
          "error"
        );
      }
    } catch (error: any) {
      console.error("Error saving item:", error);
      if (error instanceof ZodError) {
        const zodErrors: { [key: string]: string } = {};
        error.errors.forEach((issue) => {
          zodErrors[issue.path[0]] = issue.message;
        });
        setFormErrors(zodErrors);
        showNotification("Validasi gagal. Periksa input Anda.", "error");
      } else {
        showNotification("Terjadi kesalahan yang tidak diketahui.", "error");
      }
    }
  };

  const handleDeleteItem = async (id: string, itemType: "book" | "journal" | "skripsi") => {
    if (!id || !itemType) {
      showNotification("ID atau tipe item tidak valid", "error");
      return;
    }

    const itemToDelete = items.find(item => item.id === id && item.type === itemType);
    const itemTitle = itemToDelete ? itemToDelete.judul : "item ini";

    if (!confirm(`Anda yakin ingin menghapus "${itemTitle}" (${itemType})?\nTindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/${endpointMap[itemType]}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        let errorMessage = `Gagal menghapus ${itemType} (Status: ${res.status})`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonParseError) {
          console.error("Failed to parse error response:", jsonParseError);
        }
        showNotification(errorMessage, "error");
        return;
      }

      const json = await res.json();

      if (json.success) {
        showNotification(`${itemType} berhasil dihapus!`, "success");
        setItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.type === itemType)));
        setTotal((prevTotal) => prevTotal - 1);

        const remainingItemsOnPage = items.filter(item => !(item.id === id && item.type === itemType)).length;
        if (remainingItemsOnPage === 0 && page > 1) {
          setPage(page - 1);
        }

        setTimeout(() => {
          fetchItems();
        }, 500);
      } else {
        showNotification(json.message || `Gagal menghapus ${itemType}.`, "error");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      showNotification("Terjadi kesalahan jaringan saat menghapus item.", "error");
    }
  };

  const handleEditItem = (item: LibraryItem) => {
    setSelectedItem(item);
    if (item.type === "book") {
      setFormInput({
        id: item.id || "",
        judul: item.judul,
        abstrak: item.abstrak,
        jumlah: item.jumlah.toString(),
        tersedia: item.tersedia.toString(),
        dipinjam: item.dipinjam.toString(),
        penerbit_id: (item as Book).penerbit_id,
        pengarang_id: (item as Book).pengarang_id,
        createdAt: formatDateForInput(item.createdAt),
        updatedAt: formatDateForInput(item.updatedAt),
      } as BookFormInput);
    } else if (item.type === "journal") {
      setFormInput({
        id: item.id || "",
        judul: item.judul,
        abstrak: item.abstrak,
        jumlah: item.jumlah.toString(),
        tersedia: item.tersedia.toString(),
        dipinjam: item.dipinjam.toString(),
        jurnal_id: (item as Journal).jurnal_id,
        createdAt: formatDateForInput(item.createdAt),
        updatedAt: formatDateForInput(item.updatedAt),
      } as JournalFormInput);
    } else if (item.type === "skripsi") {
      setFormInput({
        id: item.id || "",
        judul: item.judul,
        abstrak: item.abstrak,
        jumlah: item.jumlah.toString(),
        tersedia: item.tersedia.toString(),
        dipinjam: item.dipinjam.toString(),
        tahun: (item as Skripsi).tahun,
        nim: (item as Skripsi).nim,
        createdAt: formatDateForInput(item.createdAt),
        updatedAt: formatDateForInput(item.updatedAt),
      } as SkripsiFormInput);
    }
    setCategory(item.type);
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const handleViewDetail = async (item: LibraryItem) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);

    setItems(prevItems =>
      prevItems.map(i =>
        i.id === item.id && i.type === item.type
          ? { ...i, count: (i.count || 0) + 1 }
          : i
      )
    );

    try {
      const res = await fetch(`/api/${endpointMap[item.type]}/${item.id}/view`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        console.error(`Failed to increment view count for ${item.type} ${item.id}`);
      }
    } catch (error) {
      console.error(`Error calling view API for ${item.type} ${item.id}:`, error);
    }
  };


  const BookCard: React.FC<{ book: Book; onEdit: (book: Book) => void; onDelete: (id: string, type: "book") => void; onViewDetail: (item: LibraryItem) => void }> = ({ book, onEdit, onDelete, onViewDetail }) => (
    <div
      key={book.id}
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100 cursor-pointer"
      onClick={() => onViewDetail(book)}
    >
      <div className="p-4 pb-3">
        <div className="mb-1 flex items-start justify-between">
          <div>
            <BookOpen size={30} color="#113FF7" />
          </div>
          <div className="flex gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(book); }}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
              title="Edit buku"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(book.id, "book"); }}
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
          <p className="text-sm text-gray-600">
            ID Buku: {book.id}
          </p>
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
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">
            Total: {book.jumlah}
          </span>
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

  const JournalCard: React.FC<{ journal: Journal; onEdit: (journal: Journal) => void; onDelete: (id: string, type: "journal") => void; onViewDetail: (item: LibraryItem) => void }> = ({ journal, onEdit, onDelete, onViewDetail }) => (
    <div
      key={journal.id}
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100 cursor-pointer"
      onClick={() => onViewDetail(journal)}
    >
      <div className="p-4 pb-3">
        <div className="mb-1 flex items-start justify-between">
          <div>
            <Newspaper size={30} color="#8A2BE2" />
          </div>
          <div className="flex gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(journal); }}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-purple-50 hover:text-purple-600"
              title="Edit jurnal"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(journal.id, "journal"); }}
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
          <p className="text-sm text-gray-600">
            ID Jurnal: {journal.id}
          </p>
          <span className="inline-block rounded-full bg-gray-100 px-3 text-xs font-medium text-gray-700">
            Jurnal ID: {journal.jurnal_id}
          </span>
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
            {journal.abstrak}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">
            Total: {journal.jumlah}
          </span>
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

  const SkripsiCard: React.FC<{ skripsi: Skripsi; onEdit: (skripsi: Skripsi) => void; onDelete: (id: string, type: "skripsi") => void; onViewDetail: (item: LibraryItem) => void }> = ({ skripsi, onEdit, onDelete, onViewDetail }) => (
    <div
      key={skripsi.id}
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100 cursor-pointer"
      onClick={() => onViewDetail(skripsi)}
    >
      <div className="p-4 pb-3">
        <div className="mb-1 flex items-start justify-between">
          <div>
            <FileText size={30} color="#FFA500" />
          </div>
          <div className="flex gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(skripsi); }}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-orange-50 hover:text-orange-600"
              title="Edit skripsi"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(skripsi.id, "skripsi"); }}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
              title="Hapus skripsi"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="line-clamp-2 text-lg leading-tight font-bold text-gray-900">
            {skripsi.judul}
          </h3>
          <p className="text-sm text-gray-600">
            ID Skripsi: {skripsi.id}
          </p>
          <p className="text-sm text-gray-600">
            NIM: {skripsi.nim}
          </p>
          <span className="inline-block rounded-full bg-gray-100 px-3 text-xs font-medium text-gray-700">
            Tahun: {skripsi.tahun}
          </span>
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
            {skripsi.abstrak}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">
            Total: {skripsi.jumlah}
          </span>
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

  return (
    <div className="bg-base-100 h-full w-full mt-[-20px]">
      <div className="bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Koleksi Perpustakaan</h1>
            <p className="mt-1 text-gray-600">
              Kelola koleksi {category === "book" ? "buku" : category === "journal" ? "jurnal" : category === "skripsi" ? "skripsi" : ""} ({total} total item)
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleOpenFormModal("book")}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              <Plus size={16} />
              Tambah Buku
            </button>
            <button
              onClick={() => handleOpenFormModal("journal")}
              className="flex items-center gap-2 rounded-md bg-purple-600 px-6 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-purple-700"
            >
              <Plus size={16} />
              Tambah Jurnal
            </button>
            <button
              onClick={() => handleOpenFormModal("skripsi")}
              className="flex items-center gap-2 rounded-md bg-orange-600 px-6 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-orange-700"
            >
              <Plus size={16} />
              Tambah Skripsi
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col py-2">
        <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            <div className="relative lg:col-span-9">
              <Search
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder={`Cari ${category}...`}
                value={search}
                onChange={handleSearchChange}
                className="w-full rounded-md border border-gray-300 bg-gray-50 py-2 pr-3 pl-10 text-sm transition outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative lg:col-span-3">
              <Filter
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                size={14}
              />
              <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full appearance-none rounded-md border border-gray-300 bg-gray-50 py-2 pr-8 pl-10 text-sm transition outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="book">Buku</option>
                <option value="journal">Jurnal</option>
                <option value="skripsi">Skripsi</option>
              </select>
              <div className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2">
                <svg
                  className="h-3.5 w-3.5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 rounded-md px-4 py-2 text-white shadow-lg transition-all duration-300 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2">Loading...</p>
          </div>
        ) : items.length > 0 ? (
          items.map((item) => {
            if (item.type === "book") {
              return <BookCard key={item.id} book={item as Book} onEdit={handleEditItem} onDelete={handleDeleteItem} onViewDetail={handleViewDetail} />;
            } else if (item.type === "journal") {
              return <JournalCard key={item.id} journal={item as Journal} onEdit={handleEditItem} onDelete={handleDeleteItem} onViewDetail={handleViewDetail} />;
            } else if (item.type === "skripsi") {
              return <SkripsiCard key={item.id} skripsi={item as Skripsi} onEdit={handleEditItem} onDelete={handleDeleteItem} onViewDetail={handleViewDetail} />;
            }
            return null; 
          })
        ) : (
          <div className="col-span-full text-center py-16">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Tidak ada {category === "book" ? "buku" : category === "journal" ? "jurnal" : category === "skripsi" ? "skripsi" : "item"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {search ? "Tidak ada item yang sesuai dengan pencarian." : `Mulai dengan menambahkan ${category}.`}
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-3 py-1 rounded border text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Prev
          </button>
          <span className="px-2 text-sm">
            Halaman {page} dari {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}

      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-30 backdrop-blur-sm transition duration-300">
          <div className="animate-fadeIn max-h-[90vh] w-full max-w-2xl scale-[0.98] overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {formInput.id ? `Edit ${category === "book" ? "Buku" : category === "journal" ? "Jurnal" : "Skripsi"}` : `Tambah ${category === "book" ? "Buku" : category === "journal" ? "Jurnal" : "Skripsi"} Baru`}
              </h2>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <form className="space-y-3" onSubmit={handleAddItem}>
          
                {formErrors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <div className="text-red-800 text-sm">{formErrors.general}</div>
                  </div>
                )}

                <div>
                  <label htmlFor={`${category}-id-input`} className="mb-2 block text-sm font-medium text-gray-700">
                    ID {category === "book" ? "Buku" : category === "journal" ? "Jurnal" : "Skripsi"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={`${category}-id-input`}
                    type="text"
                    name="id"
                    value={formInput.id}
                    onChange={handleFormChange}
                    className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.id ? "border-red-500 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder={`Masukkan ID unik untuk ${category}`}
                  />
                  {formErrors.id && <p className="text-red-500 text-xs mt-1">{formErrors.id}</p>}
                </div>

                <div>
                  <label htmlFor={`${category}-judul-input`} className="mb-2 block text-sm font-medium text-gray-700">
                    Judul {category === "book" ? "Buku" : category === "journal" ? "Jurnal" : "Skripsi"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={`${category}-judul-input`}
                    type="text"
                    name="judul"
                    value={formInput.judul}
                    onChange={handleFormChange}
                    className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.judul ? "border-red-500 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder={`Masukkan judul ${category}`}
                  />
                  {formErrors.judul && <p className="text-red-500 text-xs mt-1">{formErrors.judul}</p>}
                </div>

                {category === "book" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="book-pengarang-input" className="mb-2 block text-sm font-medium text-gray-700">
                        Pengarang ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="book-pengarang-input"
                        type="text"
                        name="pengarang_id"
                        value={(formInput as BookFormInput).pengarang_id || ""}
                        onChange={handleFormChange}
                        className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.pengarang_id ? "border-red-500 bg-red-50" : "border-gray-300"
                        }`}
                        placeholder="Masukkan ID pengarang"
                      />
                      {formErrors.pengarang_id && <p className="text-red-500 text-xs mt-1">{formErrors.pengarang_id}</p>}
                    </div>
                    <div>
                      <label htmlFor="book-penerbit-input" className="mb-2 block text-sm font-medium text-gray-700">
                        Penerbit ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="book-penerbit-input"
                        type="text"
                        name="penerbit_id"
                        value={(formInput as BookFormInput).penerbit_id || ""}
                        onChange={handleFormChange}
                        className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.penerbit_id ? "border-red-500 bg-red-50" : "border-gray-300"
                        }`}
                        placeholder="Masukkan ID penerbit"
                      />
                      {formErrors.penerbit_id && <p className="text-red-500 text-xs mt-1">{formErrors.penerbit_id}</p>}
                    </div>
                  </div>
                )}

                {category === "journal" && (
                  <div>
                    <label htmlFor="journal-jurnalid-input" className="mb-2 block text-sm font-medium text-gray-700">
                      Jurnal ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="journal-jurnalid-input"
                      type="text"
                      name="jurnal_id"
                      value={(formInput as JournalFormInput).jurnal_id || ""}
                      onChange={handleFormChange}
                      className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.jurnal_id ? "border-red-500 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="Masukkan ID jurnal"
                    />
                    {formErrors.jurnal_id && <p className="text-red-500 text-xs mt-1">{formErrors.jurnal_id}</p>}
                  </div>
                )}

                {category === "skripsi" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="skripsi-nim-input" className="mb-2 block text-sm font-medium text-gray-700">
                        NIM <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="skripsi-nim-input"
                        type="text"
                        name="nim"
                        value={(formInput as SkripsiFormInput).nim || ""}
                        onChange={handleFormChange}
                        className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.nim ? "border-red-500 bg-red-50" : "border-gray-300"
                        }`}
                        placeholder="Masukkan NIM mahasiswa"
                      />
                      {formErrors.nim && <p className="text-red-500 text-xs mt-1">{formErrors.nim}</p>}
                    </div>
                    <div>
                      <label htmlFor="skripsi-tahun-input" className="mb-2 block text-sm font-medium text-gray-700">
                        Tahun <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="skripsi-tahun-input"
                        type="text"
                        name="tahun"
                        value={(formInput as SkripsiFormInput).tahun || ""}
                        onChange={handleFormChange}
                        className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.tahun ? "border-red-500 bg-red-50" : "border-gray-300"
                        }`}
                        placeholder="Masukkan tahun skripsi"
                      />
                      {formErrors.tahun && <p className="text-red-500 text-xs mt-1">{formErrors.tahun}</p>}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor={`${category}-jumlah-input`} className="block text-sm font-medium text-gray-700 mb-1">
                      Total Eksemplar <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={`${category}-jumlah-input`}
                      type="number"
                      name="jumlah"
                      value={formInput.jumlah}
                      onChange={handleFormChange}
                      min="1"
                      className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.jumlah ? "border-red-500 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="1"
                    />
                    {formErrors.jumlah && <p className="text-red-500 text-xs mt-1">{formErrors.jumlah}</p>}
                  </div>

                  <div>
                    <label htmlFor={`${category}-tersedia-input`} className="block text-sm font-medium text-gray-700 mb-1">
                      Tersedia <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={`${category}-tersedia-input`}
                      type="number"
                      name="tersedia"
                      value={formInput.tersedia}
                      onChange={handleFormChange}
                      min="0"
                      className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.tersedia ? "border-red-500 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="1"
                    />
                    {formErrors.tersedia && <p className="text-red-500 text-xs mt-1">{formErrors.tersedia}</p>}
                  </div>

                  <div>
                    <label htmlFor={`${category}-dipinjam-input`} className="block text-sm font-medium text-gray-700 mb-1">
                      Dipinjam <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={`${category}-dipinjam-input`}
                      type="number"
                      name="dipinjam"
                      value={formInput.dipinjam}
                      onChange={handleFormChange}
                      min="0"
                      className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.dipinjam ? "border-red-500 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="0"
                    />
                    {formErrors.dipinjam && <p className="text-red-500 text-xs mt-1">{formErrors.dipinjam}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`${category}-createdAt-input`} className="block text-sm font-medium text-gray-700 mb-1">
                      Tanggal Dibuat <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={`${category}-createdAt-input`}
                      type="date"
                      name="createdAt"
                      value={formInput.createdAt}
                      onChange={handleFormChange}
                      className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.createdAt ? "border-red-500 bg-red-50" : "border-gray-300"
                      }`}
                    />
                    {formErrors.createdAt && <p className="text-red-500 text-xs mt-1">{formErrors.createdAt}</p>}
                  </div>

                  <div>
                    <label htmlFor={`${category}-updatedAt-input`} className="block text-sm font-medium text-gray-700 mb-1">
                      Terakhir Diperbarui <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={`${category}-updatedAt-input`}
                      type="date"
                      name="updatedAt"
                      value={formInput.updatedAt}
                      onChange={handleFormChange}
                      className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.updatedAt ? "border-red-500 bg-red-50" : "border-gray-300"
                      }`}
                    />
                    {formErrors.updatedAt && <p className="text-red-500 text-xs mt-1">{formErrors.updatedAt}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor={`${category}-abstrak-input`} className="mb-2 block text-sm font-medium text-gray-700">
                    Abstrak <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id={`${category}-abstrak-input`}
                    rows={4}
                    name="abstrak"
                    value={formInput.abstrak}
                    onChange={handleFormChange}
                    className={`w-full resize-none rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.abstrak ? "border-red-500 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder={`Masukkan abstrak ${category}`}
                  />
                  {formErrors.abstrak && <p className="text-red-500 text-xs mt-1">{formErrors.abstrak}</p>}
                </div>

                <div className="mt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormModalOpen(false)}
                    className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    {formInput.id ? "Update" : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isDetailModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-30 backdrop-blur-sm transition duration-300">
          <div className="animate-fadeIn max-h-[90vh] w-full max-w-2xl scale-[0.98] overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-between p-3 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Detail {selectedItem.type === "book" ? "Buku" : selectedItem.type === "journal" ? "Jurnal" : "Skripsi"}</h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedItem.judul}</h3>
                <p className="text-sm text-gray-500">ID: {selectedItem.id}</p>
              </div>

              {selectedItem.type === "book" && (
                <>
                  <p className="text-gray-700"><strong>Pengarang ID:</strong> {(selectedItem as Book).pengarang_id}</p>
                  <p className="text-gray-700"><strong>Penerbit ID:</strong> {(selectedItem as Book).penerbit_id}</p>
                </>
              )}
              {selectedItem.type === "journal" && (
                <p className="text-gray-700"><strong>Jurnal ID:</strong> {(selectedItem as Journal).jurnal_id}</p>
              )}
              {selectedItem.type === "skripsi" && (
                <>
                  <p className="text-gray-700"><strong>NIM:</strong> {(selectedItem as Skripsi).nim}</p>
                  <p className="text-gray-700"><strong>Tahun:</strong> {(selectedItem as Skripsi).tahun}</p>
                </>
              )}

              <p className="text-gray-700"><strong>Abstrak:</strong> {selectedItem.abstrak}</p>
              <div className="grid grid-cols-3 gap-2 text-sm text-gray-700 border-t pt-4">
                <p><strong>Total:</strong> {selectedItem.jumlah}</p>
                <p><strong>Tersedia:</strong> {selectedItem.tersedia}</p>
                <p><strong>Dipinjam:</strong> {selectedItem.dipinjam}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                <p><strong>Dibuat:</strong> {formatDateForInput(selectedItem.createdAt)}</p>
                <p><strong>Diperbarui:</strong> {formatDateForInput(selectedItem.updatedAt)}</p>
              </div>
              {selectedItem.count !== undefined && (
                <div className="text-right text-sm text-gray-600 border-t pt-4 font-semibold">
                  Dilihat: {selectedItem.count} kali
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}