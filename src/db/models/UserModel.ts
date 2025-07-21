import { NewUser, userType } from "@/libs/types";
import {client} from "@/db/config/mongodb"
import { z } from "zod";
import { hashPassword } from "@/utils/hashPassword";

const userSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Username must be 3 or more characters" })
        .nonempty({ message: "Username is required" }),
    name: z.string().nonempty({ message: "Name is required" }),
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .nonempty({ message: "Email is required" }),
    password: z
        .string()
        .min(5, { message: "Password must be 5 or more characters" })
        .nonempty({ message: "Password is required" }),
});

class UserModel {
    static async collection() {
        const db = await client.db("library-usd").collection("users")
        return db
    }
    static async create(newUser: NewUser) {
        userSchema.parse(newUser);

        const collection = await this.collection();
        const user = await collection.findOne({
            $or: [{ email: newUser.email }, { username: newUser.username }],
        });
        console.log(user);
        
        if (user) {
            if (user.email === newUser.email) {
                throw { message: "Email already exists", status: 400 };
            }
            if (user.username === newUser.username) {
                throw { message: "Username already exists", status: 400 };
            }
        }

        newUser.password = hashPassword(newUser.password);

        await collection.insertOne(newUser);
        return "Success: User created";
    }
    static async findByEmail(email: string) {
        const collection = await this.collection();
        return await collection.findOne({ email });
    }
}

export default UserModel;