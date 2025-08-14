import BookModel from "@/db/models/BookModel";
import JournalModel from "@/db/models/JournalModel";
import ThesisModel from "@/db/models/ThesisModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 5);
  const search = searchParams.get("search") || "";

  try {
    const [books, journals, thesis] = await Promise.all([
      BookModel.getAllBook(page, limit, search),
      JournalModel.getAllJournal(page, limit, search),
      ThesisModel.getAllThesis(page, limit, search),
    ]);
    const bookTotal = await BookModel.getCountBooks();
    const JournalTotal = await JournalModel.getCountJournals();
    const ThesisTotal = await ThesisModel.getCountThesis();
    const totalAllCollections = bookTotal + JournalTotal + ThesisTotal;

    const combined = [
      ...books.books.map((b: any) => ({ ...b, type: "book" })),
      ...journals.journals.map((j: any) => ({ ...j, type: "journal" })),
      ...thesis.thesis.map((t: any) => ({ ...t, type: "thesis" })),
    ];

    // optional: sorting by createdAt or title
    combined.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return NextResponse.json({
      success: true,
      message: "Success!",
      data: combined,
      pagination: {
        page,
        limit,
        total: combined.length,
        totalCollections: totalAllCollections,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
