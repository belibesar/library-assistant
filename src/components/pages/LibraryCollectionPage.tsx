"use client";

import { useState } from "react";
import { Plus, BookOpen } from "lucide-react";
import { BookCard } from "@/components/library/BookCard";
import { JournalCard } from "@/components/library/JournalCard";
import { SkripsiCard } from "@/components/library/SkripsiCard";
import { LibraryFilter } from "@/components/library/LibraryFilter";
import { LibraryFormModal } from "@/components/library/LibraryFormModal";
import { LibraryDetailModal } from "@/components/library/LibraryDetailModal";
import { LibraryNotification } from "@/components/library/LibraryNotification";
import { LibraryPagination } from "@/components/library/LibraryPagination";
import {
  BookFormInput,
  FormInput,
  JournalFormInput,
  LibraryItem,
  LibraryItemType,
  Notification,
  SkripsiFormInput,
} from "@/libs/types/libraryType";
import { getInitialFormInput, endpointMap } from "@/utils/libraryUtil";
import { useLibraryItems } from "@/hooks/useLibraryItems";
import LibrarySkeletonLoading from "../library/LibrarySkeletonLoading";
import { ZodError } from "zod";
import { useAuth } from "@/contexts/AuthContext";

export default function LibraryCollectionPage() {
  const {
    search,
    category,
    items,
    setItems,
    page,
    setPage,
    total,
    setTotal,
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
  } = useLibraryItems();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [formInput, setFormInput] = useState<FormInput>(
    getInitialFormInput("book"),
  );
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { role } = useAuth();

  const handleOpenFormModal = (itemType: LibraryItemType) => {
    setCategory(itemType);
    setFormInput(getInitialFormInput(itemType));
    setFormErrors({});
    setIsEditMode(false);
    setIsFormModalOpen(true);
    setTimeout(() => {
      const idInput = document.getElementById(`${itemType}-id-input`);
      if (idInput) {
        (idInput as HTMLInputElement).focus();
      }
    }, 100);
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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

    if (category !== "journal" && (!formInput.id || !formInput.id.trim()))
      newErrors.id = "ID wajib diisi";
    if (!formInput.judul.trim()) newErrors.judul = "Judul wajib diisi";
    if (!formInput.jumlah || Number(formInput.jumlah) < 1)
      newErrors.jumlah = "Jumlah harus minimal 1";
    if (!formInput.tersedia || Number(formInput.tersedia) < 0)
      newErrors.tersedia = "Tersedia tidak boleh negatif";
    if (!formInput.dipinjam || Number(formInput.dipinjam) < 0)
      newErrors.dipinjam = "Dipinjam tidak boleh negatif";

    const jumlahNum = Number(formInput.jumlah);
    const tersediaNum = Number(formInput.tersedia);
    const dipinjamNum = Number(formInput.dipinjam);

    if (tersediaNum + dipinjamNum !== jumlahNum) {
      newErrors.general =
        "Jumlah tersedia + dipinjam harus sama dengan total jumlah";
    }

    if (!formInput.createdAt)
      newErrors.createdAt = "Tanggal dibuat wajib diisi";
    if (!formInput.updatedAt)
      newErrors.updatedAt = "Tanggal diperbarui wajib diisi";

    if (category === "book") {
      const bookFormInput = formInput as BookFormInput;
      if (!bookFormInput.pengarang_name?.trim())
        newErrors.pengarang_name = "Nama pengarang wajib diisi";
      if (!bookFormInput.penerbit_name?.trim())
        newErrors.penerbit_name = "Nama penerbit wajib diisi";
      payload = {
        id: bookFormInput.id.trim(),
        judul: bookFormInput.judul.trim(),
        abstrak: "karena buku hanya ada sinopsis",
        lokasi: bookFormInput.lokasi?.trim(),
        sinopsis: bookFormInput.sinopsis?.trim(),
        rak: bookFormInput.rak?.trim(),
        jumlah: jumlahNum,
        tersedia: tersediaNum,
        dipinjam: dipinjamNum,
        pengarang_name: bookFormInput.pengarang_name?.trim(),
        pengarang_nationality: bookFormInput.pengarang_nationality?.trim(),
        penerbit_name: bookFormInput.penerbit_name?.trim(),
        createdAt: bookFormInput.createdAt,
        updatedAt: bookFormInput.updatedAt,
      };
      endpoint = "/api/books";
      isUpdating = items.some(
        (item) => item.id === bookFormInput.id && item.type === "book",
      );
    } else if (category === "journal") {
      const journalFormInput = formInput as JournalFormInput;
      if (!journalFormInput.publikasi_name?.trim())
        newErrors.publikasi_name = "Nama publikasi wajib diisi";
      payload = {
        id: journalFormInput.id?.trim() || undefined,
        judul: journalFormInput.judul.trim(),
        abstrak: journalFormInput.abstrak?.trim(),
        jumlah: jumlahNum,
        tersedia: tersediaNum,
        dipinjam: dipinjamNum,
        jurnal_id: journalFormInput.jurnal_id?.trim() || undefined,
        publikasi_name: journalFormInput.publikasi_name?.trim(),
        publikasi_volume: journalFormInput.publikasi_volume?.trim(),
        publikasi_tahun: journalFormInput.publikasi_tahun?.trim(),
        authors: journalFormInput.authors?.trim(),
        link: journalFormInput.link?.trim(),
        createdAt: journalFormInput.createdAt,
        updatedAt: journalFormInput.updatedAt,
      };
      endpoint = "/api/journals";
      isUpdating = items.some(
        (item) => item.id === journalFormInput.id && item.type === "journal",
      );
    } else if (category === "skripsi") {
      const skripsiFormInput = formInput as SkripsiFormInput;
      if (!skripsiFormInput.tahun.trim()) newErrors.tahun = "Tahun wajib diisi";
      if (!skripsiFormInput.nim.trim()) newErrors.nim = "NIM wajib diisi";
      payload = {
        id: skripsiFormInput.id.trim(),
        judul: skripsiFormInput.judul.trim(),
        abstrak: skripsiFormInput.abstrak?.trim() || "",
        jumlah: jumlahNum,
        tersedia: tersediaNum,
        dipinjam: dipinjamNum,
        tahun: skripsiFormInput.tahun.trim(),
        nim: skripsiFormInput.nim.trim(),
        link: skripsiFormInput.link?.trim(),
        createdAt: skripsiFormInput.createdAt,
        updatedAt: skripsiFormInput.updatedAt,
      };
      endpoint = "/api/thesis";
      isUpdating = items.some(
        (item) => item.id === skripsiFormInput.id && item.type === "skripsi",
      );
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
        let errorMessage = `Gagal ${isUpdating ? "memperbarui" : "menambahkan"} ${category}`;
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
          `${category} berhasil ${isUpdating ? "diperbarui" : "ditambahkan"}!`,
          "success",
        );
        setIsFormModalOpen(false);
        await fetchItems();
        if (!isUpdating) {
          setPage(1);
        }
      } else {
        showNotification(
          json.message ||
            `Gagal ${isUpdating ? "memperbarui" : "menambahkan"} ${category}`,
          "error",
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

  const handleDeleteItem = async (id: string, itemType: LibraryItemType) => {
    if (!id || !itemType) {
      showNotification("ID atau tipe item tidak valid", "error");
      return;
    }

    const itemToDelete = items.find(
      (item: LibraryItem) => item.id === id && item.type === itemType,
    );
    const itemTitle = itemToDelete ? itemToDelete.judul : "item ini";

    if (
      !confirm(
        `Anda yakin ingin menghapus "${itemTitle}" (${itemType})?\nTindakan ini tidak dapat dibatalkan.`,
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/${endpointMap[itemType]}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
      }

      const json = await res.json();

      if (json.success) {
        showNotification(`${itemType} berhasil dihapus!`, "success");
        setItems((prevItems: LibraryItem[]) =>
          prevItems.filter(
            (item: LibraryItem) => !(item.id === id && item.type === itemType),
          ),
        );
        setTotal((prevTotal: number) => prevTotal - 1);

        const remainingItemsOnPage = items.filter(
          (item: LibraryItem) => !(item.id === id && item.type === itemType),
        ).length;
        if (remainingItemsOnPage === 0 && page > 1) {
          setPage(page - 1);
        }

        setTimeout(() => {
          fetchItems();
        }, 500);
      } else {
        showNotification(
          json.message || `Gagal menghapus ${itemType}.`,
          "error",
        );
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      showNotification(
        "Terjadi kesalahan jaringan saat menghapus item.",
        "error",
      );
    }
  };

  const handleEditItem = (item: LibraryItem) => {
    setSelectedItem(item);
    setIsFormModalOpen(true);
    setIsEditMode(true);
    if (item.type === "book") {
      setFormInput({
        id: item.id || "",
        judul: item.judul,
        abstrak: "karena buku hanya ada sinopsis",
        lokasi: (item as any).lokasi || "",
        sinopsis: (item as any).sinopsis || "",
        rak: (item as any).rak || "",
        jumlah: item.jumlah.toString(),
        tersedia: item.tersedia.toString(),
        dipinjam: item.dipinjam.toString(),
        penerbit_id: (item as any).penerbit_id,
        pengarang_id: (item as any).pengarang_id,
        pengarang_name: (item as any).pengarang?.name || "",
        pengarang_nationality: (item as any).pengarang?.nationality || "",
        penerbit_name: (item as any).penerbit?.name || "",
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      } as any);
    } else if (item.type === "journal") {
      setFormInput({
        id: item.id || "",
        judul: item.judul,
        abstrak: item.abstrak,
        jumlah: item.jumlah.toString(),
        tersedia: item.tersedia.toString(),
        dipinjam: item.dipinjam.toString(),
        jurnal_id: (item as any).jurnal_id,
        publikasi_name: (item as any).publikasi?.name || "",
        publikasi_volume: (item as any).publikasi?.volume || "",
        publikasi_tahun: (item as any).publikasi?.tahun || "",
        authors: (item as any).authors || "",
        link: (item as any).link || "",
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      } as any);
    } else if (item.type === "skripsi") {
      setFormInput({
        id: item.id || "",
        judul: item.judul,
        abstrak: item.abstrak,
        jumlah: item.jumlah.toString(),
        tersedia: item.tersedia.toString(),
        dipinjam: item.dipinjam.toString(),
        tahun: (item as any).tahun,
        nim: (item as any).nim,
        link: (item as any).link || "",
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      } as any);
    }
    setCategory(item.type);
    setFormErrors({});
  };

  const handleViewDetail = async (item: LibraryItem) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);

    setItems((prevItems: LibraryItem[]) =>
      prevItems.map((i: LibraryItem) =>
        i.id === item.id && i.type === item.type
          ? { ...i, count: (i.count || 0) + 1 }
          : i,
      ),
    );

    try {
      const res = await fetch(
        `/api/${endpointMap[item.type]}/${item.id}/view`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        },
      );
      if (!res.ok) {
        console.error(
          `Failed to increment view count for ${item.type} ${item.id}`,
        );
      }
    } catch (error) {
      console.error(
        `Error calling view API for ${item.type} ${item.id}:`,
        error,
      );
    }
  };

  console.log(selectedItem);

  return (
    <div className="bg-base-100 mt-[-20px] h-full w-full">
      <div className="bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Koleksi Perpustakaan
            </h1>
            <p className="mt-1 text-gray-600">
              Kelola koleksi{" "}
              {category === "book"
                ? "buku"
                : category === "journal"
                  ? "jurnal"
                  : category === "skripsi"
                    ? "skripsi"
                    : ""}{" "}
              ({total} total item)
            </p>
          </div>
          {role === "admin" && (
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
          )}
        </div>
      </div>

      <div className="flex w-full flex-col py-2">
        <LibraryFilter
          search={search}
          category={category}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <LibraryNotification notification={notification} />

      <div className="grid grid-cols-1 gap-4 pt-4">
        {loading ? (
          <LibrarySkeletonLoading count={3} />
        ) : items.length > 0 ? (
          items.map((item) => {
            if (item.type === "book") {
              return (
                <BookCard
                  key={item?._id as string}
                  book={item}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                  onViewDetail={handleViewDetail}
                />
              );
            } else if (item.type === "journal") {
              return (
                <JournalCard
                  key={item.id}
                  journal={item}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                  onViewDetail={handleViewDetail}
                />
              );
            } else if (item.type === "skripsi") {
              return (
                <SkripsiCard
                  key={item.id}
                  skripsi={item}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                  onViewDetail={handleViewDetail}
                />
              );
            }
            return null;
          })
        ) : (
          <div className="col-span-full py-16 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Tidak ada{" "}
              {category === "book"
                ? "buku"
                : category === "journal"
                  ? "jurnal"
                  : category === "skripsi"
                    ? "skripsi"
                    : "item"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {search
                ? "Tidak ada item yang sesuai dengan pencarian."
                : `Mulai dengan menambahkan ${category}.`}
            </p>
          </div>
        )}
      </div>

      <LibraryPagination
        page={page}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <LibraryFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
        }}
        category={category}
        formInput={formInput}
        formErrors={formErrors}
        onChange={handleFormChange}
        onSubmit={handleAddItem}
        isEditMode={isEditMode}
      />

      <LibraryDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        item={selectedItem}
      />
    </div>
  );
}
