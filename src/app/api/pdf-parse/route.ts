import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Dynamic import untuk menghindari masalah SSR
    const pdf = (await import("pdf-parse")).default;

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const data = await pdf(buffer);

    return NextResponse.json({ text: data.text });
  } catch (err) {
    console.error("PDF Parse Error:", err);
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
  }
}
