import { NextRequest, NextResponse } from "next/server";
import JournalModel from "@/db/models/JournalModel";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Extract specific parameters
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "5";
  const search = searchParams.get("search") || "";
  try {
    const data = await JournalModel.getAllJournal(
      Number(page),
      Number(limit),
      search,
    );
    return NextResponse.json({
      success: true,
      message: "Success!",
      data: data.journals,
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
