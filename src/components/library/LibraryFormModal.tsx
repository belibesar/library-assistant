import { useState } from "react";
import { FormInput, LibraryItemType } from "../../libs/types/libraryType";
import { getItemTypeLabel } from "@/utils/libraryUtil";

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
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs transition duration-300">
      <div className="animate-fadeIn max-h-[90vh] w-full max-w-2xl scale-[0.98] overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
        <div className="flex items-center justify-between border-b p-3">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditMode
              ? `Edit ${getItemTypeLabel(category)}`
              : `Tambah ${getItemTypeLabel(category)} Baru`}
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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="book-pengarang-input"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Pengarang ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="book-pengarang-input"
                    type="text"
                    name="pengarang_id"
                    value={(formInput as any).pengarang_id || ""}
                    onChange={onChange}
                    className={`w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      formErrors.pengarang_id
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Masukkan ID pengarang"
                  />
                  {formErrors.pengarang_id && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.pengarang_id}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="book-penerbit-input"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Penerbit ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="book-penerbit-input"
                    type="text"
                    name="penerbit_id"
                    value={(formInput as any).penerbit_id || ""}
                    onChange={onChange}
                    className={`w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      formErrors.penerbit_id
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Masukkan ID penerbit"
                  />
                  {formErrors.penerbit_id && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.penerbit_id}
                    </p>
                  )}
                </div>
              </div>
            )}

            {category === "journal" && (
              <div>
                <label
                  htmlFor="journal-jurnalid-input"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Jurnal ID <span className="text-red-500">*</span>
                </label>
                <input
                  id="journal-jurnalid-input"
                  type="text"
                  name="jurnal_id"
                  value={(formInput as any).jurnal_id || ""}
                  onChange={onChange}
                  className={`w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    formErrors.jurnal_id
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Masukkan ID jurnal"
                />
                {formErrors.jurnal_id && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.jurnal_id}
                  </p>
                )}
              </div>
            )}

            {category === "skripsi" && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                    className={`w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      formErrors.nim
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Masukkan NIM mahasiswa"
                  />
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
                    className={`w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      formErrors.tahun
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Masukkan tahun skripsi"
                  />
                  {formErrors.tahun && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.tahun}
                    </p>
                  )}
                </div>
              </div>
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

            <div>
              <label
                htmlFor={`${category}-abstrak-input`}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Abstrak <span className="text-red-500">*</span>
              </label>
              <textarea
                id={`${category}-abstrak-input`}
                rows={4}
                name="abstrak"
                value={formInput.abstrak}
                onChange={onChange}
                className={`w-full resize-none rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  formErrors.abstrak
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder={`Masukkan abstrak ${category}`}
              />
              {formErrors.abstrak && (
                <p className="mt-1 text-xs text-red-500">
                  {formErrors.abstrak}
                </p>
              )}
            </div>

            <div className="mt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
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
