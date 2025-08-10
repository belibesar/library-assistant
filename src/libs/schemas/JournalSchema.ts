import * as z from "zod";

const journalSchema = z.object({
  id: z.string().optional(),
  judul: z.string({
    required_error: "Judul harus diisi!",
  }),
  abstrak: z.string().optional(),
  jumlah: z.number({
    required_error: "Jumlah harus diisi!",
  }),
  tersedia: z.number(),
  dipinjam: z.number(),
  jurnal_id: z.string().optional(),
  publikasi_name: z.string({
    required_error: "Nama publikasi harus diisi!",
  }).optional(),
  publikasi_volume: z.string().optional(),
  publikasi_tahun: z.string().optional(),
  authors: z.string().optional(),
  link: z.string().optional(),
  count: z.number().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
});

export default journalSchema;
