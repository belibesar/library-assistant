import { NextRequest, NextResponse } from "next/server";
import JournalModel from "@/db/models/JournalModel";
import journalSchema from "@/libs/schemas/JournalSchema";
import { Journal } from "@/libs/types/JournalType";
import { CachingService } from "@/utils/caching";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Extract specific parameters
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "5";
  const search = searchParams.get("search") || "";
  try {
    const data = await JournalModel.getAllJournal(
      Number(page),
      Number(limit),
      search,
    );
    return NextResponse.json({
      success: true,
      message: "Success!",
      data: data.journals,
      pagination: data.pagination,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const timestamp = new Date().toISOString();

    const newJournal: Journal = {
      id: requestData.id || undefined, // Will be auto-generated if not provided
      judul: requestData.judul,
      abstrak: requestData.abstrak,
      jumlah: Number(requestData.jumlah),
      tersedia: Number(requestData.jumlah), // Initially tersedia = jumlah
      dipinjam: Number(requestData.dipinjam) || 0,
      jurnal_id: requestData.jurnal_id || undefined, // Will be auto-generated if not provided
      // Publikasi fields
      publikasi_name: requestData.publikasi_name,
      publikasi_volume: requestData.publikasi_volume,
      publikasi_tahun: requestData.publikasi_tahun,
      count: 0,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const journalData = await journalSchema.parseAsync(newJournal);
    const createdJournal = await JournalModel.createJournal(journalData);

    // delete chatbot cache while CUD library entity
    const chatbotCache = await CachingService.getCache("DB:CHATBOT:SOURCE");
    chatbotCache &&
      (await CachingService.deleteCacheByKey("DB:CHATBOT:SOURCE"));

    return NextResponse.json(
      {
        success: true,
        message: "Journal created successfully!",
        data: createdJournal,
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
