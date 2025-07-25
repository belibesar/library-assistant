import ThesisModel from "@/db/models/ThesisModel";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const book = await ThesisModel.getThesisById(id);
    if (!book) {
      throw new Error(`Thesis not found!`);
    }
    const increaseCount = await ThesisModel.countThesis(id);
    return NextResponse.json(
      {
        success: true,
        message: `Thesis count with id ${id} has been updated`,
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