import { NextRequest, NextResponse } from "next/server";
import PublikasiModel from "@/db/models/PublikasiModel";
import { CachingService } from "@/utils/caching";

export async function GET(request: NextRequest) {
  try {
    const publikasi = await PublikasiModel.getAllPublikasi();
    return NextResponse.json({
      success: true,
      message: "Success!",
      data: publikasi,
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

    const publikasiData = {
      id: requestData.id,
      name: requestData.name,
      volume: requestData.volume,
      tahun: requestData.tahun,
    };

    const createdPublikasi =
      await PublikasiModel.createPublikasi(publikasiData);

    // delete chatbot cache while CUD library entity
    const chatbotCache = await CachingService.getCache("DB:CHATBOT:SOURCE");
    chatbotCache &&
      (await CachingService.deleteCacheByKey("DB:CHATBOT:SOURCE"));

    return NextResponse.json(
      {
        success: true,
        message: "Publikasi created successfully!",
        data: createdPublikasi,
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
