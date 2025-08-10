import { FormInput, LibraryItemType } from "../../libs/types/libraryType";
import { getItemTypeLabel } from "@/utils/libraryUtil";
import { useModalAnimation } from "@/hooks/useModalAnimation";
import { useEffect, useState } from "react";

interface LibraryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: LibraryItemType;
  formInput: FormInput;
  formErrors: { [key: string]: string };
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditMode: boolean;
}

export const LibraryFormModal = ({
  isOpen,
  onClose,
  category,
  formInput,
  formErrors,
  onChange,
  onSubmit,
  isEditMode,
}: LibraryFormModalProps) => {
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

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        animationState === 'entering' 
          ? 'backdrop-fade-in bg-black/30' 
          : animationState === 'entered'
          ? 'bg-black/30 backdrop-blur-sm'
          : 'backdrop-fade-out bg-black/30'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-300 ${
          animationState === 'entering' || isClosing
            ? 'modal-slide-in opacity-0 scale-90 translate-y-8' 
            : animationState === 'entered' 
            ? 'modal-slide-in opacity-100 scale-100 translate-y-0'
            : 'modal-slide-out opacity-0 scale-90 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-3">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditMode
              ? `Edit ${getItemTypeLabel(category)}`
              : `Tambah ${getItemTypeLabel(category)} Baru`}
          </h2>
          <button
            onClick={handleClose}
            className="close-button text-gray-400 transition-all duration-200 hover:text-red-500 hover:rotate-90 hover:scale-110 rounded-full p-1"
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

        <div className="p-4">
          <form className="space-y-3" onSubmit={onSubmit}>
            {formErrors.general && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3">
                <div className="text-sm text-red-800">{formErrors.general}</div>
              </div>
            )}

            <div>
              <label
                htmlFor={`${category}-id-input`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                ID {getItemTypeLabel(category)}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                id={`${category}-id-input`}
                type="text"
                name="id"
                value={formInput.id}
                onChange={onChange}
                className={`w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  formErrors.id ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder={`Masukkan ID unik untuk ${category}`}
              />
              {formErrors.id && (
                <p className="mt-1 text-xs text-red-500">{formErrors.id}</p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${category}-judul-input`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Judul {getItemTypeLabel(category)}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                id={`${category}-judul-input`}
                type="text"
                name="judul"
                value={formInput.judul}
                onChange={onChange}
                className={`w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  formErrors.judul
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder={`Masukkan judul ${category}`}
              />
              {formErrors.judul && (
                <p className="mt-1 text-xs text-red-500">{formErrors.judul}</p>
              )}
            </div>

            {category === "book" && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="book-lokasi-input"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Lokasi
                  </label>
                  <input
                    id="book-lokasi-input"
                    type="text"
                    name="lokasi"
                    value={(formInput as any).lokasi || ""}
                    onChange={onChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Masukkan lokasi buku"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="book-sinopsis-input"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Sinopsis
                    </label>
                    <textarea
                      id="book-sinopsis-input"
                      name="sinopsis"
                      value={(formInput as any).sinopsis || ""}
                      onChange={onChange}
                      rows={3}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Masukkan sinopsis buku"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="book-rak-input"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Rak
                    </label>
                    <input
                      id="book-rak-input"
                      type="text"
                      name="rak"
                      value={(formInput as any).rak || ""}
                      onChange={onChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Masukkan nomor rak"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="book-pengarang-name-input"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Nama Pengarang <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="book-pengarang-name-input"
                      type="text"
                      name="pengarang_name"
                      value={(formInput as any).pengarang_name || ""}
                      onChange={onChange}
                      className={`w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        formErrors.pengarang_name
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="Masukkan nama pengarang"
                    />
                    {formErrors.pengarang_name && (
                      <p className="mt-1 text-xs text-red-500">
                        {formErrors.pengarang_name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="book-pengarang-nationality-input"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Nationality Pengarang
                    </label>
                    <input
                      id="book-pengarang-nationality-input"
                      type="text"
                      name="pengarang_nationality"
                      value={(formInput as any).pengarang_nationality || ""}
                      onChange={onChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Masukkan nationality pengarang"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="book-penerbit-name-input"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Nama Penerbit <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="book-penerbit-name-input"
                    type="text"
                    name="penerbit_name"
                    value={(formInput as any).penerbit_name || ""}
                    onChange={onChange}
                    className={`w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      formErrors.penerbit_name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Masukkan nama penerbit"
                  />
                  {formErrors.penerbit_name && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.penerbit_name}
                    </p>
                  )}
                </div>
              </div>
            )}

            {category === "journal" && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="journal-publikasi-name-input"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Nama Publikasi <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="journal-publikasi-name-input"
                    type="text"
                    name="publikasi_name"
                    value={(formInput as any).publikasi_name || ""}
                    onChange={onChange}
                    className={`w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      formErrors.publikasi_name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Masukkan nama publikasi"
                  />
                  {formErrors.publikasi_name && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.publikasi_name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="journal-publikasi-volume-input"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Volume Publikasi
                    </label>
                    <input
                      id="journal-publikasi-volume-input"
                      type="text"
                      name="publikasi_volume"
                      value={(formInput as any).publikasi_volume || ""}
                      onChange={onChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Contoh: Vol. 15"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="journal-publikasi-tahun-input"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Tahun Publikasi
                    </label>
                    <input
                      id="journal-publikasi-tahun-input"
                      type="text"
                      name="publikasi_tahun"
                      value={(formInput as any).publikasi_tahun || ""}
                      onChange={onChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Contoh: 2024"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="journal-authors-input"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Author/Penulis
                  </label>
                  <input
                    id="journal-authors-input"
                    type="text"
                    name="authors"
                    value={(formInput as any).authors || ""}
                    onChange={onChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Pisahkan dengan koma (contoh: Asep, Kosala, Hafidz, Arsyad)"
                  />
                </div>

                <div>
                  <label
                    htmlFor="journal-link-input"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Link Jurnal
                  </label>
                  <input
                    id="journal-link-input"
                    type="url"
                    name="link"
                    value={(formInput as any).link || ""}
                    onChange={onChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="https://drive.google.com/... atau link lainnya"
                  />
                </div>

                <div>
                  <label
                    htmlFor="journal-jurnalid-input"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Jurnal ID <span className="text-xs text-gray-500">(Opsional - akan di-generate otomatis)</span>
                  </label>
                  <input
                    id="journal-jurnalid-input"
                    type="text"
                    name="jurnal_id"
                    value={(formInput as any).jurnal_id || ""}
                    onChange={onChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Kosongkan untuk auto-generate"
                  />
                </div>
              </div>
            )}

            {category === "skripsi" && (
              <><div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="skripsi-nim-input"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    NIM <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="skripsi-nim-input"
                    type="text"
                    name="nim"
                    value={(formInput as any).nim || ""}
                    onChange={onChange}
                    className={`w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${formErrors.nim
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"}`}
                    placeholder="Masukkan NIM mahasiswa" />
                  {formErrors.nim && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.nim}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="skripsi-tahun-input"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Tahun <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="skripsi-tahun-input"
                    type="text"
                    name="tahun"
                    value={(formInput as any).tahun || ""}
                    onChange={onChange}
                    className={`w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${formErrors.tahun
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"}`}
                    placeholder="Masukkan tahun skripsi" />
                  {formErrors.tahun && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.tahun}
                    </p>
                  )}
                </div>
              </div>
              <div>
                  <label
                    htmlFor="skripsi-link-input"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Link Skripsi
                  </label>
                  <input
                    id="skripsi-link-input"
                    type="url"
                    name="link"
                    value={(formInput as any).link || ""}
                    onChange={onChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="https://drive.google.com/... atau link lainnya" />
                </div></>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label
                  htmlFor={`${category}-jumlah-input`}
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Total Eksemplar <span className="text-red-500">*</span>
                </label>
                <input
                  id={`${category}-jumlah-input`}
                  type="number"
                  name="jumlah"
                  value={formInput.jumlah}
                  onChange={onChange}
                  min="1"
                  className={`w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    formErrors.jumlah
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="1"
                />
                {formErrors.jumlah && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.jumlah}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`${category}-tersedia-input`}
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Tersedia <span className="text-red-500">*</span>
                </label>
                <input
                  id={`${category}-tersedia-input`}
                  type="number"
                  name="tersedia"
                  value={formInput.tersedia}
                  onChange={onChange}
                  min="0"
                  className={`w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    formErrors.tersedia
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="1"
                />
                {formErrors.tersedia && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.tersedia}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`${category}-dipinjam-input`}
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Dipinjam <span className="text-red-500">*</span>
                </label>
                <input
                  id={`${category}-dipinjam-input`}
                  type="number"
                  name="dipinjam"
                  value={formInput.dipinjam}
                  onChange={onChange}
                  min="0"
                  className={`w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    formErrors.dipinjam
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="0"
                />
                {formErrors.dipinjam && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.dipinjam}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor={`${category}-createdAt-input`}
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Tanggal Dibuat <span className="text-red-500">*</span>
                </label>
                <input
                  id={`${category}-createdAt-input`}
                  type="date"
                  name="createdAt"
                  value={formInput.createdAt}
                  onChange={onChange}
                  className={`w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    formErrors.createdAt
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {formErrors.createdAt && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.createdAt}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`${category}-updatedAt-input`}
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Terakhir Diperbarui <span className="text-red-500">*</span>
                </label>
                <input
                  id={`${category}-updatedAt-input`}
                  type="date"
                  name="updatedAt"
                  value={formInput.updatedAt}
                  onChange={onChange}
                  className={`w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    formErrors.updatedAt
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {formErrors.updatedAt && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.updatedAt}
                  </p>
                )}
              </div>
            </div>

            {/* dijadikan opsional sementara */}
            {category !== "book" && (
              <div>
                <label
                  htmlFor={`${category}-abstrak-input`}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Abstrak
                </label>
                <textarea
                  id={`${category}-abstrak-input`}
                  rows={4}
                  name="abstrak"
                  value={formInput.abstrak || ""}
                  onChange={onChange}
                  className={`w-full resize-none rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    formErrors.abstrak
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder={`Masukkan abstrak ${category} (opsional)`}
                />
                {formErrors.abstrak && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.abstrak}
                  </p>
                )}
              </div>
            )}

            <div className="mt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="modal-button rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5"
              >
                Batal
              </button>
              <button
                type="submit"
                className="modal-button rounded-md bg-blue-600 px-4 py-2 text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5"
              >
                {isEditMode ? "Update" : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
