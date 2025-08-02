import { NextRequest, NextResponse } from "next/server";
import PublikasiModel from "@/db/models/PublikasiModel";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const publikasi = await PublikasiModel.getPublikasiById(id);
    
    if (!publikasi) {
      return NextResponse.json(
        {
          success: false,
          message: `Publikasi with id ${id} not found!`,
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: `Publikasi with id ${id} found!`,
      data: publikasi,
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
    const currentPublikasi = await PublikasiModel.getPublikasiById(id);

    if (!currentPublikasi) {
      return NextResponse.json(
        {
          success: false,
          message: `Publikasi with id ${id} not found!`,
        },
        {
          status: 404,
        },
      );
    }

    const requestData = await request.json();

    const publikasiData = {
      id: requestData.id || currentPublikasi.id,
      name: requestData.name || currentPublikasi.name,
      volume: requestData.volume || currentPublikasi.volume,
      tahun: requestData.tahun || currentPublikasi.tahun,
    };

    const updatedPublikasi = await PublikasiModel.updatePublikasi(id, publikasiData);
    return NextResponse.json({
      success: true,
      message: `Publikasi with id ${id} has been updated`,
      data: updatedPublikasi,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
}
