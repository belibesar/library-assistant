interface LibraryPaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export const LibraryPagination = ({
  page,
  totalPages,
  onPrev,
  onNext,
}: LibraryPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="rounded border px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-2 text-sm">
        Halaman {page} dari {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="rounded border px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
