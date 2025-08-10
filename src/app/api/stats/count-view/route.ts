import BookModel from "@/db/models/BookModel";
import JournalModel from "@/db/models/JournalModel";
import ThesisModel from "@/db/models/ThesisModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalBookAccess = await BookModel.getTotalAccessCount();
    const totalJournalAccess = await JournalModel.getTotalAccessCount();
    const totalThesisAccess = await ThesisModel.getTotalAccessCount();

    return NextResponse.json({
      totalBookAccess,
      totalJournalAccess,
      totalThesisAccess,
      totalAllAccess: totalBookAccess + totalJournalAccess + totalThesisAccess,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching total access counts" },
      { status: 500 },
    );
  }
}
