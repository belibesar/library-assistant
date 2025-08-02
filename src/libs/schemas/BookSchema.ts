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
  penerbit_id: z.string(),
  pengarang_id: z.string(),
  lokasi: z.string().optional(),
  rak: z.string().optional(),
  sinopsis: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export default bookSchema;
