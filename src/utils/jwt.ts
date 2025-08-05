import { sign, verify } from "jsonwebtoken";
import { jwtVerify } from "jose";
const secret = process.env.JWT_SECRET as string;

type UserType = {
  _id: string;
  email: string;
  name?: string;
  username?: string;
  role?: "user" | "admin";
};

export const signToken = (payload: UserType) => sign(payload, secret);

export const verifyToken = (token: string) => verify(token, secret);

export const verifyWithJose = async <T>(token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
  const { payload } = await jwtVerify<T>(token, secret);
  return payload;
};
