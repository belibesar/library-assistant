import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
          <div className="mb-4 flex items-center">
            <img src="logo.png" alt="Logo Perpustakaan USD" className="h-10 w-auto" />
            <div className="ml-2 flex flex-col">
              <span className="text-xl font-bold">SadharLib</span>
              <span className="text-sm mt-1">NPP 3404072D2020617</span>
            </div>
          </div>
          <p className="text-gray-400">
            Sistem Perpustakaan dengan Teknologi Artificial Intelligence untuk memudahkan pencarian koleksi perpustakaan dengan fitur bersinopsis, analisis pengguna, dan deteksi kemiripan.
          </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Fitur</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Chat AI Assistant</li>
              <li>Pencarian Cerdas</li>
              <li>Deteksi Plagiarisme</li>
              <li>Manajemen Koleksi</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Bantuan</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Panduan Pengguna</li>
              <li>FAQ</li>
              <li>Kontak Support</li>
              <li>Tutorial</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Kontak</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: library@usd.ac.id</li>
              <li>Telp: (0274) 883037</li>
              <li>Alamat: Yogyakarta</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Universitas Sanata Dharma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
