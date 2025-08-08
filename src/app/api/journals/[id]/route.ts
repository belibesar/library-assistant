import { NextRequest, NextResponse } from "next/server";
import JournalModel from "@/db/models/JournalModel";
import journalSchema from "@/libs/schemas/JournalSchema";
import { Journal } from "@/libs/types/JournalType";
import { CachingService } from "@/utils/caching";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const data = await JournalModel.getJournalById(id);
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
      message: `Data for Journal ID ${id}`,
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const currentJournal = await JournalModel.getJournalById(id);

    if (!currentJournal) {
      return NextResponse.json(
        {
          success: false,
          message: `Journal with id ${id} not found!`,
        },
        {
          status: 404,
        },
      );
    }

    const requestData = await request.json();
    const timestamp = new Date().toISOString();

    const newData: Journal = {
      id: requestData.id || currentJournal.id,
      judul: requestData.judul || currentJournal.judul,
      abstrak: requestData.abstrak ?? currentJournal.abstrak,
      jumlah: Number(requestData.jumlah) || currentJournal.jumlah,
      tersedia: Number(requestData.tersedia) || currentJournal.tersedia,
      dipinjam: Number(requestData.dipinjam) || currentJournal.dipinjam,
      jurnal_id: requestData.jurnal_id || currentJournal.jurnal_id,
      publikasi_name: requestData.publikasi_name,
      publikasi_volume: requestData.publikasi_volume,
      publikasi_tahun: requestData.publikasi_tahun,
      count: currentJournal.count || 0,
      createdAt: currentJournal.createdAt,
      updatedAt: timestamp,
    };

    const journalData = await journalSchema.parseAsync(newData);
    const updatedJournal = await JournalModel.updateJournal(id, journalData);

    // delete chatbot cache while CUD library entity
    const chatbotCache = await CachingService.getCache("DB:CHATBOT:SOURCE");
    chatbotCache &&
      (await CachingService.deleteCacheByKey("DB:CHATBOT:SOURCE"));

    return NextResponse.json({
      success: true,
      message: `Journal with id ${id} has been updated`,
      data: updatedJournal,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const currentJournal = await JournalModel.getJournalById(id);
    console.log("current journal", currentJournal);
    if (!currentJournal) {
      throw new Error(`Journal not found!`);
    }

    const deleteJournal = await JournalModel.deleteJournal(id);

    // delete chatbot cache while CUD library entity
    const chatbotCache = await CachingService.getCache("DB:CHATBOT:SOURCE");
    chatbotCache &&
      (await CachingService.deleteCacheByKey("DB:CHATBOT:SOURCE"));

    return NextResponse.json(
      {
        success: true,
        message: `Journal with id ${id} has been deleted`,
        data: deleteJournal,
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const journal = await JournalModel.getJournalById(id);
    if (!journal) {
      throw new Error(`Journal not found!`);
    }
    const increaseCount = await JournalModel.countJournal(id);

    // delete chatbot cache while CUD library entity
    const chatbotCache = await CachingService.getCache("DB:CHATBOT:SOURCE");
    chatbotCache &&
      (await CachingService.deleteCacheByKey("DB:CHATBOT:SOURCE"));

    return NextResponse.json(
      {
        success: true,
        message: `Journal count with id ${id} has been updated`,
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
