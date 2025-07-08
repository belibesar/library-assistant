import {sign, verify} from 'jsonwebtoken';
import { jwtVerify } from 'jose';
const secret = process.env.JWT_SECRET as string;

export const signToken = (payload: {_id: string, email:string}) => sign(payload, secret)

export const verifyToken = (token: string) => verify(token, secret)

export const verifyWithJose = async <T>(token : string) => {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
    const { payload } = await jwtVerify<T>(token, secret);
    return payload;
}