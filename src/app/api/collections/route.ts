import BookModel from "@/db/models/BookModel";
import JournalModel from "@/db/models/JournalModel";
import ThesisModel from "@/db/models/ThesisModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 3);
  const search = searchParams.get("search") || "";

  try {
    const fetchLimit = limit * 3; 
    const [books, journals, thesis] = await Promise.all([
      BookModel.getAllBook(1, fetchLimit, search),
      JournalModel.getAllJournal(1, fetchLimit, search),
      ThesisModel.getAllThesis(1, fetchLimit, search),
    ]);

    const bookTotal = await BookModel.getCountBooks();
    const journalTotal = await JournalModel.getCountJournals();
    const thesisTotal = await ThesisModel.getCountThesis();
    const totalAllCollections = bookTotal + journalTotal + thesisTotal;

    const booksData = books.books.map((b: any) => ({ ...b, type: "book" }));
    const journalsData = journals.journals.map((j: any) => ({
      ...j,
      type: "journal",
    }));
    const thesisData = thesis.thesis.map((t: any) => ({
      ...t,
      type: "thesis",
    }));

    // Interleaving
    const maxLength = Math.max(
      booksData.length,
      journalsData.length,
      thesisData.length,
    );
    const interleaved: any[] = [];
    for (let i = 0; i < maxLength; i++) {
      if (booksData[i]) interleaved.push(booksData[i]);
      if (journalsData[i]) interleaved.push(journalsData[i]);
      if (thesisData[i]) interleaved.push(thesisData[i]);
    }

    // Pagination global
    const startIndex = (page - 1) * limit;
    const paginatedData = interleaved.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      success: true,
      message: "Success!",
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: totalAllCollections,
        totalPages: Math.ceil(totalAllCollections / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
