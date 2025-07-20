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
  penerbit_id: z.string({
    required_error: "Penerbit harus diisi!",
  }),
  pengarang_id: z.string({
    required_error: "Pengarang harus diisi!",
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export default bookSchema;
