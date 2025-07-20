import { NextRequest, NextResponse } from "next/server";
import BookModel from "@/db/models/BookModel";

export async function GET(request: NextRequest) {
  // Get search parameters from the URL
  const searchParams = request.nextUrl.searchParams;

  // Extract specific parameters
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "5";
  const search = searchParams.get("search") || "";

  console.log("Search params:", {});

  try {
    const data = await BookModel.getAllBook(
      parseInt(page),
      parseInt(limit),
      search,
    );
    return NextResponse.json({
      success: true,
      message: "Connected!",
      data: data.books,
      pagination: data.pagination,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
}
