import UserModel from "@/db/models/UserModel";
import errHandler from "@/utils/errHandler";
import { comparePassword } from "@/utils/hashPassword";
import { signToken } from "@/utils/jwt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await UserModel.findByIdNumber(body.id_number);
    if (!user) {
      throw { message: "Invalid id_number/password", status: 401 };
    }
    const isValid = comparePassword(body.password, user.password);
    if (!isValid) {
      throw { message: "Invalid id_number/password", status: 401 };
    }
    const access_token = signToken({
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
      username: user.username,
      role: user.hasOwnProperty("role") ? user.role : "user",
    });
    const cookieStore = await cookies();
    cookieStore.set("Authorization", `Bearer ${access_token}`);
    return Response.json({ access_token });
  } catch (err) {
    return errHandler(err);
  }
}
