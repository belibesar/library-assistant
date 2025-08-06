import { ObjectId } from "mongodb";
import { db } from "../config/mongodb";
import { Journal } from "@/libs/types/JournalType";
import { calculateSimilarity } from "@/utils/similarity";
import PublikasiModel from "./PublikasiModel";

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
      .aggregate([
        {
          $match: searchQuery,
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
        {
          $skip: skip, // Apply pagination
        },
        {
          $limit: currentLimit, // Apply limit
        },
      ])
      .toArray();

    // Get paginated results
    // const journal = await collection
    //   .find(searchQuery)
    //   .limit(currentLimit)
    //   .skip(skip)
    //   .toArray();

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
          $match: { id: id },
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

  static async generateNextId(): Promise<string> {
    const collection = await this.collection();

    const latestJournal = await collection
      .find({ id: { $regex: /^ART\d{3}$/ } })
      .sort({ id: -1 })
      .limit(1)
      .toArray();

    if (latestJournal.length === 0) {
      return "ART021";
    }

    const latestId = latestJournal[0].id;
    const currentNumber = parseInt(latestId.substring(3), 10);
    const nextNumber = currentNumber + 1;

    return `ART${nextNumber.toString().padStart(3, "0")}`;
  }

  static async generateNextJurnalId(): Promise<string> {
    const collection = await this.collection();

    const latestJournal = await collection
      .find({ jurnal_id: { $regex: /^JRN\d{3}$/ } })
      .sort({ jurnal_id: -1 })
      .limit(1)
      .toArray();

    if (latestJournal.length === 0) {
      return "JRN006";
    }

    const latestId = latestJournal[0].jurnal_id;
    const currentNumber = parseInt(latestId.substring(3), 10);
    const nextNumber = currentNumber + 1;

    return `JRN${nextNumber.toString().padStart(3, "0")}`;
  }

  static async createJournal(data: Journal) {
    const collection = await this.collection();

    if (!data.id) {
      data.id = await this.generateNextId();
    }

    if (data.publikasi_name) {
      const publikasiId = await PublikasiModel.findOrCreatePublikasi({
        name: data.publikasi_name,
        volume: data.publikasi_volume,
        tahun: data.publikasi_tahun,
      });

      data.jurnal_id = publikasiId;
    } else if (!data.jurnal_id) {
      data.jurnal_id = await this.generateNextJurnalId();
    }

    const journalDataToSave = { ...data };
    delete journalDataToSave.publikasi_name;
    delete journalDataToSave.publikasi_volume;
    delete journalDataToSave.publikasi_tahun;

    const journal = await collection.insertOne(journalDataToSave);
    return journal;
  }

  static async updateJournal(id: string, data: Journal) {
    const collection = await this.collection();
    const identifier = { id: id };
    const currentJournal = await collection.findOne(identifier);
    if (!currentJournal) {
      throw new Error("Journal not found");
    }

    if (!data.id) {
      data.id = currentJournal.id;
    }

    if (data.publikasi_name) {
      const publikasiId = await PublikasiModel.findOrCreatePublikasi({
        name: data.publikasi_name,
        volume: data.publikasi_volume,
        tahun: data.publikasi_tahun,
      });

      data.jurnal_id = publikasiId;
    } else if (!data.jurnal_id) {
      data.jurnal_id = currentJournal.jurnal_id;
    }

    const journalDataToSave = { ...data };
    delete journalDataToSave.publikasi_name;
    delete journalDataToSave.publikasi_volume;
    delete journalDataToSave.publikasi_tahun;

    return await collection.updateOne(identifier, { $set: journalDataToSave });
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
    const identifier = { id: id };
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

  static async getCountJournals() {
    const collection = await this.collection();
    const count = await collection.countDocuments();
    return count;
  }

  static async getTop5MostAccessedJournals() {
    const collection = await this.collection();

    const journals = await collection
      .aggregate([
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
        {
          $sort: { count: -1 },
        },
        {
          $limit: 5,
        },
      ])
      .toArray();

    return journals;
  }

  static async findSimilarJournals(query: string) {
    const collection = await this.collection();
    const allJournals = await collection.find({}).toArray();

    const results = allJournals.map((journal: Journal) => {
      const text = `${journal.judul} ${journal.abstrak || ""}`;
      const score = calculateSimilarity(query, text);
      return { ...journal, score };
    });

    return results
      .filter((b: Journal & { score: number }) => b.score > 0)
      .sort(
        (a: Journal & { score: number }, b: Journal & { score: number }) =>
          b.score - a.score,
      )
      .slice(0, 10);
  }
}

export default JournalModel;
