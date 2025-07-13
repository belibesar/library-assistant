import RepositoryBulkCollectionModel from "@/db/models/RepositoryBulkCollectionModel";
import errHandler from "@/utils/errHandler";
import { NextRequest, NextResponse } from "next/server";

const mongoDb = new RepositoryBulkCollectionModel();

//url: /api/books?search=literature&page=1&limit=10
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
    const allData: any = {};
    for (const collectionName of allCollections) {
      const collection = await mongoDb.getRepository(collectionName);
      const data = await collection
        .find(query)
        .skip(skip)
        .limit(limit)
        .toArray();
      allData[collectionName] = data;
    }

    return NextResponse.json({
      success: true,
      data: allData,
    });
  } catch (error) {
    console.error("JSON parsing error:", error);
    return errHandler(error);
  }
}
