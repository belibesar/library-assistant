import { NextRequest, NextResponse } from "next/server";
import ThesisModel from "@/db/models/ThesisModel";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const data = await ThesisModel.getThesisById(id);
    if (!data[0]) {
      return NextResponse.json(
        {
          success: false,
          message: "Data not found!",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json({
      success: true,
      message: `Data for Thesis ID ${id}`,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await ThesisModel.countThesis(id);
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Thesis not found!",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: `View count incremented for Thesis ID ${id}`,
      data: { modified: result.modifiedCount },
    });
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to increment view count",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}
