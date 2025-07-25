import {
  BookFormInput,
  FormInput,
  JournalFormInput,
  LibraryItemType,
  SkripsiFormInput,
} from "../components/library/type";

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
    } as BookFormInput;
  } else if (itemType === "journal") {
    return { ...commonFields, jurnal_id: "" } as JournalFormInput;
  } else if (itemType === "skripsi") {
    return { ...commonFields, tahun: "", nim: "" } as SkripsiFormInput;
  }
  return commonFields as FormInput;
};

export const getItemTypeLabel = (type: LibraryItemType): string => {
  switch (type) {
    case "book":
      return "Buku";
    case "journal":
      return "Jurnal";
    case "skripsi":
      return "Skripsi";
    default:
      return "";
  }
};
