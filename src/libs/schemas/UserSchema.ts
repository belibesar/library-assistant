import * as z from "zod";

const userSchema = z.object({
  _id: z.string().optional(), 
  name: z.string({
    required_error: "Nama harus diisi!",
  }),
  username: z
    .string({
      required_error: "Username harus diisi!",
    })
    .min(3, { message: "Username minimal 3 karakter" }),
  email: z
    .string({
      required_error: "Email harus diisi!",
    })
    .email({ message: "Format email tidak valid" }),
  password: z
    .string({
      required_error: "Password harus diisi!",
    })
    .min(6, { message: "Password minimal 6 karakter" }),
  role: z.enum(["user", "admin"], {
    required_error: "Role harus diisi (user/admin)",
  }),
  id_number: z
    .number({
      required_error: "ID Number harus diisi!",
    })
    .int({ message: "ID Number harus berupa angka bulat" }),
});

export default userSchema;

