import { NextRequest, NextResponse } from "next/server";
import PengarangModel from "@/db/models/PengarangModel";
import { CachingService } from "@/utils/caching";

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

    // delete chatbot cache while CUD library entity
    const chatbotCache = await CachingService.getCache("DB:CHATBOT:SOURCE");
    chatbotCache &&
      (await CachingService.deleteCacheByKey("DB:CHATBOT:SOURCE"));

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
