"use client";

import { CheckCircle } from "lucide-react";
import { EmptyState } from "./EmtyState";
import { LoadingState } from "./LoadingState";
import { PlagiarismResults } from "./PlagiarismResult";
import { PlagiarismResult } from "@/libs/types/plagiarismType";
interface ResultsPanelProps {
  result: PlagiarismResult | null;
  isChecking: boolean;
}

export function ResultsPanel({ result, isChecking }: ResultsPanelProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-gray-700" />
        <h2 className="text-xl font-semibold text-gray-900">
          Hasil Pemeriksaan
        </h2>
      </div>

      {!result && !isChecking ? (
        <EmptyState />
      ) : isChecking ? (
        <LoadingState />
      ) : result ? (
        <PlagiarismResults result={result} />
      ) : null}
    </div>
  );
}
