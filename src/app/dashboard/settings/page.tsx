'use client';

import React from 'react';

const bookList = [
  { id: 1, title: 'Pemrograman Modular dengan Python' },
  { id: 2, title: 'Optimasi UX dengan Gesture Animation' },
  { id: 3, title: 'Integrasi API dalam Aplikasi Next.js' },
  { id: 4, title: 'Strategi SEO untuk Konten Edukasi' },
  { id: 5, title: 'Pengembangan Aplikasi Edukasi dengan Scratch' },
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl text-center font-bold mb-6 text-gray-800">⚙️ Settings</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookList.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              {item.title}
            </h2>
            <p className="text-sm text-gray-600">Kategori: Buku/Jurnal/Skripsi</p>
          </div>
        ))}
      </section>
    </div>
  );
}
