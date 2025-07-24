import thesisSchema from "@/libs/schemas/ThesisSchema";
import { db } from "../config/mongodb";

class ThesisModel {
  static async collection() {
    return await db("skripsi");
  }

  static async getAllThesis(page: number, limit: number, search: string) {
    const currentLimit = Number(limit);
    const currentPage = Number(page);
    const skip = (currentPage - 1) * currentLimit;

    const collection = await this.collection();

    // Build search query
    const searchQuery =
      search && search.trim() !== ""
        ? { judul: { $regex: search, $options: "i" } }
        : {};

    // Get total count for pagination
    const totalCount = await collection.countDocuments(searchQuery);

    // Get paginated results
    const thesis = await collection
      .find(searchQuery)
      .limit(currentLimit)
      .skip(skip)
      .toArray();

    return {
      thesis,
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

  static async getThesisById(id: string) {
    const collection = await this.collection();
    const journal = await collection
      .aggregate([
        {
          $match: { id: id }, // Filter dokumen berdasarkan id buku
        },
        {
          $lookup: {
            from: "mahasiswa",
            localField: "nim",
            foreignField: "id",
            as: "mahasiswa",
          },
        },
        {
          $unwind: {
            path: "$mahasiswa",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();
    return journal;
  }

  static async createThesis(data: Thesis) {
    try {
      const collection = await this.collection();
      const thesis = await collection.insertOne(data);
      return thesis;
    } catch (error) {
      throw error;
    }
  }

  static async updateThesis(id: string, data: Thesis) {
    try {
      const collection = await this.collection();
      const identifier = { id };
      const currentThesis = await collection.findOne(identifier);
      console.log(currentThesis);

      if (!currentThesis) {
        throw new Error("Thesis not found");
      }
      return await collection.updateOne(identifier, { $set: data });
    } catch (error) {
      throw error;
    }
  }

  static async deleteThesis(id: string) {}
}

export default ThesisModel;
