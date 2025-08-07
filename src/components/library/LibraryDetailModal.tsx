import { LibraryItem, Book, Journal, Skripsi } from "../../libs/types/libraryType";
import { formatDateForInput, getItemTypeLabel } from "@/utils/libraryUtil";

interface LibraryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: LibraryItem | null;
}

export const LibraryDetailModal = ({
  isOpen,
  onClose,
  item,
}: LibraryDetailModalProps) => {
  if (!isOpen || !item) return null;

  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs transition duration-300">
      <div className="animate-fadeIn max-h-[90vh] w-full max-w-2xl scale-[0.98] overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
        <div className="flex items-center justify-between border-b p-3">
          <h2 className="text-xl font-semibold text-gray-900">
            Detail {getItemTypeLabel(item.type)}
          </h2>
          <button
            onClick={onClose}
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
        <div className="space-y-4 p-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{item.judul}</h3>
            {item.type === "book" ? (
              <>
                <p className="text-sm text-gray-500">Lokasi: {(item as Book).lokasi}</p>
                <p className="text-sm text-gray-500">Call Number: {item.id}</p>
                <p className="text-sm text-gray-500">Rak: {(item as Book).rak}</p>
              </>
            ) : (
              <p className="text-sm text-gray-500">ID: {item.id}</p>
            )}
          </div>

          {item.type === "book" && (
            <>
              <p className="text-gray-700">
                <strong>Pengarang:</strong> {(item as Book).pengarang?.name}
              </p>
              <p className="text-gray-700">
                <strong>Penerbit:</strong> {(item as Book).penerbit?.name}
              </p>
            </>
          )}
          {item.type === "journal" && (
            <>
              <p className="text-gray-700">
                <strong>Jurnal ID:</strong> {(item as Journal).jurnal_id}
              </p>
              {(item as Journal).authors && (
                <p className="text-gray-700">
                  <strong>Author/Penulis:</strong> {(item as Journal).authors}
                </p>
              )}
              {(item as Journal).link && (
                <p className="text-gray-700">
                  <strong>Link Jurnal:</strong>{" "}
                  <a 
                    href={(item as Journal).link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Buka Link
                  </a>
                </p>
              )}
              {(item as Journal).publikasi && (
                <>
                  <p className="text-gray-700">
                    <strong>Publikasi:</strong> {(item as Journal).publikasi?.name}
                  </p>
                  <p className="text-gray-700">
                    <strong>Tahun Publikasi:</strong>{" "}
                    {(item as Journal).publikasi?.tahun || "Tidak tersedia"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Volume:</strong>{" "}
                    {(item as Journal).publikasi?.volume || "Tidak tersedia"}
                  </p>
                </>
              )}
            </>
          )}
          {item.type === "skripsi" && (
            <>
              <p className="text-gray-700">
                <strong>NIM:</strong> {(item as Skripsi).nim}
              </p>
              <p className="text-gray-700">
                <strong>Tahun:</strong> {(item as Skripsi).tahun}
              </p>
              {(item as Skripsi).link && (
                <p className="text-gray-700">
                  <strong>Link Skripsi:</strong>{" "}
                  <a 
                    href={(item as Skripsi).link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Buka Link
                  </a>
                </p>
              )}
              {(item as Skripsi).mahasiswa && (
                <>
                  <p className="text-gray-700">
                    <strong>Mahasiswa:</strong> {(item as Skripsi).mahasiswa?.name || 'N/A'}
                  </p>
                  <p className="text-gray-700">
                    <strong>Fakultas:</strong>{" "}
                    {(item as Skripsi).mahasiswa?.fakultas || "Tidak tersedia"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Program Studi:</strong>{" "}
                    {(item as Skripsi).mahasiswa?.program_studi || "Tidak tersedia"}
                  </p>
                  <p className="text-gray-700">
                    <strong>IPK:</strong>{" "}
                    {(item as Skripsi).mahasiswa?.ipk || "Tidak tersedia"}
                  </p>
                </>
              )}
            </>
          )}

          <p className="text-gray-700">
            <strong>Sinopsis:</strong>{" "}
            {item.abstrak || "Sinopsis belum tersedia"}
          </p>
          <div className="grid grid-cols-3 gap-2 border-t pt-4 text-sm text-gray-700">
            <p>
              <strong>Total:</strong> {item.jumlah}
            </p>
            <p>
              <strong>Tersedia:</strong> {item.tersedia}
            </p>
            <p>
              <strong>Dipinjam:</strong> {item.dipinjam}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <p>
              <strong>Dibuat:</strong> {formatDateForInput(item.createdAt)}
            </p>
            <p>
              <strong>Diperbarui:</strong> {formatDateForInput(item.updatedAt)}
            </p>
          </div>
          {item.count !== undefined && (
            <div className="border-t pt-4 text-right text-sm font-semibold text-gray-600">
              Dilihat: {item.count} kali
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
