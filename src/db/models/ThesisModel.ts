import thesisSchema from "@/libs/schemas/ThesisSchema";
import { db } from "../config/mongodb";
import { ObjectId } from "mongodb";
import { Thesis } from "@/libs/types/ThesisType";
import { calculateSimilarity } from "@/utils/similarity";

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

    // Get paginated results (new)
    const thesis = await collection
      .aggregate([
        {
          $match: searchQuery,
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
        {
          $skip: skip, // Apply pagination
        },
        {
          $limit: currentLimit, // Apply limit
        },
      ])
      .toArray();

    // Get paginated results (old)
    // const thesis = await collection
    //   .find(searchQuery)
    //   .limit(currentLimit)
    //   .skip(skip)
    //   .toArray();

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
    try {
      const collection = await this.collection();
      const journal = await collection
        .aggregate([
          {
            $match: { _id: new ObjectId(id) }, // Filter dokumen berdasarkan id thesis
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
      return journal[0] || null;
    } catch (error) {
      throw error;
    }
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
      const identifier = { _id: new ObjectId(id) };

      return await collection.updateOne(identifier, { $set: data });
    } catch (error) {
      throw error;
    }
  }

  static async deleteThesis(id: string) {
    try {
      const collection = await this.collection();

      return await collection.deleteOne({ id });
    } catch (error) {
      throw error;
    }
  }

  static async countThesis(id: string) {
    const collection = await this.collection();
    const identifier = { _id: new ObjectId(id) };
    const currentThesis = await collection.findOne(identifier);
    const thesisCount = currentThesis?.count || 0;
    if (!currentThesis) {
      throw new Error("Thesis not found");
    }
    return await collection.updateOne(identifier, {
      $set: {
        count: Number(thesisCount) + 1,
      },
    });
  }

  static async getTop5MostAccessedThesis() {
    const collection = await this.collection();

    const thesis = await collection
      .aggregate([
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
        {
          $sort: { count: -1 },
        },
        {
          $limit: 5,
        },
      ])
      .toArray();

    return thesis;
  }

  static async findSimilarThesis(query: string) {
    const collection = await this.collection();
    const all = await collection.find({}).toArray();

    const results = all.map((thesis: Thesis) => {
      const text = `${thesis.judul} ${thesis.abstrak || ""}`;
      const score = calculateSimilarity(query, text);
      return { ...thesis, score };
    });

    return results
      .filter((b: Thesis & { score: number }) => b.score > 0)
      .sort(
        (a: Thesis & { score: number }, b: Thesis & { score: number }) =>
          b.score - a.score,
      )
      .slice(0, 10);
  }
}

export default ThesisModel;
