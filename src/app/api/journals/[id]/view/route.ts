import JournalModel from "@/db/models/JournalModel";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const journal = await JournalModel.getJournalById(id);
    if (!journal) {
      throw new Error(`Journal not found!`);
    }
    const increaseCount = await JournalModel.countJournal(id);
    return NextResponse.json(
      {
        success: true,
        message: `Journal count with id ${id} has been updated`,
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