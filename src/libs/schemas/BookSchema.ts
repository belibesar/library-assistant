import * as z from "zod";

const bookSchema = z.object({
  id: z.string(),
  judul: z.string({
    required_error: "Judul harus diisi!",
  }),
  abstrak: z.string().optional(),
  jumlah: z.number({
    required_error: "Jumlah harus diisi!",
  }),
  tersedia: z.number(),
  dipinjam: z.number(),
  count: z.number().optional(),
  penerbit_id: z.string({
    required_error: "Penerbit harus diisi!",
  }),
  pengarang_id: z.string({
    required_error: "Pengarang harus diisi!",
  }),
  lokasi: z.string().optional(), //field baru
  rak: z.string().optional(), //field baru
  sinopsis: z.string().optional(), //field baru
  createdAt: z.string(),
  updatedAt: z.string(),
});

export default bookSchema;
