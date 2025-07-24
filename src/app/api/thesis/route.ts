import ThesisModel from "@/db/models/ThesisModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 5;
  const search = searchParams.get("search") || "";
  try {
    const data = await ThesisModel.getAllThesis(
      Number(page),
      Number(limit),
      search,
    );
    return NextResponse.json({
      success: true,
      message: "Success!",
      data: data.thesis,
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


