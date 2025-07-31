import { NextRequest, NextResponse } from "next/server";
import BookModel from "@/db/models/BookModel";
import bookSchema from "@/libs/schemas/BookSchema";
import { Book } from "@/libs/types/BookType";

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
    const newData: Book = {
      id: requestData.id || +new Date(),
      judul: requestData.judul,
      abstrak: requestData.abstrak,
      rak: requestData.rak, //field baru
      sinopsis: requestData.sinopsis, //field baru
      lokasi: requestData.lokasi, //field baru
      jumlah: Number(requestData.jumlah),
      tersedia: Number(requestData.jumlah),
      dipinjam: 0,
      penerbit_id: requestData.penerbit_id,
      pengarang_id: requestData.pengarang_id,
      createdAt: timestamp.toISOString(),
      updatedAt: timestamp.toISOString(),
    };

    const bookData = await bookSchema.parseAsync(newData);
    const insertBook = await BookModel.createBook(bookData);
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
