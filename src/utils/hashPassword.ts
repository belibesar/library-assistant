import { compareSync, hashSync } from "bcryptjs";

export const hashPassword = (password:string) => hashSync(password);

export function comparePassword(inputPassword: string, hashedPassword: string): boolean {
    return compareSync(inputPassword, hashedPassword);
  }