import { Penerbit, Pengarang } from "../types";

export type Book = {
  _id?: string;
  id: string;
  judul: string;
  abstrak?: string;
  jumlah: number;
  tersedia: number;
  dipinjam: number;
  count?: number;
  penerbit_id: string;
  pengarang_id: string;
  pengarang?: Pengarang;
  penerbit?: Penerbit;
  updatedAt?: string;
  createdAt?: string;
};
