import { NextRequest, NextResponse } from "next/server";
import BookModel from "@/db/models/BookModel";
import bookSchema from "@/libs/schemas/BookSchema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
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
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const currentBook = BookModel.getBookById(id);

    if (!currentBook) {
      throw new Error(`Book not found!`);
    }

    const requestData = await request.json();
    const newData: Book = {
      id: requestData.id || +new Date(),
      judul: requestData.judul,
      abstrak: requestData.abstrak,
      jumlah: Number(requestData.jumlah),
      tersedia: Number(requestData.jumlah),
      dipinjam: Number(requestData.dipinjam) || 0,
      penerbit_id: requestData.penerbit_id,
      pengarang_id: requestData.pengarang_id,
    };

    const bookData = await bookSchema.parseAsync(newData);
    const updatedBook = await BookModel.updateBook(id, bookData);
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
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const currentBook = BookModel.getBookById(id);

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
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
}
