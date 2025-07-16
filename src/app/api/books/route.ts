import RepositoryBulkCollectionModel from "@/db/models/RepositoryBulkCollectionModel";
import errHandler from "@/utils/errHandler";
import { NextRequest, NextResponse } from "next/server";

const mongoDb = new RepositoryBulkCollectionModel();

export async function GET(request: NextRequest) {
  const params = request.nextUrl;
  const searchParams = params.searchParams;
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;
  const query = search
    ? {
        judul: { $regex: search, $options: "i" },
      }
    : {};
  try {
    const getAllCollections = await (await mongoDb.db())
      .listCollections()
      .toArray();
    const allCollections = getAllCollections.map((repo) => repo.name);
    let allBooks: any[] = [];
    for (const collectionName of allCollections) {
      const collection = await mongoDb.getRepository(collectionName);
      const data = await collection.find(query).toArray();
      const mapped = data.map((item: any) => ({
        title: item.judul || "",
        author: "",
        category: "",
        ...item,
      }));
      allBooks = allBooks.concat(mapped);
    }
    const paginatedBooks = allBooks.slice(skip, skip + limit);
    return NextResponse.json({
      success: true,
      data: paginatedBooks,
      total: allBooks.length,
      page,
      limit,
    });
  } catch (error) {
    console.error("JSON parsing error:", error);
    return errHandler(error);
  }
}
