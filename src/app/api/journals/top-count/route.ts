import { NextRequest, NextResponse } from "next/server";
import JournalModel from "@/db/models/JournalModel";

export async function GET(request: NextRequest) {
  try {
    const topCountJournals = await JournalModel.getTop5MostAccessedJournals();

    return NextResponse.json({
      success: true,
      message: "Top 5 journals with highest count retrieved successfully",
      data: topCountJournals,
      total: topCountJournals.length
    });

  } catch (error) {
    console.error("Error getting top count journals:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve top count journals",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
