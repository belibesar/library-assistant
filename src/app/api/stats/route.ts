import BookModel from "@/db/models/BookModel";
import JournalModel from "@/db/models/JournalModel";
import ThesisModel from "@/db/models/ThesisModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const bookcount = await BookModel.getCountBooks();
        const journalcount = await JournalModel.getCountJournals();
        const skripsicount = await ThesisModel.getCountThesis();
        return NextResponse.json({ bookcount, journalcount, skripsicount });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching stats" });
    }
}