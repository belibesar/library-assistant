import BookModel from "@/db/models/BookModel";
import SkripsiModel from "@/db/models/ThesisModel";
import JournalModel from "@/db/models/JournalModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ error: "Query Not Found" }, { status: 400 });
  }

  const [books, skripsi, jurnal] = await Promise.all([
    BookModel.findSimilarBooks(text),
    SkripsiModel.findSimilarThesis(text),
    JournalModel.findSimilarJournals(text),
  ]);

  const allResults = [
    ...books.map((item: any) => ({
      title: item.judul,
      abstrak: item.abstrak,
      sinopsis: item.sinopsis,
      score: item.score,
      sourceType: "buku",
      sourceId: item._id?.toString() ?? undefined,
    })),
    ...skripsi.map((item: any) => ({
      title: item.judul,
      abstrak: item.abstrak,
      score: item.score,
      sourceType: "skripsi",
      sourceId: item._id?.toString() ?? undefined,
    })),
    ...jurnal.map((item: any) => ({
      title: item.judul,
      abstrak: item.abstrak,
      score: item.score,
      sourceType: "jurnal",
      sourceId: item._id?.toString() ?? undefined,
    })),
  ];

  const sortedSources = allResults
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const highestScore = Math.round(sortedSources[0]?.score ?? 0);

  let status: "success" | "warning" | "error" = "success";
  let warning = "";
  let recommendation = "";

  if (highestScore <= 10) {
    status = "success";
    warning = "Sangat Orisinal";
    recommendation = "Lolos tanpa catatan.";
  } else if (highestScore <= 30) {
    status = "success";
    warning = "Cukup Orisinal";
    recommendation = "Perlu dicek kutipan dan referensi.";
  } else if (highestScore <= 50) {
    status = "warning";
    warning = "Banyak Kemiripan";
    recommendation = "Perlu review mendalam dan revisi sebagian.";
  } else {
    status = "error";
    warning = "Diduga Plagiarisme";
    recommendation = "Perlu direvisi total atau investigasi lebih lanjut.";
  }

  const plagiarismResult = {
    similarity: highestScore,
    status,
    sources: sortedSources,
    checkedAt: new Date().toISOString(),
    warning,
    recommendation,
  };

  return NextResponse.json(plagiarismResult);
}
