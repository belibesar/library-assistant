"use client";

export function LoadingState() {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
      </div>
      <p className="mb-2 font-medium text-gray-700">
        Sedang memeriksa plagiarisme...
      </p>
      <p className="text-sm text-gray-500">Mohon tunggu beberapa saat</p>
    </div>
  );
}
