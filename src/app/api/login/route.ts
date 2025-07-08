import UserModel from "@/db/models/UserModel";
import errHandler from "@/utils/errHandler";
import { comparePassword } from "@/utils/hashPassword";
import { signToken } from "@/utils/jwt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        /*
        step:
        1. cek email ada atau tidak di server
        2. cek password benar atau tidak
        3. buat access_token
        4. return
        */ 
        const user = await UserModel.findByEmail(body.email);
        if (!user) {
            throw {message: "Invalid email/password", status: 401}
        }
        const isValid = comparePassword(body.password, user.password)
        if (!isValid) {
            throw {message: "Invalid email/password", status: 401}
        }
        const access_token = signToken({_id: user._id.toString(), email: user.email});
        const cookieStore = await cookies();
        cookieStore.set("Authorization", `Bearer ${access_token}`);
        return Response.json({access_token})
            
    } catch (err) {
        return errHandler(err)
    }
}