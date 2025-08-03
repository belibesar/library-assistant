"use client";

import { FileText } from "lucide-react";

export function EmptyState() {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <FileText className="h-8 w-8 text-gray-400" />
      </div>
      <p className="text-gray-500">
        Upload dokumen atau masukkan teks untuk memulai pemeriksaan
      </p>
    </div>
  );
}
