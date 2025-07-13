import RepositoryBulkCollectionModel from "@/db/models/RepositoryBulkCollectionModel";
import errHandler from "@/utils/errHandler";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const mongoDb = new RepositoryBulkCollectionModel();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
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
      try {
        data = await collection.findOne({
          _id: Number(id),
        });
      } catch (e) {
        // Jika id bukan ObjectId valid, skip error
      }
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
