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

  static async createThesis(data) {}

  static async updateThesis(id: string, data) {}

  static async deleteThesis(id: string) {}
}

export default ThesisModel;
