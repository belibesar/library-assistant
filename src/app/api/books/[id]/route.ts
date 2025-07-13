import RepositoryBulkCollectionModel from "@/db/models/RepositoryBulkCollectionModel";
import errHandler from "@/utils/errHandler";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const mongoDb = new RepositoryBulkCollectionModel();

export async function GET(request: NextRequest) {
  // Ambil id dari url, misal: /api/books/123
  const urlParts = request.nextUrl.pathname.split("/");
  const id = urlParts[urlParts.length - 1];
  try {
    const getAllCollections = await (await mongoDb.db())
      .listCollections()
      .toArray();
    const allCollections = getAllCollections.map((repo) => repo.name);

    let found = null;
    let foundIn = null;

    for (const collectionName of allCollections) {
      const collection = await mongoDb.getRepository(collectionName);
      let data = null;
      // Coba cari dengan ObjectId, Number, dan String sekaligus
      const filter: any = {
        $or: [
          (() => {
            try {
              return { _id: new ObjectId(id) };
            } catch {
              return null;
            }
          })(),
          !isNaN(Number(id)) ? { _id: Number(id) } : null,
          { _id: id },
        ].filter(Boolean),
      };
      data = await collection.findOne(filter);
      if (data) {
        found = data;
        foundIn = collectionName;
        break;
      }
    }

    if (found) {
      return NextResponse.json({
        success: true,
        data: found,
        collection: foundIn,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Book not found in any collection",
        },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("JSON parsing error:", error);
    return errHandler(error);
  }
}
