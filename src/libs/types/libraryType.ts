import { Mahasiswa, Penerbit, Pengarang, Publikasi } from "../types";

export interface BaseItem {
  _id?: { $oid: string } | string;
  id: string;
  judul: string;
  abstrak: string;
  jumlah: number;
  tersedia: number;
  dipinjam: number;
  createdAt?: string;
  updatedAt?: string;
  count?: number;
}

export interface Book extends BaseItem {
  rak?: string; //field baru
  sinopsis?: string; //field baru
  lokasi?: string; //field baru
  penerbit_id: string;
  pengarang_id: string;
  penerbit?: Penerbit;
  pengarang?: Pengarang;
  type: "book";
}

export interface Journal extends BaseItem {
  jurnal_id?: string;
  authors?: string;
  type: "journal";
  publikasi?: Publikasi;
}

export interface Skripsi extends BaseItem {
  tahun: string;
  nim: string;
  type: "skripsi";
  mahasiswa?: Mahasiswa;
}

export type LibraryItem = Book | Journal | Skripsi;

export interface BookFormInput {
  id: string;
  judul: string;
  abstrak?: string;
  lokasi?: string;
  sinopsis?: string;
  rak?: string;
  jumlah: number | string;
  tersedia: number | string;
  dipinjam: number | string;
  penerbit_id?: string;
  pengarang_id?: string;
  penerbit_name?: string;
  pengarang_name?: string;
  pengarang_nationality?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface JournalFormInput {
  id?: string;
  judul: string;
  abstrak?: string;
  jumlah: number | string;
  tersedia: number | string;
  dipinjam: number | string;
  jurnal_id?: string;
  publikasi_name?: string;
  publikasi_volume?: string;
  publikasi_tahun?: string;
  authors?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SkripsiFormInput {
  id: string;
  judul: string;
  abstrak: string;
  jumlah: number | string;
  tersedia: number | string;
  dipinjam: number | string;
  tahun: string;
  nim: string;
  createdAt?: string;
  updatedAt?: string;
}

export type FormInput = BookFormInput | JournalFormInput | SkripsiFormInput;
export type LibraryItemType = "book" | "journal" | "skripsi" | "";

export interface Notification {
  message: string;
  type: "success" | "error";
}
