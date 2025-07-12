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
    description: "Buku pengantar komprehensif tentang sejarah dan perkembangan filsafat Barat dari zaman kuno hingga modern.",
    available: 3,
    total: 5,
  },
  {
    id: 2,
    title: "Psikologi Kognitif Modern",
    author: "Prof. Maria Sari",
    year: "2021",
    category: "Psikologi",
    description: "Eksplorasi mendalam tentang proses kognitif manusia dan aplikasinya dalam kehidupan sehari-hari.",
    available: 2,
    total: 3,
  },
  {
    id: 3,
    title: "Teologi Kontemporer",
    author: "Dr. Yohanes Kristianto",
    year: "2019",
    category: "Teologi",
    description: "Analisis teologi modern dalam konteks masyarakat kontemporer dan tantangan zaman. Membahas berbagai perspektif teologi dalam menghadapi tantangan modern.",
    available: 4,
    total: 4,
  },
  {
    id: 4,
    title: "Artificial Intelligence dan Machine Learning",
    author: "Dr. Tech Innovator",
    year: "2023",
    category: "Teknologi",
    description: "Panduan komprehensif tentang AI dan ML untuk pemula hingga advanced.",
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
    description: "Perjalanan sejarah Indonesia dari masa kerajaan hingga modern.",
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
      (category === "" || book.category === category)
  );

  const totalBooks = books.length;

  // Auto focus pada judul buku ketika modal dibuka
  const handleModalOpen = () => {
    setIsModalOpen(true);
    // Delay sedikit untuk memastikan modal sudah rendered
    setTimeout(() => {
      const titleInput = document.getElementById('book-title-input');
      if (titleInput) {
        titleInput.focus();
      }
    }, 100);
  };

  return (
    <div className="w-full h-full bg-base-100">
      <div className="bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Koleksi Buku</h1>
            <p className="text-gray-600 mt-1">Kelola koleksi perpustakaan ({totalBooks} total buku)</p>
          </div>
          <button
            onClick={handleModalOpen}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2 font-medium transition-colors shadow-sm text-sm"
          >
            <Plus size={16} />
            Tambah Buku
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col py-2">
        <div className="w-full bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="relative lg:col-span-9">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Cari judul atau pengarang..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition"
              />
            </div>

            {/* Category Filter */}
            <div className="relative lg:col-span-3">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-10 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition appearance-none"
              >
                <option value="">Semua Kategori</option>
                <option value="Filsafat">Filsafat</option>
                <option value="Psikologi">Psikologi</option>
                <option value="Teologi">Teologi</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Sastra">Sastra</option>
                <option value="Sejarah">Sejarah</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 hover:border-blue-300">
            {/* Card Header */}
            <div className="p-4 pb-3">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <BookOpen size={30} color="#113FF7" />
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit3 size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Book Content */}
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-gray-900 leading-tight line-clamp-2">{book.title}</h3>
                <p className="text-sm text-gray-600">oleh {book.author}</p>

                {/* Category Badge */}
                <span className="inline-block px-3 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                  {book.category}
                </span>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{book.description}</p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-md text-gray-500">{book.year}</span>
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                  {book.available}/{book.total} tersedia
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada buku yang ditemukan</h3>
          <p className="text-gray-500">Coba ubah kata kunci pencarian atau filter kategori</p>
        </div>
      )}

      {/* Modal Tambah Buku */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray backdrop-blur-sm flex items-center justify-center z-50 p-4 transition duration-300">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_12px_32px_rgba(0,0,0,0.15)] border border-gray-100 animate-fadeIn scale-[0.98]">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-3">
              <h2 className="text-xl font-semibold text-gray-900">Tambah Buku Baru</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <form className="space-y-2">
                {/* Row 1: Judul Buku & Pengarang */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Judul Buku
                    </label>
                    <input
                      id="book-title-input"
                      type="text"
                      autoFocus
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Masukkan judul buku"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pengarang
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Masukkan nama pengarang"
                    />
                  </div>
                </div>

                {/* Row 2: ISBN & Kategori */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ISBN
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Masukkan ISBN"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tahun Terbit
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Tahun"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jumlah Eksemplar
                    </label>
                    <input
                      type="number"
                      defaultValue={1}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="1"
                    />
                  </div>
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    placeholder="Masukkan deskripsi buku"
                  ></textarea>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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