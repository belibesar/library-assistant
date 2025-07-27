export type Book = {
  id: string;
  judul: string;
  abstrak?: string;
  jumlah: number;
  tersedia: number;
  dipinjam: number;
  count?: number;
  penerbit_id: string;
  pengarang_id: string;
  updatedAt?: string;
  createdAt?: string;
};
