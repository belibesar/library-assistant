import { NextRequest, NextResponse } from "next/server";
import BookModel from "@/db/models/BookModel";

export async function GET(request: NextRequest) {
  try {
    const topCountBooks = await BookModel.getTop5MostBorrowedBooks();
    const totalBooks = await BookModel.getCountBooks();

    return NextResponse.json({
      success: true,
      message: "Top 5 books with highest count retrieved successfully",
      data: topCountBooks,
      count: topCountBooks.length,
      totalAllData: totalBooks,
    });
  } catch (error) {
    console.error("Error getting top count books:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve top count books",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
