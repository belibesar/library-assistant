import ThesisModel from "@/db/models/ThesisModel";
import thesisSchema from "@/libs/schemas/ThesisSchema";
import { Thesis } from "@/libs/types/ThesisType";
import { CachingService } from "@/utils/caching";
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
    const newThesis: any = {
      id: requestData.id || existing.id,
      judul: requestData.judul || existing.judul,
      abstrak: requestData.abstrak ?? existing.abstrak,
      nim: requestData.nim || existing.nim,
      nama_mahasiswa: requestData.nama_mahasiswa || existing.nama_mahasiswa,
      fakultas: requestData.fakultas || existing.fakultas,
      program_studi: requestData.program_studi || existing.program_studi,
      tahun: requestData.tahun || existing.tahun,
      link: requestData.link ?? existing.link,
      count: existing.count || 0,
      createdAt: existing.createdAt,
      updatedAt: timestamp,
    };
    if (typeof requestData.jumlah === 'number' && !isNaN(requestData.jumlah)) {
      newThesis.jumlah = requestData.jumlah;
    } else if (typeof existing.jumlah === 'number' && !isNaN(existing.jumlah)) {
      newThesis.jumlah = existing.jumlah;
    }
    if (typeof requestData.tersedia === 'number' && !isNaN(requestData.tersedia)) {
      newThesis.tersedia = requestData.tersedia;
    } else if (typeof existing.tersedia === 'number' && !isNaN(existing.tersedia)) {
      newThesis.tersedia = existing.tersedia;
    }
    if (typeof requestData.dipinjam === 'number' && !isNaN(requestData.dipinjam)) {
      newThesis.dipinjam = requestData.dipinjam;
    } else if (typeof existing.dipinjam === 'number' && !isNaN(existing.dipinjam)) {
      newThesis.dipinjam = existing.dipinjam;
    }

    const thesisData = await thesisSchema.parseAsync(newThesis);
    const updatedThesis = await ThesisModel.updateThesis(id, thesisData);

    // delete chatbot cache while CUD library entity
    const chatbotCache = await CachingService.getCache("DB:CHATBOT:SOURCE");
    chatbotCache &&
      (await CachingService.deleteCacheByKey("DB:CHATBOT:SOURCE"));

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
    // delete chatbot cache while CUD library entity
    const chatbotCache = await CachingService.getCache("DB:CHATBOT:SOURCE");
    chatbotCache &&
      (await CachingService.deleteCacheByKey("DB:CHATBOT:SOURCE"));

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
    // delete chatbot cache while CUD library entity
    const chatbotCache = await CachingService.getCache("DB:CHATBOT:SOURCE");
    chatbotCache &&
      (await CachingService.deleteCacheByKey("DB:CHATBOT:SOURCE"));

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
