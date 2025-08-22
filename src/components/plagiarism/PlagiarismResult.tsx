"use client";

import {
  PlagiarismResult,
  PlagiarismSource,
} from "@/libs/types/plagiarismType";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

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

      <div className="mb-3">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-600">Tingkat Kesamaan</span>
          <span className="font-medium text-gray-900">{source.score}%</span>
        </div>
        <div className="h-3 w-full rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              source.score >= 80
                ? "bg-red-500"
                : source.score >= 50
                  ? "bg-yellow-500"
                  : "bg-green-500"
            }`}
            style={{ width: `${source.score}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function PlagiarismResults({ result }: PlagiarismResultsProps) {
  const getColor = () => {
    switch (result.status) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
          text: "text-green-800",
          ring: "ring-green-100 text-green-700",
        };
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          icon: <AlertCircle className="h-5 w-5 text-yellow-600" />,
          text: "text-yellow-800",
          ring: "ring-yellow-100 text-yellow-700",
        };
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          icon: <XCircle className="h-5 w-5 text-red-600" />,
          text: "text-red-800",
          ring: "ring-red-100 text-red-700",
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          icon: <AlertCircle className="h-5 w-5 text-gray-500" />,
          text: "text-gray-800",
          ring: "ring-gray-100 text-gray-700",
        };
    }
  };

  const color = getColor();

  return (
    <div className="space-y-6">
      {/* Alert Section */}
      <div
        className={`flex items-start gap-3 rounded-lg ${color.border} ${color.bg} p-4`}
      >
        <div className="mt-0.5 flex-shrink-0">{color.icon}</div>
        <div>
          <p className={`font-medium ${color.text}`}>Status Pemeriksaan</p>
          <p className={`mt-1 text-sm ${color.text}`}>{result.warning}</p>
          <p className={`mt-1 text-sm font-medium ${color.text}`}>
            {result.recommendation}
          </p>
        </div>
      </div>

      {/* Similarity Score */}
      <div className="text-center">
        <div
          className={`mb-3 inline-flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold ${color.ring}`}
        >
          {result.similarity}%
        </div>
        <h3 className="mb-1 text-lg font-semibold text-gray-900">
          Tingkat Kemiripan
        </h3>
      </div>

      {/* Source List */}
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
