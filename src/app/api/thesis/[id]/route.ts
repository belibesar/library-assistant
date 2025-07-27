import ThesisModel from "@/db/models/ThesisModel";
import thesisSchema from "@/libs/schemas/ThesisSchema";
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const requestData = await request.json();
    const timestamp = new Date().toISOString();

    const foundedThesis = await ThesisModel.getThesisById(id);
    if (!foundedThesis[0]) {
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
    const existing = foundedThesis[0]; // dari database
    const newThesis: Thesis = {
      id: requestData.id || existing.id,
      judul: requestData.judul || existing.judul,
      abstrak: requestData.abstrak ?? existing.abstrak,
      nim: requestData.nim || existing.nim,
      jumlah: Number(requestData.jumlah ?? existing.jumlah),
      dipinjam: Number(requestData.dipinjam ?? existing.dipinjam),
      tersedia: Number(requestData.tersedia ?? existing.tersedia),
      tahun: requestData.tahun || existing.tahun,
      createdAt: existing.createdAt,
      updatedAt: timestamp,
    };

    const thesisData = await thesisSchema.parseAsync(newThesis);
    const updatedThesis = await ThesisModel.updateThesis(id, thesisData);

    return NextResponse.json({
      success: true,
      message: "updated!",
      data: updatedThesis,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const foundedThesis = await ThesisModel.getThesisById(id);
    if (!foundedThesis[0]) {
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
    await ThesisModel.deleteThesis(id);
    return NextResponse.json({
      success: true,
      message: `Thesis with id ${id} has been deleted successfully`,
    });
  } catch (error) {
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
