"use client";

import { useState } from "react";
import { Search, Filter, BookOpen, Edit3, Trash2, Plus } from "lucide-react";
import { Book } from "@/libs/types";

const dummyBooks: Book[] = [
  {
    id: 1,
    title: "Pengantar Filsafat Barat",
    author: "Dr. Ahmad Suryadi",
    year: "2020",
    category: "Filsafat",
    description:
      "Buku pengantar komprehensif tentang sejarah dan perkembangan filsafat Barat dari zaman kuno hingga modern.",
    available: 3,
    total: 5,
  },
  {
    id: 2,
    title: "Psikologi Kognitif Modern",
    author: "Prof. Maria Sari",
    year: "2021",
    category: "Psikologi",
    description:
      "Eksplorasi mendalam tentang proses kognitif manusia dan aplikasinya dalam kehidupan sehari-hari.",
    available: 2,
    total: 3,
  },
  {
    id: 3,
    title: "Teologi Kontemporer",
    author: "Dr. Yohanes Kristianto",
    year: "2019",
    category: "Teologi",
    description:
      "Analisis teologi modern dalam konteks masyarakat kontemporer dan tantangan zaman. Membahas berbagai perspektif teologi dalam menghadapi tantangan modern.",
    available: 4,
    total: 4,
  },
  {
    id: 4,
    title: "Artificial Intelligence dan Machine Learning",
    author: "Dr. Tech Innovator",
    year: "2023",
    category: "Teknologi",
    description:
      "Panduan komprehensif tentang AI dan ML untuk pemula hingga advanced.",
    available: 1,
    total: 2,
  },
  {
    id: 5,
    title: "Sastra Indonesia Modern",
    author: "Prof. Sastra Nusantara",
    year: "2022",
    category: "Sastra",
    description: "Analisis mendalam karya sastra Indonesia kontemporer.",
    available: 6,
    total: 8,
  },
  {
    id: 6,
    title: "Sejarah Nusantara",
    author: "Dr. Sejarah Indonesia",
    year: "2020",
    category: "Sejarah",
    description:
      "Perjalanan sejarah Indonesia dari masa kerajaan hingga modern.",
    available: 2,
    total: 4,
  },
];

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [books] = useState(dummyBooks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredBooks = books.filter(
    (book) =>
      (book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())) &&
      (category === "" || book.category === category),
  );

  const totalBooks = books.length;

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      const titleInput = document.getElementById("book-title-input");
      if (titleInput) {
        titleInput.focus();
      }
    }, 100);
  };

  return (
    <div className="bg-base-100 h-full w-full mt-[-20px]">
      <div className="bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Koleksi Buku</h1>
            <p className="mt-1 text-gray-600">
              Kelola koleksi perpustakaan ({totalBooks} total buku)
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
                onChange={(e) => setSearch(e.target.value)}
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
                <option value="Filsafat">Filsafat</option>
                <option value="Psikologi">Psikologi</option>
                <option value="Teologi">Teologi</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Sastra">Sastra</option>
                <option value="Sejarah">Sejarah</option>
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
      <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBooks.map((book) => (
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
                  <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600">
                    <Edit3 size={16} />
                  </button>
                  <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Book Content */}
              <div className="space-y-3">
                <h3 className="line-clamp-2 text-lg leading-tight font-bold text-gray-900">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600">oleh {book.author}</p>

                {/* Category Badge */}
                <span className="inline-block rounded-full bg-gray-100 px-3 text-xs font-medium text-gray-700">
                  {book.category}
                </span>

                {/* Description */}
                <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                  {book.description}
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="text-md text-gray-500">{book.year}</span>
                <span className="rounded-md bg-green-50 px-2 py-1 text-sm font-semibold text-green-600">
                  {book.available}/{book.total} tersedia
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="py-16 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <BookOpen className="text-gray-400" size={32} />
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            Tidak ada buku yang ditemukan
          </h3>
          <p className="text-gray-500">
            Coba ubah kata kunci pencarian atau filter kategori
          </p>
        </div>
      )}

      {/* Modal Tambah Buku */}
      {isModalOpen && (
        <div className="bg-gray fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition duration-300">
          <div className="animate-fadeIn max-h-[90vh] w-full max-w-2xl scale-[0.98] overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3">
              <h2 className="text-xl font-semibold text-gray-900">
                Tambah Buku Baru
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 transition-colors hover:text-gray-600"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <form className="space-y-2">
                {/* Row 1: Judul Buku & Pengarang */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Judul Buku
                    </label>
                    <input
                      id="book-title-input"
                      type="text"
                      autoFocus
                      className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan judul buku"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Pengarang
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan nama pengarang"
                    />
                  </div>
                </div>

                {/* Row 2: ISBN & Kategori */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      ISBN
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan ISBN"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Kategori
                    </label>
                    <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500">
                      <option value="">Pilih kategori</option>
                      <option value="Filsafat">Filsafat</option>
                      <option value="Psikologi">Psikologi</option>
                      <option value="Teologi">Teologi</option>
                      <option value="Teknologi">Teknologi</option>
                      <option value="Sastra">Sastra</option>
                      <option value="Sejarah">Sejarah</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Tahun Terbit & Jumlah Eksemplar */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Tahun Terbit
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="Tahun"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Jumlah Eksemplar
                    </label>
                    <input
                      type="number"
                      defaultValue={1}
                      min="1"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="1"
                    />
                  </div>
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Deskripsi
                  </label>
                  <textarea
                    rows={4}
                    className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan deskripsi buku"
                  ></textarea>
                </div>

                {/* Modal Footer */}
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
                    Simpan
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
