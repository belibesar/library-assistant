import ThesisModel from "@/db/models/ThesisModel";
import thesisSchema from "@/libs/schemas/ThesisSchema";
import { Thesis } from "@/libs/types/ThesisType";
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
    return NextResponse.json(
      {
        success: false,
        message: error,
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
    const timestamp = new Date().toISOString();

    const newThesis: Thesis = {
      id: requestData.id || +new Date(),
      judul: requestData.judul,
      abstrak: requestData.abstrak,
      count: 0,
      nim: requestData.nim,
      tahun: requestData.tahun,
      jumlah: Number(requestData.jumlah),
      tersedia: Number(requestData.jumlah),
      dipinjam: Number(requestData.dipinjam) || 0,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    const thesisData = await thesisSchema.parseAsync(newThesis);
    const createdThesis = await ThesisModel.createThesis(thesisData);

    return NextResponse.json({
      success: true,
      message: "created!",
      data: createdThesis,
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
