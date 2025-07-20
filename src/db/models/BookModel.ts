import { db } from "../config/mongodb";

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

    // Get paginated results
    const books = await collection
      .find(searchQuery)
      .limit(currentLimit)
      .skip(skip)
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
    return book;
  }
}

export default BookModel;
