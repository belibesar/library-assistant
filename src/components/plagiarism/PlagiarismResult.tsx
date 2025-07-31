"use client";

import { PlagiarismResult, PlagiarismSource } from "@/libs/types/plagiarismType";
import { AlertCircle } from "lucide-react";

interface PlagiarismResultsProps {
  result: PlagiarismResult;
}

function SourceCard({ source }: { source: PlagiarismSource }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h5 className="mb-1 font-semibold text-gray-900">{source.title}</h5>
          <p className="text-sm text-gray-600">{source.author}</p>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-gray-900">
            {source.score}%
          </span>
        </div>
      </div>
      <div className="rounded border-l-4 border-blue-400 bg-blue-50 p-3">
        <p className="text-sm text-blue-800 italic">{source.quote}</p>
      </div>
    </div>
  );
}

export function PlagiarismResults({ result }: PlagiarismResultsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
        <div>
          <p className="font-medium text-yellow-800">Perlu Perhatian</p>
          <p className="mt-1 text-sm text-yellow-700">{result.warning}</p>
        </div>
      </div>

      <div className="text-center">
        <div className="mb-3 inline-flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 text-xl font-bold text-yellow-700">
          {result.similarity}%
        </div>
        <h3 className="mb-1 text-lg font-semibold text-gray-900">
          Tingkat Kemiripan
        </h3>
      </div>

      <div>
        <h4 className="mb-4 text-lg font-semibold text-gray-900">
          Sumber yang Terdeteksi:
        </h4>
        <div className="space-y-4">
          {result.sources.map((source, index) => (
            <SourceCard key={index} source={source} />
          ))}
        </div>
      </div>
    </div>
  );
}
