import { NextRequest, NextResponse } from "next/server";
import BookModel from "@/db/models/BookModel";
import bookSchema from "@/libs/schemas/BookSchema";
import { Book } from "@/libs/types/BookType";
import { CachingService } from "@/utils/caching";

export async function GET(request: NextRequest) {
  // Get search parameters from the URL
  const searchParams = request.nextUrl.searchParams;

  // Extract specific parameters
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "5";
  const search = searchParams.get("search") || "";

  try {
    const data = await BookModel.getAllBook(
      parseInt(page),
      parseInt(limit),
      search,
    );
    return NextResponse.json({
      success: true,
      message: "Success!",
      data: data.books,
      pagination: data.pagination,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const timestamp = new Date();
    const newData = {
      id: requestData.id || `B${Date.now()}`,
      judul: requestData.judul,
      abstrak: "karena buku hanya ada sinopsis", // Default value as specified
      rak: requestData.rak,
      sinopsis: requestData.sinopsis,
      lokasi: requestData.lokasi,
      jumlah: Number(requestData.jumlah),
      tersedia: Number(requestData.tersedia || requestData.jumlah),
      dipinjam: Number(requestData.dipinjam || 0),
      penerbit_id: "", // Will be set by model
      pengarang_id: "", // Will be set by model
      // Pass additional data for model processing
      pengarang_name: requestData.pengarang_name,
      pengarang_nationality: requestData.pengarang_nationality,
      penerbit_name: requestData.penerbit_name,
      createdAt: timestamp.toISOString(),
      updatedAt: timestamp.toISOString(),
    };

    // Let BookModel handle the creation and pengarang/penerbit processing
    const insertBook = await BookModel.createBook(newData);

    // delete chatbot cache while CUD library entity
    const chatbotCache = await CachingService.getCache("DB:CHATBOT:SOURCE");
    chatbotCache &&
      (await CachingService.deleteCacheByKey("DB:CHATBOT:SOURCE"));

    return NextResponse.json(
      {
        success: true,
        message: "created!",
        data: insertBook,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      },
    );
  }
}
