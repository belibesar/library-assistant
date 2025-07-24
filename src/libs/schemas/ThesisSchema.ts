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
  tahun: z.string({
    required_error: "Tahun harus diisi!",
  }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export default thesisSchema;
