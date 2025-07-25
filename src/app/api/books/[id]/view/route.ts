import BookModel from "@/db/models/BookModel";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
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
