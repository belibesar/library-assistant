import { NextRequest, NextResponse } from "next/server";
import JournalModel from "@/db/models/JournalModel";
import journalSchema from "@/libs/schemas/JournalSchema";
import { CachingService } from "@/utils/caching";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "5");
  const search = searchParams.get("search") || "";

  try {
    const data = await JournalModel.getAllJournal(page, limit, search);

    return NextResponse.json({
      success: true,
      message: "Success!",
      data: data.journals,
      pagination: data.pagination,
    });
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch journals",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const timestamp = new Date().toISOString();

    const newJournal = {
      id: requestData.id || undefined,
      judul: requestData.judul,
      abstrak: requestData.abstrak,
      jurnal_id: requestData.jurnal_id || undefined,
      publikasi_name: requestData.publikasi_name,
      publikasi_volume: requestData.publikasi_volume,
      publikasi_tahun: requestData.publikasi_tahun,
      authors: requestData.authors,
      link: requestData.link,
      count: 0,
      createdAt: timestamp,
      updatedAt: timestamp,
      // jumlah: typeof requestData.jumlah === "number" ? requestData.jumlah : undefined,
      // tersedia: typeof requestData.tersedia === "number" ? requestData.tersedia : undefined,
      // dipinjam: typeof requestData.dipinjam === "number" ? requestData.dipinjam : undefined,
    };

    const journalData = await journalSchema.parseAsync(newJournal);

    const createdJournal = await JournalModel.createJournal(journalData);

    // Clear chatbot cache
    const chatbotCache = await CachingService.getCache("DB:CHATBOT:SOURCE");
    if (chatbotCache) {
      await CachingService.deleteCacheByKey("DB:CHATBOT:SOURCE");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Journal created successfully!",
        data: createdJournal,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create journal",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
