import { NextRequest, NextResponse } from "next/server";
import PenerbitModel from "@/db/models/PenerbitModel";

export async function GET() {
  try {
    const penerbits = await PenerbitModel.getAllPenerbit();
    return NextResponse.json({
      success: true,
      data: penerbits,
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
    const insertPenerbit = await PenerbitModel.createPenerbit(requestData);
    return NextResponse.json(
      {
        success: true,
        message: "Penerbit created!",
        data: insertPenerbit,
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
