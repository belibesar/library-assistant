import { NextRequest, NextResponse } from "next/server";
import BookModel from "@/db/models/BookModel";
import bookSchema from "@/libs/schemas/BookSchema";
import { Book } from "@/libs/types/BookType";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const data = await BookModel.getBookById(id);
    if (!data[0]) {
      return NextResponse.json(
        {
          success: false,
          message: "Data not found!",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json({
      success: true,
      message: `Data for Book ID ${id}`,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const currentBook = await BookModel.getBookById(id);

    if (!currentBook) {
      throw new Error(`Book not found!`);
    }

    const requestData = await request.json();
    const newData = {
      id: requestData.id || currentBook.id,
      judul: requestData.judul,
      abstrak: "karena buku hanya ada sinopsis", // Default value as specified
      rak: requestData.rak,
      sinopsis: requestData.sinopsis,
      lokasi: requestData.lokasi,
      jumlah: Number(requestData.jumlah),
      tersedia: Number(requestData.tersedia),
      dipinjam: Number(requestData.dipinjam) || 0,
      penerbit_id: currentBook.penerbit_id, // Will be updated by model if needed
      pengarang_id: currentBook.pengarang_id, // Will be updated by model if needed
      // Pass additional data for model processing
      pengarang_name: requestData.pengarang_name,
      pengarang_nationality: requestData.pengarang_nationality,
      penerbit_name: requestData.penerbit_name,
      createdAt: requestData.createdAt || currentBook.createdAt,
      updatedAt: new Date().toISOString(),
    };

    // Let BookModel handle the update and pengarang/penerbit processing
    const updatedBook = await BookModel.updateBook(id, newData);
    return NextResponse.json({
      success: true,
      message: `Book with id ${id} has been updated`,
      data: updatedBook,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const currentBook = await BookModel.getBookById(id);
    console.log("current book", currentBook);
    if (!currentBook) {
      throw new Error(`Book not found!`);
    }

    const deleteBook = await BookModel.deleteBook(id);
    return NextResponse.json(
      {
        success: true,
        message: `Book with id ${id} has been deleted`,
        data: deleteBook,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const book = await BookModel.getBookById(id);
    if (!book) {
      throw new Error(`Book not found!`);
    }
    const increaseCount = await BookModel.countBook(id);
    return NextResponse.json(
      {
        success: true,
        message: `Book count with id ${id} has been updated`,
        data: increaseCount,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
}
