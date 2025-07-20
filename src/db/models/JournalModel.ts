import { db } from "../config/mongodb";

class JournalModel {
  static async collection() {
    return await db("jurnal");
  }

  static async getAllJournal(page: number, limit: number, search: string) {
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
    const journals = await collection
      .find(searchQuery)
      .limit(currentLimit)
      .skip(skip)
      .toArray();

    return {
      journals,
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

  static async getJournalById(id: string) {
    const collection = await this.collection();
    const journal = await collection
      .aggregate([
        {
          $match: { id: id }, // Filter dokumen berdasarkan id buku
        },
        {
          $lookup: {
            from: "publikasi",
            localField: "jurnal_id",
            foreignField: "id",
            as: "publikasi",
          },
        },
        {
          $unwind: {
            path: "$publikasi",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();
    return journal;
  }

  static async createJournal(data) {}

  static async updateJournal(id: string, data) {}

  static async deleteJournal(id: string) {}
}

export default JournalModel;
