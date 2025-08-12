import * as z from "zod";

const thesisSchema = z.object({
  id: z.string(),
  judul: z.string({
    required_error: "Judul harus diisi!",
  }),
  abstrak: z.string().optional(),
  nim: z.string({
    required_error: "NIM harus diisi!",
  }),
  nama_mahasiswa: z.string().optional(),
  fakultas: z.string().optional(),
  program_studi: z.string().optional(),
  tahun: z.string({
    required_error: "Tahun harus diisi!",
  }),
  jumlah: z.number({
    required_error: "Jumlah harus diisi!",
  }),
  tersedia: z.number(),
  dipinjam: z.number(),
  link: z.string().optional(),
  count: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export default thesisSchema;
