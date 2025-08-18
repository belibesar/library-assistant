import bookSchema from "@/libs/schemas/BookSchema";
import { db } from "../config/mongodb";
import { ObjectId } from "mongodb";
import { Book } from "@/libs/types/BookType";
import { calculateSimilarity } from "@/utils/similarity";
import PengarangModel from "./PengarangModel";
import PenerbitModel from "./PenerbitModel";

class BookModel {
  static async collection() {
    return await db("buku");
  }

  static async getAllBook(page: number, limit: number, search: string) {
    const currentLimit = Number(limit);
    const currentPage = Number(page);
    const skip = (currentPage - 1) * currentLimit;

    const collection = await this.collection();

    const searchQuery =
      search && search.trim() !== ""
        ? { judul: { $regex: search, $options: "i" } }
        : {};

    const totalCount = await collection.countDocuments(searchQuery);

    const books = await collection
      .aggregate([
        {
          $match: searchQuery,
        },
        {
          $lookup: {
            from: "pengarang",
            localField: "pengarang_id",
            foreignField: "id",
            as: "pengarang",
          },
        },
        {
          $lookup: {
            from: "penerbit",
            localField: "penerbit_id",
            foreignField: "id",
            as: "penerbit",
          },
        },
        {
          $unwind: {
            path: "$pengarang",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$penerbit",
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

    return {
      books,
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

  static async getBookById(id: string) {
    const collection = await this.collection();
    const book = await collection
      .aggregate([
        {
          $match: { _id: new ObjectId(id) },
        },
        {
          $lookup: {
            from: "pengarang",
            localField: "pengarang_id",
            foreignField: "id",
            as: "pengarang",
          },
        },
        {
          $lookup: {
            from: "penerbit",
            localField: "penerbit_id",
            foreignField: "id",
            as: "penerbit",
          },
        },
        {
          $unwind: {
            path: "$pengarang",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$penerbit",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();
    console.log("ini boook di find one", book[0]);
    return book[0] || null;
  }

  static async createBook(data: Book) {
    const collection = await this.collection();

    if ((data as any).pengarang_name) {
      const pengarangId = await PengarangModel.findOrCreatePengarang({
        name: (data as any).pengarang_name,
        nationality: (data as any).pengarang_nationality,
      });
      data.pengarang_id = pengarangId;
    }

    if ((data as any).penerbit_name) {
      const penerbitId = await PenerbitModel.findOrCreatePenerbit({
        name: (data as any).penerbit_name,
      });
      data.penerbit_id = penerbitId;
    }

    data.abstrak = "karena buku hanya ada sinopsis";

    const bookDataToSave = { ...data };
    delete (bookDataToSave as any).pengarang_name;
    delete (bookDataToSave as any).pengarang_nationality;
    delete (bookDataToSave as any).penerbit_name;

    const book = await collection.insertOne(bookDataToSave);
    return book;
  }

  static async updateBook(id: string, data: Book) {
    const collection = await this.collection();
    const identifier = { _id: new ObjectId(id) };
    const currentBook = await collection.findOne(identifier);
    if (!currentBook) {
      throw new Error("Book not found");
    }

    if ((data as any).pengarang_name) {
      const pengarangId = await PengarangModel.findOrCreatePengarang({
        name: (data as any).pengarang_name,
        nationality: (data as any).pengarang_nationality,
      });
      data.pengarang_id = pengarangId;
    } else if (!data.pengarang_id) {
      data.pengarang_id = currentBook.pengarang_id;
    }

    if ((data as any).penerbit_name) {
      const penerbitId = await PenerbitModel.findOrCreatePenerbit({
        name: (data as any).penerbit_name,
      });
      data.penerbit_id = penerbitId;
    } else if (!data.penerbit_id) {
      data.penerbit_id = currentBook.penerbit_id;
    }

    data.abstrak = "karena buku hanya ada sinopsis";

    const bookDataToSave = { ...data };
    delete (bookDataToSave as any).pengarang_name;
    delete (bookDataToSave as any).pengarang_nationality;
    delete (bookDataToSave as any).penerbit_name;

    return await collection.updateOne(identifier, { $set: bookDataToSave });
  }

  static async deleteBook(id: string) {
    const collection = await this.collection();
    const query = { _id: new ObjectId(id) };
    const currentBook = await collection.findOne(query);
    if (!currentBook) {
      throw { message: "Book not found!", status: 404 };
    }
    return await collection.deleteOne(query);
  }

  static async countBook(id: string) {
    const collection = await this.collection();
    const identifier = { _id: new ObjectId(id) };
    const currentBook = await collection.findOne(identifier);
    const bookCount = currentBook?.count || 0;
    if (!currentBook) {
      throw new Error("Book not found");
    }
    return await collection.updateOne(identifier, {
      $set: {
        count: Number(bookCount) + 1,
      },
    });
  }

  static async getCountBooks() {
    const collection = await this.collection();
    const count = await collection.countDocuments();
    return count;
  }

  static async getTotalAccessCount() {
    const collection = await this.collection();
    const result = await collection
      .aggregate([{ $group: { _id: null, totalCount: { $sum: "$count" } } }])
      .toArray();

    return result[0]?.totalCount ?? 0;
  }

  static async getTop5MostBorrowedBooks() {
    const collection = await this.collection();

    const books = await collection
      .aggregate([
        {
          $lookup: {
            from: "pengarang",
            localField: "pengarang_id",
            foreignField: "id",
            as: "pengarang",
          },
        },
        {
          $lookup: {
            from: "penerbit",
            localField: "penerbit_id",
            foreignField: "id",
            as: "penerbit",
          },
        },
        {
          $unwind: {
            path: "$pengarang",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$penerbit",
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

    return books;
  }

  static async findSimilarBooks(query: string) {
    const collection = await this.collection();
    const allBooks = await collection.find({}).toArray();

    const results = allBooks.map((book: Book) => {
      const text = `${book.judul} ${book.abstrak || ""}`;
      const score = calculateSimilarity(query, text);
      return { ...book, score };
    });

    return results
      .filter((b: Book & { score: number }) => b.score > 0)
      .sort(
        (a: Book & { score: number }, b: Book & { score: number }) =>
          b.score - a.score,
      )
      .slice(0, 10);
  }
}

export default BookModel;
