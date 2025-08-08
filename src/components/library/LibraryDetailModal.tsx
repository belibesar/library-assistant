import { LibraryItem, Book, Journal, Skripsi } from "../../libs/types/libraryType";
import { formatDateForInput, getItemTypeLabel } from "@/utils/libraryUtil";
import { useModalAnimation } from "@/hooks/useModalAnimation";
import { useEffect, useState } from "react";

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
  const [isClosing, setIsClosing] = useState(false);
  
  const { shouldRender, animationState } = useModalAnimation({
    isOpen,
    duration: 300
  });

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!shouldRender || !item) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 lg:p-6 transition-all duration-300 ${
        animationState === 'entering' 
          ? 'backdrop-fade-in bg-black/30' 
          : animationState === 'entered'
          ? 'bg-black/30 backdrop-blur-sm'
          : 'backdrop-fade-out bg-black/30'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`max-h-[95vh] w-full max-w-4xl lg:max-w-5xl overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-[0_25px_60px_rgba(0,_0,_0,_0.15)] transition-all duration-300 ${
          animationState === 'entering' || isClosing
            ? 'modal-slide-in opacity-0 scale-90 translate-y-8' 
            : animationState === 'entered' 
            ? 'modal-slide-in opacity-100 scale-100 translate-y-0'
            : 'modal-slide-out opacity-0 scale-90 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl ${
              item.type === 'book' ? 'bg-blue-100 text-blue-600' :
              item.type === 'journal' ? 'bg-purple-100 text-purple-600' :
              'bg-green-100 text-green-600'
            }`}>
              {item.type === 'book' && (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              )}
              {item.type === 'journal' && (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              )}
              {item.type === 'skripsi' && (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Detail {getItemTypeLabel(item.type)}
              </h2>
              <p className="text-sm text-gray-600 mt-1">Informasi lengkap {getItemTypeLabel(item.type).toLowerCase()}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="close-button text-gray-400 hover:text-gray-600 transition-all duration-200 hover:rotate-90 hover:scale-110 rounded-full p-2 hover:bg-white/50"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6 border-l-4 ${
            item.type === 'book' ? 'border-blue-500' :
            item.type === 'journal' ? 'border-purple-500' :
            'border-orange-500'
          }`}>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-3">{item.judul}</h3>
            <div className="flex flex-wrap gap-2 sm:gap-4 text-sm text-gray-600">
              {item.type === "book" ? (
                <>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Lokasi: <span className="font-semibold text-gray-800">{(item as Book).lokasi}</span></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Call Number: <span className="font-semibold text-gray-800">{item.id}</span></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span>Rak: <span className="font-semibold text-gray-800">{(item as Book).rak}</span></span>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${
                    item.type === 'journal' ? 'bg-purple-500' : 'bg-orange-500'
                  }`}></span>
                  <span>ID: <span className="font-semibold text-gray-800">{item.id}</span></span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Sinopsis
                </h4>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-100">
                  <p className="text-gray-700 leading-relaxed">
                    {item.abstrak || "Sinopsis belum tersedia untuk item ini."}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {item.type === "book" && (
                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm lg:col-span-2">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Informasi Penulis & Penerbit
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <span className="block text-blue-600 font-medium text-sm mb-1">Pengarang</span>
                      <span className="block text-gray-800 font-bold text-lg">{(item as Book).pengarang?.name}</span>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <span className="block text-green-600 font-medium text-sm mb-1">Penerbit</span>
                      <span className="block text-gray-800 font-bold text-lg">{(item as Book).penerbit?.name}</span>
                    </div>
                  </div>
                </div>
              )}

              {item.type === "journal" && (
                <>
                  <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      Info Jurnal
                    </h4>
                    <div className="space-y-4">
                      <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <span className="block text-purple-600 font-medium text-sm">Jurnal ID</span>
                        <span className="block text-gray-800 font-semibold text-lg">{(item as Journal).jurnal_id}</span>
                      </div>
                      {(item as Journal).authors && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="block text-gray-600 font-medium text-sm">Penulis</span>
                          <span className="block text-gray-800 font-semibold">{(item as Journal).authors}</span>
                        </div>
                      )}
                      {(item as Journal).link && (
                        <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                          <span className="block text-purple-600 font-medium text-sm mb-2">Link Jurnal</span>
                          <a 
                            href={(item as Journal).link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium text-sm"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Buka Link
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {(item as Journal).publikasi && (
                    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Publikasi
                      </h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                          <span className="block text-indigo-600 font-medium text-sm">Nama Publikasi</span>
                          <span className="block text-gray-800 font-semibold text-lg">{(item as Journal).publikasi?.name}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                            <span className="block text-blue-600 font-medium text-sm">Tahun</span>
                            <span className="block text-gray-800 font-bold text-xl">{(item as Journal).publikasi?.tahun || "N/A"}</span>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-center">
                            <span className="block text-green-600 font-medium text-sm">Volume</span>
                            <span className="block text-gray-800 font-bold text-xl">{(item as Journal).publikasi?.volume || "N/A"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {item.type === "skripsi" && (
                <>
                  <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Info Skripsi
                    </h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                          <span className="block text-green-600 font-medium text-sm">NIM</span>
                          <span className="block text-gray-800 font-bold text-xl">{(item as Skripsi).nim}</span>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                          <span className="block text-blue-600 font-medium text-sm">Tahun</span>
                          <span className="block text-gray-800 font-bold text-xl">{(item as Skripsi).tahun}</span>
                        </div>
                      </div>
                      {(item as Skripsi).link && (
                        <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                          <span className="block text-green-600 font-medium text-sm mb-2">Link Skripsi</span>
                          <a 
                            href={(item as Skripsi).link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-sm"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Buka Link
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {(item as Skripsi).mahasiswa && (
                    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        Mahasiswa
                      </h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <span className="block text-orange-600 font-medium text-sm">Nama Mahasiswa</span>
                          <span className="block text-gray-800 font-semibold text-lg">{(item as Skripsi).mahasiswa?.name || 'N/A'}</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="block text-gray-600 font-medium text-sm">Fakultas</span>
                          <span className="block text-gray-800 font-semibold">{(item as Skripsi).mahasiswa?.fakultas || "N/A"}</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="block text-gray-600 font-medium text-sm">Program Studi</span>
                          <span className="block text-gray-800 font-semibold">{(item as Skripsi).mahasiswa?.program_studi || "N/A"}</span>
                        </div>
                        {/* <div className="p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                          <span className="block text-yellow-600 font-medium text-sm">IPK</span>
                          <span className="block text-gray-800 font-bold text-xl">{(item as Skripsi).mahasiswa?.ipk || "N/A"}</span>
                        </div> */}
                      </div>
                    </div>
                  )}
                </>
              )}

              </div>
            </div>
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:grid-cols-1 xl:gap-6">
                
                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Statistik
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
                      <div className="text-xl font-bold text-blue-700">{item.jumlah}</div>
                      <div className="text-xs font-medium text-blue-600">Total</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
                      <div className="text-xl font-bold text-green-700">{item.tersedia}</div>
                      <div className="text-xs font-medium text-green-600">Tersedia</div>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3 text-center border border-amber-200">
                      <div className="text-xl font-bold text-amber-700">{item.dipinjam}</div>
                      <div className="text-xs font-medium text-amber-600">Dipinjam</div>
                    </div>
                  </div>
                  
                  {item.count !== undefined && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium text-sm">Total Dilihat:</span>
                        <span className="text-lg font-bold text-gray-800">{item.count} kali</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Waktu
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-1">
                        <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="text-gray-600 font-medium text-sm">Dibuat</span>
                      </div>
                      <span className="text-gray-800 font-semibold text-sm">{formatDateForInput(item.createdAt)}</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-1">
                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span className="text-gray-600 font-medium text-sm">Diperbarui</span>
                      </div>
                      <span className="text-gray-800 font-semibold text-sm">{formatDateForInput(item.updatedAt)}</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
