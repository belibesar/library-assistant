import * as z from "zod";

const journlSchema = z.object({
  id: z.string({
    required_error: "ID harus diisi!",
  }),
  judul: z.string({
    required_error: "Judul harus diisi!",
  }),
  abstrak: z.string({
    required_error: "Abstrak harus diisi!",
  }),
  jurnal_id: z.string({
    required_error: "Journal ID tidak diisi!",
  }),
  updatedAt: z.string(),
  createdAt: z.string(),
});

export default journlSchema;
