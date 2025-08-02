import ThesisModel from "@/db/models/ThesisModel";
import thesisSchema from "@/libs/schemas/ThesisSchema";
import { Thesis } from "@/libs/types/ThesisType";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const foundedThesis = await ThesisModel.getThesisById(id);
    if (!foundedThesis) {
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
      success: true,
      message: `Thesis with id ${id} found!`,
      data: foundedThesis,
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
    if (!foundedThesis) {
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
    const existing = foundedThesis;
    const newThesis: Thesis = {
      id: requestData.id || existing.id,
      judul: requestData.judul || existing.judul,
      abstrak: requestData.abstrak ?? existing.abstrak,
      nim: requestData.nim || existing.nim,
      tahun: requestData.tahun || existing.tahun,
      jumlah: Number(requestData.jumlah) || existing.jumlah,
      tersedia: Number(requestData.tersedia) || existing.tersedia,
      dipinjam: Number(requestData.dipinjam) || existing.dipinjam,
      count: existing.count || 0,
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
    if (!foundedThesis) {
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const thesis = await ThesisModel.getThesisById(id);
    if (!thesis) {
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
