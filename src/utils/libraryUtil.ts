import {
  BookFormInput,
  FormInput,
  JournalFormInput,
  LibraryItemType,
  SkripsiFormInput,
} from "../libs/types/libraryType";

export const formatDateForInput = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

export const endpointMap: Record<string, string> = {
  book: "books",
  journal: "journals",
  skripsi: "thesis",
};

export const getInitialFormInput = (itemType: LibraryItemType): FormInput => {
  const commonFields = {
    id: "",
    judul: "",
    abstrak: "",
    jumlah: "",
    tersedia: "",
    dipinjam: "",
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
  };

  if (itemType === "book") {
    return {
      ...commonFields,
      penerbit_id: "",
      pengarang_id: "",
      lokasi: "",
      sinopsis: "",
      rak: "",
      pengarang_name: "",
      pengarang_nationality: "",
      penerbit_name: "",
    } as BookFormInput;
  } else if (itemType === "journal") {
    return {
      ...commonFields,
      jurnal_id: "",
      publikasi_name: "",
      publikasi_volume: "",
      publikasi_tahun: "",
      authors: "",
      link: "",
    } as JournalFormInput;
  } else if (itemType === "skripsi") {
    return {
      ...commonFields,
      tahun: "",
      nim: "",
      nama_mahasiswa: "",
      fakultas: "",
      program_studi: "",
      link: "",
    } as SkripsiFormInput;
  }
  return commonFields as FormInput;
};

export const getItemTypeLabel = (type: LibraryItemType | "all"): string => {
  switch (type) {
    case "book":
      return "Buku";
    case "journal":
      return "Jurnal";
    case "skripsi":
      return "Skripsi";
    case "all":
      return "Semua Koleksi";
    default:
      return "";
  }
};
