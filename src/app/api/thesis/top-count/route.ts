import { NextRequest, NextResponse } from "next/server";
import ThesisModel from "@/db/models/ThesisModel";

export async function GET(request: NextRequest) {
  try {
    const topCountThesis = await ThesisModel.getTop5MostAccessedThesis();

    return NextResponse.json({
      success: true,
      message: "Top 5 thesis with highest count retrieved successfully",
      data: topCountThesis,
      total: topCountThesis.length
    });

  } catch (error) {
    console.error("Error getting top count thesis:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve top count thesis",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}