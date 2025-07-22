"use client";

import { useState, useEffect } from "react";
import { Search, Filter, BookOpen, Edit3, Trash2, Plus } from "lucide-react";
import { ZodError } from "zod";

interface Book {
  id: string;
  judul: string;
  abstrak: string;
  jumlah: number;
  tersedia: number;
  dipinjam: number;
  penerbit_id: string;
  pengarang_id: string;
  createdAt?: string;
  updatedAt?: string;
}

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

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formInput, setFormInput] = useState<BookFormInput>({
    id: "",
    judul: "",
    abstrak: "",
    jumlah: "",
    tersedia: "",
    dipinjam: "",
    penerbit_id: "",
    pengarang_id: "",
    createdAt: "",
    updatedAt: "",
  });
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

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (search) params.append("search", search);

      const res = await fetch(`/api/books?${params.toString()}`);

      if (!res.ok) {
        let errorMessage = `Gagal mengambil data buku (Status: ${res.status})`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonParseError) {
          console.error("Failed to parse error response:", jsonParseError);
        }
        showNotification(errorMessage, "error");
        setBooks([]);
        setTotal(0);
        return;
      }

      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        const mappedBooks: Book[] = json.data.map((item: any) => ({
          id: item._id?.$oid || item._id || item.id,
          judul: item.judul || "",
          abstrak: item.abstrak || "",
          jumlah: Number(item.jumlah) || 0,
          tersedia: Number(item.tersedia) || 0,
          dipinjam: Number(item.dipinjam) || 0,
          penerbit_id: item.penerbit_id || "",
          pengarang_id: item.pengarang_id || "",
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }));
        setBooks(mappedBooks);
        setTotal(json.pagination?.totalItems || json.total || mappedBooks.length);
      } else {
        setBooks([]);
        setTotal(0);
        showNotification(json.message || "Gagal mengambil data buku.", "error");
      }
    } catch (e: any) {
      console.error("Error fetching books:", e);
      setBooks([]);
      setTotal(0);
      showNotification("Terjadi kesalahan jaringan saat mengambil buku.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, limit, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const totalPages = Math.ceil(total / limit);
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const handleModalOpen = () => {
    setFormInput({
      id: "",
      judul: "",
      abstrak: "",
      jumlah: "",
      tersedia: "",
      dipinjam: "",
      penerbit_id: "",
      pengarang_id: "",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    });
    setFormErrors({});
    setIsModalOpen(true);
    
    setTimeout(() => {
      const titleInput = document.getElementById("book-id-input");
      if (titleInput) {
        (titleInput as HTMLInputElement).focus();
      }
    }, 100);
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

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    try {
      const newErrors: { [key: string]: string } = {};
      
      if (!formInput.id.trim()) newErrors.id = "ID wajib diisi";
      if (!formInput.judul.trim()) newErrors.judul = "Judul wajib diisi";
      if (!formInput.abstrak.trim()) newErrors.abstrak = "Abstrak wajib diisi";
      if (!formInput.jumlah || Number(formInput.jumlah) < 1) newErrors.jumlah = "Jumlah harus minimal 1";
      if (!formInput.tersedia || Number(formInput.tersedia) < 0) newErrors.tersedia = "Tersedia tidak boleh negatif";
      if (!formInput.dipinjam || Number(formInput.dipinjam) < 0) newErrors.dipinjam = "Dipinjam tidak boleh negatif";
      if (!formInput.penerbit_id.trim()) newErrors.penerbit_id = "Penerbit ID wajib diisi";
      if (!formInput.pengarang_id.trim()) newErrors.pengarang_id = "Pengarang ID wajib diisi";
      if (!formInput.createdAt) newErrors.createdAt = "Tanggal dibuat wajib diisi";
      if (!formInput.updatedAt) newErrors.updatedAt = "Tanggal diperbarui wajib diisi";

      const jumlahNum = Number(formInput.jumlah);
      const tersediaNum = Number(formInput.tersedia);
      const dipinjamNum = Number(formInput.dipinjam);
      
      if (tersediaNum + dipinjamNum !== jumlahNum) {
        newErrors.general = "Jumlah tersedia + dipinjam harus sama dengan total jumlah";
      }

      if (Object.keys(newErrors).length > 0) {
        setFormErrors(newErrors);
        return;
      }

      const payload = {
        id: formInput.id.trim(),
        judul: formInput.judul.trim(),
        abstrak: formInput.abstrak.trim(),
        jumlah: Number(formInput.jumlah),
        tersedia: Number(formInput.tersedia),
        dipinjam: Number(formInput.dipinjam),
        penerbit_id: formInput.penerbit_id.trim(),
        pengarang_id: formInput.pengarang_id.trim(),
        createdAt: formInput.createdAt,
        updatedAt: formInput.updatedAt
      };

      const existingBook = books.find(book => book.id === formInput.id);
      const isUpdating = !!existingBook;
      
      const url = isUpdating ? `/api/books/${formInput.id}` : "/api/books";
      const method = isUpdating ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errorMessage = `Gagal ${isUpdating ? 'memperbarui' : 'menambahkan'} buku`;
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
          `Buku berhasil ${isUpdating ? 'diperbarui' : 'ditambahkan'}!`, 
          "success"
        );
        setIsModalOpen(false);
        
        await fetchBooks();
        
        if (!isUpdating) {
          setPage(1);
        }
      } else {
        showNotification(
          json.message || `Gagal ${isUpdating ? 'memperbarui' : 'menambahkan'} buku`,
          "error"
        );
      }
    } catch (error: any) {
      console.error("Error saving book:", error);
      
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

  const handleDeleteBook = async (id: string) => {
    if (!id) {
      showNotification("ID buku tidak valid", "error");
      return;
    }

    const bookToDelete = books.find(book => book.id === id);
    const bookTitle = bookToDelete ? bookToDelete.judul : "buku ini";
    
    if (!confirm(`Anda yakin ingin menghapus "${bookTitle}"?\nTindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        let errorMessage = `Gagal menghapus buku (Status: ${res.status})`;
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
        showNotification("Buku berhasil dihapus!", "success");
        
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        setTotal((prevTotal) => prevTotal - 1);
        
        const remainingBooksOnPage = books.filter(book => book.id !== id).length;
        if (remainingBooksOnPage === 0 && page > 1) {
          setPage(page - 1);
        }
        
        setTimeout(() => {
          fetchBooks();
        }, 500);
      } else {
        showNotification(json.message || "Gagal menghapus buku.", "error");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      showNotification("Terjadi kesalahan jaringan saat menghapus buku.", "error");
    }
  };

  const handleEditBook = (book: Book) => {
    setFormInput({
      id: book.id || "",
      judul: book.judul,
      abstrak: book.abstrak,
      jumlah: book.jumlah.toString(),
      tersedia: book.tersedia.toString(),
      dipinjam: book.dipinjam.toString(),
      penerbit_id: book.penerbit_id,
      pengarang_id: book.pengarang_id,
      createdAt: formatDateForInput(book.createdAt),
      updatedAt: formatDateForInput(book.updatedAt),
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  return (
    <div className="bg-base-100 h-full w-full mt-[-20px]">
      <div className="bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Koleksi Buku</h1>
            <p className="mt-1 text-gray-600">
              Kelola koleksi perpustakaan ({total} total buku)
            </p>
          </div>
          <button
            onClick={handleModalOpen}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <Plus size={16} />
            Tambah Buku
          </button>
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
                placeholder="Cari judul atau pengarang..."
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
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-md border border-gray-300 bg-gray-50 py-2 pr-8 pl-10 text-sm transition outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Semua Kategori</option>
                <option value="Buku">Buku</option>
                <option value="Jurnal">Jurnal</option>
                <option value="Karya Ilmiah">Karya Ilmiah</option>
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
        ) : books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100"
            >
              <div className="p-4 pb-3">
                <div className="mb-1 flex items-start justify-between">
                  <div>
                    <BookOpen size={30} color="#113FF7" />
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEditBook(book)}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                      title="Edit buku"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book.id!)}
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
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada buku</h3>
            <p className="mt-1 text-sm text-gray-500">
              {search ? "Tidak ada buku yang sesuai dengan pencarian." : "Mulai dengan menambahkan buku pertama."}
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

      {/* {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {formInput.id ? "Edit Buku" : "Tambah Buku Baru"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <form className="space-y-4" onSubmit={handleAddBook}>
      
                {formErrors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <div className="text-red-800 text-sm">{formErrors.general}</div>
                  </div>
                )}

                <div>
                  <label htmlFor="book-id-input" className="block text-sm font-medium text-gray-700 mb-1">
                    ID Buku <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="book-id-input"
                    type="text"
                    name="id"
                    value={formInput.id}
                    onChange={handleFormChange}
                    className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.id ? "border-red-500 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="Masukkan ID unik untuk buku (contoh: B001, B002, dll)"
                  />
                  {formErrors.id && <p className="text-red-500 text-xs mt-1">{formErrors.id}</p>}
                  <p className="text-gray-500 text-xs mt-1">
                    ID ini akan digunakan sebagai identifier unik untuk buku. Pastikan tidak sama dengan buku lain.
                  </p>
                </div>

                <div>
                  <label htmlFor="book-judul-input" className="block text-sm font-medium text-gray-700 mb-1">
                    Judul Buku <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="book-judul-input"
                    type="text"
                    name="judul"
                    value={formInput.judul}
                    onChange={handleFormChange}
                    className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.judul ? "border-red-500 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="Masukkan judul buku"
                  />
                  {formErrors.judul && <p className="text-red-500 text-xs mt-1">{formErrors.judul}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="book-pengarang-input" className="block text-sm font-medium text-gray-700 mb-1">
                      Pengarang ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="book-pengarang-input"
                      type="text"
                      name="pengarang_id"
                      value={formInput.pengarang_id}
                      onChange={handleFormChange}
                      className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.pengarang_id ? "border-red-500 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="Masukkan ID pengarang"
                    />
                    {formErrors.pengarang_id && <p className="text-red-500 text-xs mt-1">{formErrors.pengarang_id}</p>}
                  </div>

                  <div>
                    <label htmlFor="book-penerbit-input" className="block text-sm font-medium text-gray-700 mb-1">
                      Penerbit ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="book-penerbit-input"
                      type="text"
                      name="penerbit_id"
                      value={formInput.penerbit_id}
                      onChange={handleFormChange}
                      className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.penerbit_id ? "border-red-500 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="Masukkan ID penerbit"
                    />
                    {formErrors.penerbit_id && <p className="text-red-500 text-xs mt-1">{formErrors.penerbit_id}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="book-jumlah-input" className="block text-sm font-medium text-gray-700 mb-1">
                      Total Eksemplar <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="book-jumlah-input"
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
                    <label htmlFor="book-tersedia-input" className="block text-sm font-medium text-gray-700 mb-1">
                      Tersedia <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="book-tersedia-input"
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
                    <label htmlFor="book-dipinjam-input" className="block text-sm font-medium text-gray-700 mb-1">
                      Dipinjam <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="book-dipinjam-input"
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
                    <label htmlFor="book-createdAt-input" className="block text-sm font-medium text-gray-700 mb-1">
                      Tanggal Dibuat <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="book-createdAt-input"
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
                    <label htmlFor="book-updatedAt-input" className="block text-sm font-medium text-gray-700 mb-1">
                      Terakhir Diperbarui <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="book-updatedAt-input"
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
                  <label htmlFor="book-abstrak-input" className="block text-sm font-medium text-gray-700 mb-1">
                    Abstrak <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="book-abstrak-input"
                    rows={4}
                    name="abstrak"
                    value={formInput.abstrak}
                    onChange={handleFormChange}
                    className={`w-full resize-none rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.abstrak ? "border-red-500 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="Masukkan abstrak buku"
                  />
                  {formErrors.abstrak && <p className="text-red-500 text-xs mt-1">{formErrors.abstrak}</p>}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {formInput.id ? "Update" : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )} */}
      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray bg-opacity-30 backdrop-blur-sm transition duration-300">
    <div className="animate-fadeIn max-h-[90vh] w-full max-w-2xl scale-[0.98] overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
      
      {/* Modal Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <h2 className="text-xl font-semibold text-gray-900">
          {formInput.id ? "Edit Buku" : "Tambah Buku Baru"}
        </h2>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Modal Body */}
      <div className="p-4">
        <form className="space-y-3" onSubmit={handleAddBook}>
          {/* Error Alert */}
          {formErrors.general && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="text-red-800 text-sm">{formErrors.general}</div>
            </div>
          )}

          {/* ID Buku */}
          <div>
            <label htmlFor="book-id-input" className="mb-2 block text-sm font-medium text-gray-700">
              ID Buku <span className="text-red-500">*</span>
            </label>
            <input
              id="book-id-input"
              type="text"
              name="id"
              value={formInput.id}
              onChange={handleFormChange}
              className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                formErrors.id ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Masukkan ID unik untuk buku"
            />
            {formErrors.id && <p className="text-red-500 text-xs mt-1">{formErrors.id}</p>}
          </div>

          {/* Judul Buku */}
          <div>
            <label htmlFor="book-judul-input" className="mb-2 block text-sm font-medium text-gray-700">
              Judul Buku <span className="text-red-500">*</span>
            </label>
            <input
              id="book-judul-input"
              type="text"
              name="judul"
              value={formInput.judul}
              onChange={handleFormChange}
              className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                formErrors.judul ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Masukkan judul buku"
            />
            {formErrors.judul && <p className="text-red-500 text-xs mt-1">{formErrors.judul}</p>}
          </div>

          {/* Pengarang & Penerbit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="book-pengarang-input" className="mb-2 block text-sm font-medium text-gray-700">
                Pengarang ID <span className="text-red-500">*</span>
              </label>
              <input
                id="book-pengarang-input"
                type="text"
                name="pengarang_id"
                value={formInput.pengarang_id}
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
                value={formInput.penerbit_id}
                onChange={handleFormChange}
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.penerbit_id ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Masukkan ID penerbit"
              />
              {formErrors.penerbit_id && <p className="text-red-500 text-xs mt-1">{formErrors.penerbit_id}</p>}
            </div>
          </div>

          {/* Total Eksemplar, Tersedia, Dipinjam */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="book-jumlah-input" className="block text-sm font-medium text-gray-700 mb-1">
                      Total Eksemplar <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="book-jumlah-input"
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
                    <label htmlFor="book-tersedia-input" className="block text-sm font-medium text-gray-700 mb-1">
                      Tersedia <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="book-tersedia-input"
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
                    <label htmlFor="book-dipinjam-input" className="block text-sm font-medium text-gray-700 mb-1">
                      Dipinjam <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="book-dipinjam-input"
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

          {/* Tanggal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                    <label htmlFor="book-createdAt-input" className="block text-sm font-medium text-gray-700 mb-1">
                      Tanggal Dibuat <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="book-createdAt-input"
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
                    <label htmlFor="book-updatedAt-input" className="block text-sm font-medium text-gray-700 mb-1">
                      Terakhir Diperbarui <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="book-updatedAt-input"
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

          {/* Abstrak */}
          <div>
            <label htmlFor="book-abstrak-input" className="mb-2 block text-sm font-medium text-gray-700">
              Abstrak <span className="text-red-500">*</span>
            </label>
            <textarea
              id="book-abstrak-input"
              rows={4}
              name="abstrak"
              value={formInput.abstrak}
              onChange={handleFormChange}
              className={`w-full resize-none rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                formErrors.abstrak ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Masukkan abstrak buku"
            />
            {formErrors.abstrak && <p className="text-red-500 text-xs mt-1">{formErrors.abstrak}</p>}
          </div>

          {/* Footer */}
          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
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

    </div>
  );
}