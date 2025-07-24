import ThesisModel from "@/db/models/ThesisModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const foundedThesis = await ThesisModel.getThesisById(id);
    const dataThesis = foundedThesis[0];
    if (!dataThesis) {
      return NextResponse.json(
        {
          success: false,
          message: `Thesis with id ${id} not found!`,
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      status: true,
      message: `Thesis with id ${id} found!`,
      data: dataThesis,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
