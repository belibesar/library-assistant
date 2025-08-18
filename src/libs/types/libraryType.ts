import { Mahasiswa, Penerbit, Pengarang, Publikasi } from "../types";

export interface BaseItem {
  _id?: { $oid: string } | string;
  id: string;
  judul: string;
  abstrak: string;
  jumlah?: number;
  tersedia?: number;
  dipinjam?: number;
  createdAt?: string;
  updatedAt?: string;
  count?: number;
}

export interface Book extends BaseItem {
  rak?: string;
  sinopsis?: string;
  lokasi?: string;
  penerbit_id: string;
  pengarang_id: string;
  penerbit?: Penerbit;
  pengarang?: Pengarang;
  type: "book";
}

export interface Journal extends BaseItem {
  jurnal_id?: string;
  authors?: string;
  link?: string;
  type: "journal";
  publikasi?: Publikasi;
}

export interface Skripsi extends BaseItem {
  tahun: string;
  nim: string;
  link?: string;
  type: "skripsi";
  nama_mahasiswa?: string;
  fakultas?: string;
  program_studi?: string;
  mahasiswa?: Mahasiswa;
}

export type LibraryItem = Book | Journal | Skripsi;

export interface BookFormInput {
  _id: string;
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
  _id: string;
  id?: string;
  judul: string;
  abstrak?: string;
  jumlah?: number | string;
  tersedia?: number | string;
  dipinjam?: number | string;
  jurnal_id?: string;
  publikasi_name?: string;
  publikasi_volume?: string;
  publikasi_tahun?: string;
  authors?: string;
  link?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SkripsiFormInput {
  _id: string;
  id: string;
  judul: string;
  abstrak: string;
  jumlah?: number | string;
  tersedia?: number | string;
  dipinjam?: number | string;
  tahun: string;
  nim: string;
  nama_mahasiswa?: string;
  fakultas?: string;
  program_studi?: string;
  link?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type FormInput = BookFormInput | JournalFormInput | SkripsiFormInput;
export type LibraryItemType = "all" | "book" | "journal" | "skripsi";

export interface Notification {
  message: string;
  type: "success" | "error";
}
