import { NextRequest, NextResponse } from "next/server";
import BookModel from "@/db/models/BookModel";

export async function GET(request: NextRequest) {
  try {
    const topBorrowedBooks = await BookModel.getTop5MostBorrowedBooks();

    return NextResponse.json({
      success: true,
      message: "Top 5 most borrowed books retrieved successfully",
      data: topBorrowedBooks,
    });

  } catch (error) {
    console.error("Error getting top borrowed books:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve top borrowed books",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
