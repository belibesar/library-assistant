import { NewUser, userType } from "@/libs/types";
import { client } from "@/db/config/mongodb";
import { z } from "zod";
import { hashPassword } from "@/utils/hashPassword";
import { ObjectId } from "mongodb";
import userSchema from "@/libs/schemas/UserSchema";

class UserModel {
  static async collection() {
    const db = await client.db("library-usd").collection("users");
    return db;
  }

  static async create(newUser: NewUser) {
    userSchema.parse(newUser);

    const collection = await this.collection();
    const existing = await collection.findOne({
      $or: [
        { email: newUser.email },
        { username: newUser.username },
        { id_number: newUser.id_number },
      ],
    });
    if (existing) {
      if (existing.email === newUser.email) {
        throw { message: "Email sudah terdaftar!", status: 400 };
      }
      if (existing.username === newUser.username) {
        throw { message: "Username sudah digunakan!", status: 400 };
      }
      if (existing.id_number === newUser.id_number) {
        throw { message: "NIM sudah digunakan!", status: 400 };
      }
    }
    const hashedPassword = hashPassword(newUser.password);

    const userToInsert = {
      ...newUser,
      password: hashedPassword,
    };
    await collection.insertOne(userToInsert);

    return "Berhasil menambahkan user.";
  }

  static async findByEmail(email: string) {
    const collection = await this.collection();
    return await collection.findOne({ email });
  }

  static async findByIdNumber(id: string | number) {
    const parseId = typeof id === "string" ? parseInt(id) : id;
    const collection = await this.collection();
    return await collection.findOne({ id_number: parseId });
  }

  static async getUserById(id: string) {
    const collection = await this.collection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  static async updateUser(id: string, userData: Partial<userType>) {
    const collection = await this.collection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: userData },
    );

    if (result.matchedCount === 0) {
      throw new Error("User not found");
    }

    return await collection.findOne({ _id: new ObjectId(id) });
  }

  static async deleteUser(id: string) {
    try {
      const collection = await this.collection();

      return await collection.deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers(
    page: number = 1,
    limit: number = 10,
    search: string = "",
  ) {
    const currentLimit = Number(limit);
    const currentPage = Number(page);
    const skip = (currentPage - 1) * currentLimit;

    const collection = await this.collection();

    const searchQuery =
      search && search.trim() !== ""
        ? {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
              { username: { $regex: search, $options: "i" } },
              { role: { $regex: search, $options: "i" } },
            ],
          }
        : {};

    const totalCount = await collection.countDocuments(searchQuery);

    const users = await collection
      .find(searchQuery)
      .skip(skip)
      .limit(currentLimit)
      .project({ password: 0 })
      .toArray();

    return {
      users,
      pagination: {
        currentPage,
        totalPages: Math.ceil(totalCount / currentLimit),
        totalItems: totalCount,
        itemsPerPage: currentLimit,
        hasNextPage: currentPage < Math.ceil(totalCount / currentLimit),
        hasPrevPage: currentPage > 1,
      },
    };
  }
}

export default UserModel;
