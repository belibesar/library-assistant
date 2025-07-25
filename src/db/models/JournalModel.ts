import { ObjectId } from "mongodb";
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
          $match: { _id: new ObjectId(id) }, // Filter dokumen berdasarkan id buku
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
    return journal[0] || null;
  }

  static async createJournal(data: Journal) {
    const collection = await this.collection();
    const journal = await collection.insertOne(data);
    return journal;
  }

  static async updateJournal(id: string, data: Journal) {
    const collection = await this.collection();
    const identifier = { _id: new ObjectId(id) };
    const currenJournal = await collection.findOne(identifier);
    if (!currenJournal) {
      throw new Error("Journal not found");
    }
    return await collection.updateOne(identifier, { $set: data });
  }

  static async deleteJournal(id: string) {
    const collection = await this.collection();
    const query = { id };
    const currentJournal = await collection.findOne(query);
    if (!currentJournal) {
      throw new Error("Book not found");
    }
    return await collection.deleteOne(query);
  }

  static async countJournal(id: string) {
    const collection = await this.collection();
    const identifier = { _id: new ObjectId(id) };
    const currentJournal = await collection.findOne(identifier);
    const journalCount = currentJournal?.count || 0;
    if (!currentJournal) {
      throw new Error("Journal not found");
    }
    return await collection.updateOne(identifier, {
      $set: {
        count: Number(journalCount) + 1,
      },
    });
  }
}

export default JournalModel;
