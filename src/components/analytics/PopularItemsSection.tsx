"use client";

import { BookOpen, Newspaper, FileText } from "lucide-react";
import VerticalBarChart from "./VerticalBarChart";
import { PopularItem } from "@/libs/types/analisisType";

interface PopularItemsSectionProps {
  topBooks: PopularItem[];
  topJournals: PopularItem[];
  topThesis: PopularItem[];
  totalBooks?: number;
  totalJournals?: number;
  totalThesis?: number;
  loading: boolean;
}

export default function PopularItemsSection({
  topBooks,
  topJournals,
  topThesis,
  totalBooks = 0,
  totalJournals = 0,
  totalThesis = 0,
  loading,
}: PopularItemsSectionProps) {
  return (
    <div className="mt-6">
      {/* Total Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total Books */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Buku</p>
              {loading ? (
                <div className="mt-1 h-8 w-16 animate-pulse rounded bg-blue-200"></div>
              ) : (
                <p className="text-2xl font-bold text-blue-800">
                  {totalBooks.toLocaleString()}
                </p>
              )}
            </div>
            <div className="rounded-full bg-blue-100 p-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Journals */}
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">
                Total Jurnal
              </p>
              {loading ? (
                <div className="mt-1 h-8 w-16 animate-pulse rounded bg-purple-200"></div>
              ) : (
                <p className="text-2xl font-bold text-purple-800">
                  {totalJournals.toLocaleString()}
                </p>
              )}
            </div>
            <div className="rounded-full bg-purple-100 p-2">
              <Newspaper className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Total Thesis */}
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">
                Total Skripsi
              </p>
              {loading ? (
                <div className="mt-1 h-8 w-16 animate-pulse rounded bg-orange-200"></div>
              ) : (
                <p className="text-2xl font-bold text-orange-800">
                  {totalThesis.toLocaleString()}
                </p>
              )}
            </div>
            <div className="rounded-full bg-orange-100 p-2">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Popular Items Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Top Books */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Buku Terpopuler</h3>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 animate-pulse rounded bg-gray-100"
                ></div>
              ))}
            </div>
          ) : (
            <>
              <VerticalBarChart data={topBooks.slice(0, 5)} color="#3b82f6" />
              <div className="mt-4 space-y-2">
                {topBooks.slice(0, 5).map((book) => (
                  <div key={book._id} className="flex justify-between text-sm">
                    <span className="truncate">{book.judul}</span>
                    <span className="font-medium">{book.count}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Top Journals */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-semibold">Jurnal Terpopuler</h3>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 animate-pulse rounded bg-gray-100"
                ></div>
              ))}
            </div>
          ) : (
            <>
              <VerticalBarChart
                data={topJournals.slice(0, 5)}
                color="#8b5cf6"
              />
              <div className="mt-4 space-y-2">
                {topJournals.slice(0, 5).map((journal) => (
                  <div
                    key={journal._id}
                    className="flex justify-between text-sm"
                  >
                    <span className="truncate">{journal.judul}</span>
                    <span className="font-medium">{journal.count}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Top Thesis */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold">Skripsi Terpopuler</h3>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 animate-pulse rounded bg-gray-100"
                ></div>
              ))}
            </div>
          ) : (
            <>
              <VerticalBarChart data={topThesis.slice(0, 5)} color="#f97316" />
              <div className="mt-4 space-y-2">
                {topThesis.slice(0, 5).map((thesis) => (
                  <div
                    key={thesis._id}
                    className="flex justify-between text-sm"
                  >
                    <span className="truncate">{thesis.judul}</span>
                    <span className="font-medium">{thesis.count}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
