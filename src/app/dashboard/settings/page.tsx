'use client';

import React, { useEffect, useState } from 'react';
import { BookData, JournalData, ThesisData } from '@/libs/types';

export default function SettingsPage() {
  const [topBooks, setTopBooks] = useState<BookData[]>([]);
  const [topJournals, setTopJournals] = useState<JournalData[]>([]);
  const [topThesis, setTopThesis] = useState<ThesisData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const booksResponse = await fetch('/api/books/top-borrowed');
        const booksData = await booksResponse.json();
        if (booksData.success) {
          setTopBooks(booksData.data);
        }

        const journalsResponse = await fetch('/api/journals/top-count');
        const journalsData = await journalsResponse.json();
        if (journalsData.success) {
          setTopJournals(journalsData.data);
        }

        const thesisResponse = await fetch('/api/thesis/top-count');
        const thesisData = await thesisResponse.json();
        if (thesisData.success) {
          setTopThesis(thesisData.data);
        }

      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setError('Failed to load analytics data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshData = () => {
    setLoading(true);
    setError(null);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl text-center font-bold mb-6 text-gray-800">📊 Analitic Perpus</h1>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <fieldset key={item} className="text-xl max-w-sm border-4 border-gray-300 rounded-lg p-2 animate-pulse">
              <legend className="px-2 text-xl font-semibold text-gray-400">
                Loading...
              </legend>
              <div className="flex flex-col gap-2 px-2">
                {[1, 2, 3, 4, 5].map((line) => (
                  <div key={line}>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                    {line < 5 && <hr className="opacity-30" />}
                  </div>
                ))}
              </div>
            </fieldset>
          ))}
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl text-center font-bold mb-6 text-gray-800">📊 Analitic Perpus</h1>
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📊 Analitic Perpus</h1>
        <button
          onClick={refreshData}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
          disabled={loading}
        >
          🔄 Refresh Data
        </button>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <fieldset className="text-xl w-full max-w-sm border-4 border-green-500 rounded-lg p-2">
          <legend className="px-2 text-xl font-semibold underline decoration-green-500/60 decoration-2">
            Top 5 Most Borrowed Books
          </legend>
          <div className="flex flex-col gap-2 px-2 text-md font-serif">
            {topBooks.length > 0 ? (
              topBooks.map((book, index) => (
                <div key={book._id}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{book.judul}</span>
                    <span className="text-sm text-gray-600">({book.count || 0})</span>
                  </div>
                 
                  {index < topBooks.length - 1 && <hr />}
                </div>
              ))
            ) : (
              <div className="text-gray-500">No books data available</div>
            )}
          </div>
        </fieldset>

        <fieldset className="text-xl w-full max-w-sm border-4 border-blue-500 rounded-lg p-2">
          <legend className="px-2 text-xl font-semibold underline decoration-blue-500/60 decoration-2">
            Top 5 Most Accessed Journals
          </legend>
          <div className="flex flex-col gap-2 px-2 text-md font-serif">
            {topJournals.length > 0 ? (
              topJournals.map((journal, index) => (
                <div key={journal._id}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{journal.judul}</span>
                    <span className="text-sm text-gray-600">({journal.count || 0})</span>
                  </div>
                  
                  {index < topJournals.length - 1 && <hr />}
                </div>
              ))
            ) : (
              <div className="text-gray-500">No journals data available</div>
            )}
          </div>
        </fieldset>

        <fieldset className="text-xl w-full max-w-sm border-4 border-purple-500 rounded-lg p-2">
          <legend className="px-2 text-xl font-semibold underline decoration-purple-500/60 decoration-2">
            Top 5 Most Accessed Thesis
          </legend>
          <div className="flex flex-col gap-2 px-2 text-md font-serif">
            {topThesis.length > 0 ? (
              topThesis.map((thesis, index) => (
                <div key={thesis._id}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{thesis.judul}</span>
                    <span className="text-sm text-gray-600">({thesis.count || 0})</span>
                  </div>
                  
                  {index < topThesis.length - 1 && <hr />}
                </div>
              ))
            ) : (
              <div className="text-gray-500">No thesis data available</div>
            )}
          </div>
        </fieldset>
        
        <fieldset className="text-xl w-full max-w-sm border-4 border-orange-500 rounded-lg p-2">
          <legend className="px-2 text-xl font-semibold underline decoration-orange-500/60 decoration-2">
            Top 5 Books with Highest Count
          </legend>
          <div className="flex flex-col gap-2 px-2 text-md font-serif">
            {topBooks.length > 0 ? (
              topBooks.map((book, index) => (
                <div key={book._id}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{book.judul}</span>
                    <span className="text-sm text-gray-600">({book.count || 0})</span>
                  </div>
                  {index < topBooks.length - 1 && <hr />}
                </div>
              ))
            ) : (
              <div className="text-gray-500">No books data available</div>
            )}
          </div>
        </fieldset>
      </section>
    </div>
  );
}
