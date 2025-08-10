import React from "react";
import { LibrarySkeletonLoadingProps, SkeletonCardProps } from "../../libs/types";

const SkeletonCard = ({ type = 'book' }: SkeletonCardProps) => {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="p-4 pb-3">
        <div className="mb-1 flex items-start justify-between">
          <div className="h-8 w-8 rounded bg-gray-200" />
          <div className="flex gap-1">
            <div className="h-6 w-6 rounded bg-gray-200" />
            <div className="h-6 w-6 rounded bg-gray-200" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="min-h-10 space-y-2">
            <div className="h-5 w-3/4 rounded bg-gray-200" />
            <div className="h-5 w-1/2 rounded bg-gray-200" />
          </div>
          {type === 'book' && (
            <>
              <div className="h-4 w-3/5 rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
              <div className="h-6 w-1/2 rounded bg-gray-100" />
              <div className="min-h-20 space-y-2">
                <div className="h-4 w-full rounded bg-gray-100" />
                <div className="h-4 w-5/6 rounded bg-gray-100" />
                <div className="h-4 w-2/3 rounded bg-gray-100" />
              </div>
            </>
          )}

          {type === 'journal' && (
            <>
              <div className="min-h-20 space-y-2">
                <div className="h-4 w-full rounded bg-gray-100" />
                <div className="h-4 w-5/6 rounded bg-gray-100" />
                <div className="h-4 w-2/3 rounded bg-gray-100" />
              </div>
              <div className="space-y-2">
                <div className="h-6 w-2/3 rounded-full bg-gray-100" />
                <div className="flex gap-2">
                  <div className="h-5 w-16 rounded-full bg-gray-100" />
                  <div className="h-5 w-20 rounded-full bg-gray-100" />
                </div>
              </div>
            </>
          )}

          {type === 'skripsi' && (
            <>
              <div className="space-y-1">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
              </div>
              <div className="h-6 w-1/3 rounded-full bg-gray-100" />
              <div className="min-h-20 space-y-2">
                <div className="h-4 w-full rounded bg-gray-100" />
                <div className="h-4 w-5/6 rounded bg-gray-100" />
                <div className="h-4 w-2/3 rounded bg-gray-100" />
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
        {type === 'book' && (
          <>
            <div className="mb-2 flex items-center justify-between">
              <div className="h-4 w-1/4 rounded bg-gray-200" />
              <div className="flex gap-2">
                <div className="h-5 w-16 rounded bg-green-100" />
                <div className="h-5 w-16 rounded bg-yellow-100" />
              </div>
            </div>
            <div className="text-right">
              <div className="h-3 w-[10%] rounded bg-gray-200 ml-auto" />
            </div>
          </>
        )}
        
        {(type === 'journal' || type === 'skripsi') && (
          <div className="text-right">
            <div className="h-4 w-[10%] rounded bg-gray-200 ml-auto" />
          </div>
        )}
      </div>
    </div>
  );
};

const LibrarySkeletonLoading = ({ 
  count = 8, 
  type, 
  types 
}: LibrarySkeletonLoadingProps) => {
  if (types && types.length > 0) {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} type={types[i % types.length]} />
        ))}
      </>
    );
  }

  if (type) {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} type={type} />
        ))}
      </>
    );
  }

  const defaultTypes: ('book' | 'journal' | 'skripsi')[] = ['book', 'journal', 'skripsi'];
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} type={defaultTypes[i % defaultTypes.length]} />
      ))}
    </>
  );
};

export default LibrarySkeletonLoading;
