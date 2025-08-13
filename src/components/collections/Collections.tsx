"use client";

import { useState } from "react";
import { Plus, BookOpen } from "lucide-react";
import { ItemsList } from "@/components/collections/ItemList";
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
import LibrarySkeletonLoading from "@/components/library/LibrarySkeletonLoading";
import { ZodError } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { useGetStats } from "@/hooks/useGetStatsCount";

export default function Collections() {
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
  const { data, loading: statsLoading, error } = useGetStats();

  const [selectedViewMode, setSelectedViewMode] = useState<
    "overview" | LibraryItemType
  >("overview");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [formInput, setFormInput] = useState<FormInput>(
    getInitialFormInput("book"),
  );
  // Initialize formErrors with empty object to prevent undefined error
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { role } = useAuth();

  const handleOpenFormModal = (itemType: LibraryItemType) => {
    setCategory(itemType);
    setFormInput(getInitialFormInput(itemType));
    setFormErrors({}); // Reset errors
    setIsEditMode(false);
    setSelectedItem(null); // Reset selected item
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

    // Clear field error when user starts typing
    if (formErrors && formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  // submitting issue
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setFormErrors({});

  //   let newErrors: { [key: string]: string } = {};
  //   let payload: any;
  //   let endpoint = "";
  //   let isUpdating = isEditMode && selectedItem;
  //   let itemId = (formInput as any).id;

  //   // Common validation
  //   if (category !== "journal" && (!formInput.id || !formInput.id.trim())) {
  //     newErrors.id = "ID wajib diisi";
  //   }
  //   if (!formInput.judul?.trim()) {
  //     newErrors.judul = "Judul wajib diisi";
  //   }
  //   if (!formInput.jumlah || Number(formInput.jumlah) < 1) {
  //     newErrors.jumlah = "Jumlah harus minimal 1";
  //   }
  //   if (formInput.tersedia === undefined || Number(formInput.tersedia) < 0) {
  //     newErrors.tersedia = "Tersedia tidak boleh negatif";
  //   }
  //   if (formInput.dipinjam === undefined || Number(formInput.dipinjam) < 0) {
  //     newErrors.dipinjam = "Dipinjam tidak boleh negatif";
  //   }

  //   const jumlahNum = Number(formInput.jumlah);
  //   const tersediaNum = Number(formInput.tersedia);
  //   const dipinjamNum = Number(formInput.dipinjam);

  //   if (tersediaNum + dipinjamNum !== jumlahNum) {
  //     newErrors.general =
  //       "Jumlah tersedia + dipinjam harus sama dengan total jumlah";
  //   }

  //   if (!formInput.createdAt) {
  //     newErrors.createdAt = "Tanggal dibuat wajib diisi";
  //   }
  //   if (!formInput.updatedAt) {
  //     newErrors.updatedAt = "Tanggal diperbarui wajib diisi";
  //   }

  //   // Category specific validation and payload
  //   if (category === "book") {
  //     const bookFormInput = formInput as BookFormInput;
  //     if (!bookFormInput.pengarang_name?.trim()) {
  //       newErrors.pengarang_name = "Nama pengarang wajib diisi";
  //     }
  //     if (!bookFormInput.penerbit_name?.trim()) {
  //       newErrors.penerbit_name = "Nama penerbit wajib diisi";
  //     }
  //     payload = {
  //       id: bookFormInput.id?.trim(),
  //       judul: bookFormInput.judul?.trim(),
  //       abstrak: "karena buku hanya ada sinopsis",
  //       lokasi: bookFormInput.lokasi?.trim(),
  //       sinopsis: bookFormInput.sinopsis?.trim(),
  //       rak: bookFormInput.rak?.trim(),
  //       jumlah: jumlahNum,
  //       tersedia: tersediaNum,
  //       dipinjam: dipinjamNum,
  //       pengarang_name: bookFormInput.pengarang_name?.trim(),
  //       pengarang_nationality: bookFormInput.pengarang_nationality?.trim(),
  //       penerbit_name: bookFormInput.penerbit_name?.trim(),
  //       createdAt: bookFormInput.createdAt,
  //       updatedAt: bookFormInput.updatedAt,
  //     };
  //     endpoint = "/api/books";
  //   } else if (category === "journal") {
  //     const journalFormInput = formInput as JournalFormInput;
  //     if (!journalFormInput.publikasi_name?.trim()) {
  //       newErrors.publikasi_name = "Nama publikasi wajib diisi";
  //     }
  //     payload = {
  //       id: journalFormInput.id?.trim() || undefined,
  //       judul: journalFormInput.judul?.trim(),
  //       abstrak: journalFormInput.abstrak?.trim(),
  //       jumlah: jumlahNum,
  //       tersedia: tersediaNum,
  //       dipinjam: dipinjamNum,
  //       jurnal_id: journalFormInput.jurnal_id?.trim() || undefined,
  //       publikasi_name: journalFormInput.publikasi_name?.trim(),
  //       publikasi_volume: journalFormInput.publikasi_volume?.trim(),
  //       publikasi_tahun: journalFormInput.publikasi_tahun?.trim(),
  //       authors: journalFormInput.authors?.trim(),
  //       link: journalFormInput.link?.trim(),
  //       createdAt: journalFormInput.createdAt,
  //       updatedAt: journalFormInput.updatedAt,
  //     };
  //     endpoint = "/api/journals";
  //   } else if (category === "skripsi") {
  //     const skripsiFormInput = formInput as SkripsiFormInput;
  //     if (!skripsiFormInput.tahun?.trim()) {
  //       newErrors.tahun = "Tahun wajib diisi";
  //     }
  //     if (!skripsiFormInput.nim?.trim()) {
  //       newErrors.nim = "NIM wajib diisi";
  //     }
  //     payload = {
  //       id: skripsiFormInput.id?.trim(),
  //       judul: skripsiFormInput.judul?.trim(),
  //       abstrak: skripsiFormInput.abstrak?.trim() || "",
  //       jumlah: jumlahNum,
  //       tersedia: tersediaNum,
  //       dipinjam: dipinjamNum,
  //       tahun: skripsiFormInput.tahun?.trim(),
  //       nim: skripsiFormInput.nim?.trim(),
  //       link: skripsiFormInput.link?.trim(),
  //       createdAt: skripsiFormInput.createdAt,
  //       updatedAt: skripsiFormInput.updatedAt,
  //     };
  //     endpoint = "/api/thesis";
  //   }

  //   if (Object.keys(newErrors).length > 0) {
  //     setFormErrors(newErrors);
  //     return;
  //   }

  //   try {
  //     console.log("trying....");

  //     const url = isUpdating ? `${endpoint}/${itemId}` : endpoint;
  //     const method = isUpdating ? "PUT" : "POST";

  //     const res = await fetch(url, {
  //       method,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!res.ok) {
  //       let errorMessage = `Gagal ${isUpdating ? "memperbarui" : "menambahkan"} ${category}`;
  //       try {
  //         const errorData = await res.json();
  //         if (errorData.error && errorData.error.issues) {
  //           const zodErrors: { [key: string]: string } = {};
  //           errorData.error.issues.forEach((issue: any) => {
  //             zodErrors[issue.path[0]] = issue.message;
  //           });
  //           setFormErrors(zodErrors);
  //           showNotification("Validasi gagal: Periksa input Anda.", "error");
  //           return;
  //         }
  //         errorMessage = errorData.message || errorMessage;
  //       } catch (jsonParseError) {
  //         console.error("Failed to parse error response:", jsonParseError);
  //       }
  //       showNotification(errorMessage, "error");
  //       return;
  //     }

  //     const json = await res.json();

  //     if (json.success) {
  //       showNotification(
  //         `${category} berhasil ${isUpdating ? "diperbarui" : "ditambahkan"}!`,
  //         "success",
  //       );
  //       setIsFormModalOpen(false);
  //       await fetchItems();
  //       if (!isUpdating) {
  //         setPage(1);
  //       }
  //     } else {
  //       showNotification(
  //         json.message ||
  //           `Gagal ${isUpdating ? "memperbarui" : "menambahkan"} ${category}`,
  //         "error",
  //       );
  //     }
  //   } catch (error: any) {
  //     console.error("Error saving item:", error);
  //     if (error instanceof ZodError) {
  //       const zodErrors: { [key: string]: string } = {};
  //       error.errors.forEach((issue) => {
  //         zodErrors[issue.path[0]] = issue.message;
  //       });
  //       setFormErrors(zodErrors);
  //       showNotification("Validasi gagal. Periksa input Anda.", "error");
  //     } else {
  //       showNotification("Terjadi kesalahan yang tidak diketahui.", "error");
  //     }
  //   }
  // };

  // solution:
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

    let jumlahNum = 0,
      tersediaNum = 0,
      dipinjamNum = 0;
    if (category === "book") {
      if (!formInput.jumlah || Number(formInput.jumlah) < 1)
        newErrors.jumlah = "Jumlah harus minimal 1";
      if (!formInput.tersedia || Number(formInput.tersedia) < 0)
        newErrors.tersedia = "Tersedia tidak boleh negatif";
      if (!formInput.dipinjam || Number(formInput.dipinjam) < 0)
        newErrors.dipinjam = "Dipinjam tidak boleh negatif";
      jumlahNum = Number(formInput.jumlah);
      tersediaNum = Number(formInput.tersedia);
      dipinjamNum = Number(formInput.dipinjam);
      if (tersediaNum + dipinjamNum !== jumlahNum) {
        newErrors.general =
          "Jumlah tersedia + dipinjam harus sama dengan total jumlah";
      }
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
        jurnal_id: journalFormInput.jurnal_id?.trim() || undefined,
        publikasi_name: journalFormInput.publikasi_name?.trim(),
        publikasi_volume: journalFormInput.publikasi_volume?.trim(),
        publikasi_tahun: journalFormInput.publikasi_tahun?.trim(),
        authors: journalFormInput.authors?.trim(),
        link: journalFormInput.link?.trim(),
        createdAt: journalFormInput.createdAt,
        updatedAt: journalFormInput.updatedAt,
      };
      delete payload.jumlah;
      delete payload.tersedia;
      delete payload.dipinjam;
      endpoint = "/api/journals";
      isUpdating = items.some(
        (item) => item.id === journalFormInput.id && item.type === "journal",
      );
    } else if (category === "skripsi") {
      const skripsiFormInput = formInput as SkripsiFormInput;
      if (!skripsiFormInput.tahun?.trim())
        newErrors.tahun = "Tahun wajib diisi";
      if (!skripsiFormInput.nim?.trim()) newErrors.nim = "NIM wajib diisi";
      if (!skripsiFormInput.nama_mahasiswa?.trim())
        newErrors.nama_mahasiswa = "Nama mahasiswa wajib diisi";
      if (!skripsiFormInput.fakultas?.trim())
        newErrors.fakultas = "Fakultas wajib diisi";
      if (!skripsiFormInput.program_studi?.trim())
        newErrors.program_studi = "Program studi wajib diisi";
      const createdAt =
        skripsiFormInput.createdAt &&
        !isNaN(Date.parse(skripsiFormInput.createdAt))
          ? new Date(skripsiFormInput.createdAt).toISOString()
          : new Date().toISOString();
      const updatedAt =
        skripsiFormInput.updatedAt &&
        !isNaN(Date.parse(skripsiFormInput.updatedAt))
          ? new Date(skripsiFormInput.updatedAt).toISOString()
          : new Date().toISOString();
      payload = {
        id: skripsiFormInput.id.trim(),
        judul: skripsiFormInput.judul.trim(),
        abstrak: skripsiFormInput.abstrak?.trim() || "",
        tahun: skripsiFormInput.tahun?.trim() || "N/A",
        nim: skripsiFormInput.nim?.trim() || "N/A",
        nama_mahasiswa: skripsiFormInput.nama_mahasiswa?.trim() || "N/A",
        fakultas: skripsiFormInput.fakultas?.trim() || "N/A",
        program_studi: skripsiFormInput.program_studi?.trim() || "N/A",
        link: skripsiFormInput.link?.trim(),
        createdAt,
        updatedAt,
      };
      delete payload.jumlah;
      delete payload.tersedia;
      delete payload.dipinjam;
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
      console.log("trying...");
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

  const handleEditItem = (item: LibraryItem) => {
    setSelectedItem(item);
    setIsFormModalOpen(true);
    setIsEditMode(true);

    console.log(item, "<----- item");

    if (item.type === "book") {
      setFormInput({
        id: item.id || "",
        judul: item.judul,
        abstrak: "karena buku hanya ada sinopsis",
        lokasi: (item as any).lokasi || "",
        sinopsis: (item as any).sinopsis || "",
        rak: (item as any).rak || "",
        jumlah: item.jumlah?.toString() || 0,
        tersedia: item.tersedia?.toString() || 0,
        dipinjam: item.dipinjam?.toString() || 0,
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
        jumlah: item.jumlah?.toString() || 0,
        tersedia: item.tersedia?.toString() || 0,
        dipinjam: item.dipinjam?.toString() || 0,
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
        // jumlah: item.jumlah.toString(),
        // tersedia: item.tersedia.toString(),
        // dipinjam: item.dipinjam.toString(),
        tahun: (item as any).tahun,
        nim: (item as any).nim,
        nama_mahasiswa: (item as any).nama_mahasiswa || "",
        fakultas: (item as any).fakultas || "",
        program_studi: (item as any).program_studi || "",
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

    // Update view count locally
    setItems((prevItems: LibraryItem[]) =>
      prevItems.map((i: LibraryItem) =>
        i.id === item.id && i.type === item.type
          ? { ...i, count: (i.count || 0) + 1 }
          : i,
      ),
    );

    // Call API to increment view count
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
        throw new Error(`HTTP error! status: ${res.status}`);
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

        // Check if we need to go to previous page
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Manajemen Koleksi Perpustakaan
        </h1>
        <p className="text-gray-600">
          Kelola dan pantau semua koleksi perpustakaan dalam satu tempat
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Koleksi */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-blue-100 p-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Koleksi</p>
              {statsLoading ? (
                <div className="h-6 w-20 animate-pulse rounded bg-blue-200" />
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {(data?.bookcount ?? 0) +
                    (data?.journalcount ?? 0) +
                    (data?.skripsicount ?? 0)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Buku */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-green-100 p-3">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Buku</p>
              {statsLoading ? (
                <div className="h-6 w-20 animate-pulse rounded bg-green-200" />
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {data?.bookcount ?? 0}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Jurnal */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-purple-100 p-3">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Jurnal</p>
              {statsLoading ? (
                <div className="h-6 w-20 animate-pulse rounded bg-purple-200" />
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {data?.journalcount ?? 0}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Skripsi */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-orange-100 p-3">
              <BookOpen className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Skripsi</p>
              {statsLoading ? (
                <div className="h-6 w-20 animate-pulse rounded bg-orange-200" />
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {data?.skripsicount ?? 0}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {role === "admin" && (
        <div className="mb-6">
          <div className="flex gap-3">
            <button
              onClick={() => handleOpenFormModal("book")}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              <Plus size={16} />
              Tambah Buku
            </button>
            <button
              onClick={() => handleOpenFormModal("journal")}
              className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
            >
              <Plus size={16} />
              Tambah Jurnal
            </button>
            <button
              onClick={() => handleOpenFormModal("skripsi")}
              className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700"
            >
              <Plus size={16} />
              Tambah Skripsi
            </button>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="mb-6">
        <LibraryFilter
          search={search}
          category={category}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Notification */}
      <LibraryNotification notification={notification} />

      {/* Items List */}
      <div className="mb-6">
        <ItemsList
          items={items}
          selectedViewMode={selectedViewMode}
          onEditItem={handleEditItem}
          onViewDetail={handleViewDetail}
          onDeleteItem={handleDeleteItem}
          role={role}
          loading={loading}
        />
      </div>

      {/* Pagination */}
      <LibraryPagination
        page={page}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* Modals */}
      <LibraryFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        category={category}
        formInput={formInput}
        formErrors={formErrors || {}} // Ensure it's never undefined
        onChange={handleFormChange}
        onSubmit={handleAddItem} //handleSubmit
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
