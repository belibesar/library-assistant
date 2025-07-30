import { Penerbit, Pengarang } from "../types";

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
  penerbit_id: string;
  pengarang_id: string;
  penerbit?: Penerbit;
  pengarang?: Pengarang;
  type: "book";
}

export interface Journal extends BaseItem {
  jurnal_id: string;
  type: "journal";
}

export interface Skripsi extends BaseItem {
  tahun: string;
  nim: string;
  type: "skripsi";
}

export type LibraryItem = Book | Journal | Skripsi;

export interface BookFormInput {
  id: string;
  judul: string;
  abstrak: string;
  jumlah: number | string;
  tersedia: number | string;
  dipinjam: number | string;
  penerbit_id: string;
  pengarang_id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface JournalFormInput {
  id: string;
  judul: string;
  abstrak: string;
  jumlah: number | string;
  tersedia: number | string;
  dipinjam: number | string;
  jurnal_id: string;
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
