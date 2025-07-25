import React from "react";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="p-4 pb-3">
        <div className="mb-3 flex items-start justify-between">
          <div className="h-8 w-8 rounded bg-gray-200" />
          <div className="flex gap-2">
            <div className="h-6 w-6 rounded bg-gray-200" />
            <div className="h-6 w-6 rounded bg-gray-200" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-5 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="h-6 w-1/2 rounded bg-gray-100" />
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-5/6 rounded bg-gray-100" />
        </div>
      </div>
      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="h-4 w-1/4 rounded bg-gray-200" />
          <div className="flex gap-2">
            <div className="h-5 w-16 rounded bg-green-100" />
            <div className="h-5 w-16 rounded bg-yellow-100" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <div className="h-3 w-1/3 rounded bg-gray-200" />
          <div className="h-3 w-1/3 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

const LibrarySkeletonLoading = ({ count = 8 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
};

export default LibrarySkeletonLoading;
