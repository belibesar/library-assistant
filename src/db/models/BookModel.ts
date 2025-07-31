import bookSchema from "@/libs/schemas/BookSchema";
import { db } from "../config/mongodb";
import { ObjectId } from "mongodb";
import { Book } from "@/libs/types/BookType";

class BookModel {
  static async collection() {
    return await db("buku");
  }

  static async getAllBook(page: number, limit: number, search: string) {
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

    // Get paginated results with aggregation
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
          $match: { id: id }, // Filter dokumen berdasarkan id buku
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
    const book = await collection.insertOne(data);
    return book;
  }

  static async updateBook(id: string, data: Book) {
    const collection = await this.collection();
    const identifier = { id: id };
    const currentBook = await collection.findOne(identifier);
    if (!currentBook) {
      throw new Error("Book not found");
    }
    return await collection.updateOne(identifier, { $set: data });
  }

  static async deleteBook(id: string) {
    const collection = await this.collection();
    const query = { id: id };
    const currentBook = await collection.findOne(query);
    if (!currentBook) {
      throw new Error("Book not found");
    }
    return await collection.deleteOne(query);
  }

  static async countBook(id: string) {
    const collection = await this.collection();
    const identifier = { id: id };
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
}

export default BookModel;
