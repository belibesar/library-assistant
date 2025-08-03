import { NextRequest, NextResponse } from "next/server";
import PengarangModel from "@/db/models/PengarangModel";

export async function GET() {
  try {
    const pengarangs = await PengarangModel.getAllPengarang();
    return NextResponse.json({
      success: true,
      data: pengarangs,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const insertPengarang = await PengarangModel.createPengarang(requestData);
    return NextResponse.json(
      {
        success: true,
        message: "Pengarang created!",
        data: insertPengarang,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      },
    );
  }
}
