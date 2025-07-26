'use client';

import React, { useEffect, useState } from 'react';

interface BookData {
  _id: string;
  judul: string;
  count?: number;
  pengarang?: {
    nama: string;
  };
  penerbit?: {
    nama: string;
  };
}

interface JournalData {
  _id: string;
  judul: string;
  count?: number;
  publikasi?: {
    nama: string;
  };
}

interface ThesisData {
  _id: string;
  judul: string;
  count?: number;
  mahasiswa?: {
    nama: string;
  };
  tahun: string;
}

export default function SettingsPage() {
  const [topBooks, setTopBooks] = useState<BookData[]>([]);
  const [topJournals, setTopJournals] = useState<JournalData[]>([]);
  const [topThesis, setTopThesis] = useState<ThesisData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartDataSource, setChartDataSource] = useState<'books' | 'journals' | 'thesis'>('books');

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
         <button className="button" type="button">
    <span className="button__text">Refresh</span>
    <span className="button__icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={48}
        viewBox="0 0 48 48"
        height={48}
        className="svg"
      >
        <path d="M35.3 12.7c-2.89-2.9-6.88-4.7-11.3-4.7-8.84 0-15.98 7.16-15.98 16s7.14 16 15.98 16c7.45 0 13.69-5.1 15.46-12h-4.16c-1.65 4.66-6.07 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.31 0 6.28 1.38 8.45 3.55l-6.45 6.45h14v-14l-4.7 4.7z" />
        <path fill="none" d="M0 0h48v48h-48z" />
      </svg>
    </span>
  </button>
      </div>

      <div className="group relative mb-8 flex w-full flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/20">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
        <div className="absolute inset-px rounded-[11px] bg-slate-950" />
        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">
                Library Analytics Overview
              </h3>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live
            </span>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-slate-900/50 p-3">
              <p className="text-xs font-medium text-slate-400">Total Books</p>
              <p className="text-lg font-semibold text-white">{topBooks.length > 0 ? topBooks.reduce((sum, book) => sum + (book.count || 0), 0) : 0}</p>
              <span className="text-xs font-medium text-emerald-500">
                {topBooks.length > 0 ? `${topBooks.length} items` : 'No data'}
              </span>
            </div>
            <div className="rounded-lg bg-slate-900/50 p-3">
              <p className="text-xs font-medium text-slate-400">Total Journals</p>
              <p className="text-lg font-semibold text-white">{topJournals.length > 0 ? topJournals.reduce((sum, journal) => sum + (journal.count || 0), 0) : 0}</p>
              <span className="text-xs font-medium text-emerald-500">
                {topJournals.length > 0 ? `${topJournals.length} items` : 'No data'}
              </span>
            </div>
            <div className="rounded-lg bg-slate-900/50 p-3">
              <p className="text-xs font-medium text-slate-400">Total Thesis</p>
              <p className="text-lg font-semibold text-white">{topThesis.length > 0 ? topThesis.reduce((sum, thesis) => sum + (thesis.count || 0), 0) : 0}</p>
              <span className="text-xs font-medium text-emerald-500">
                {topThesis.length > 0 ? `${topThesis.length} items` : 'No data'}
              </span>
            </div>
          </div>
          <div className="mb-4 h-24 w-full overflow-hidden rounded-lg bg-slate-900/50 p-3">
            <div className="flex h-full w-full items-end justify-between gap-1">
              {(() => {
                let currentData: any[] = [];
                let colorClass = 'bg-indigo-500';
                let colorClassHover = 'hover:bg-indigo-400';
                
                switch(chartDataSource) {
                  case 'books':
                    currentData = topBooks;
                    colorClass = 'bg-green-500';
                    colorClassHover = 'hover:bg-green-400';
                    break;
                  case 'journals':
                    currentData = topJournals;
                    colorClass = 'bg-blue-500';
                    colorClassHover = 'hover:bg-blue-400';
                    break;
                  case 'thesis':
                    currentData = topThesis;
                    colorClass = 'bg-purple-500';
                    colorClassHover = 'hover:bg-purple-400';
                    break;
                }

                if (currentData.length > 0) {
                  return currentData.slice(0, 7).map((item, index) => {
                    const maxCount = Math.max(...currentData.map(d => d.count || 0));
                    const heightPercentage = maxCount > 0 ? ((item.count || 0) / maxCount) * 100 : 20;
                    const normalizedHeight = Math.max(20, Math.min(95, heightPercentage));
                    
                    return (
                      <div 
                        key={item._id} 
                        className={`w-3 rounded-sm ${colorClass}/30 relative group`}
                        style={{ height: `${normalizedHeight}%` }}
                        title={`${item.judul}: ${item.count || 0} views`}
                      >
                        <div 
                          className={`w-full rounded-sm ${colorClass} transition-all duration-300 ${colorClassHover}`}
                          style={{ height: '80%' }}
                        />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {item.judul.length > 20 ? `${item.judul.substring(0, 20)}...` : item.judul}
                          <br />
                          Count: {item.count || 0}
                        </div>
                      </div>
                    );
                  });
                } else {
                  return Array.from({length: 7}).map((_, index) => (
                    <div 
                      key={index} 
                      className="w-3 rounded-sm bg-gray-500/30"
                      style={{ height: `${20 + (index * 10)}%` }}
                    >
                      <div 
                        className="w-full rounded-sm bg-gray-500 transition-all duration-300" 
                        style={{ height: '50%' }}
                      />
                    </div>
                  ));
                }
              })()}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400">
                Chart Data: 
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setChartDataSource('books')}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    chartDataSource === 'books' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                >
                  Books
                </button>
                <button
                  onClick={() => setChartDataSource('journals')}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    chartDataSource === 'journals' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                >
                  Journals
                </button>
                <button
                  onClick={() => setChartDataSource('thesis')}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    chartDataSource === 'thesis' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                >
                  Thesis
                </button>
              </div>
            </div>
            <button 
              onClick={refreshData}
              className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-xs font-medium text-white transition-all duration-300 hover:from-indigo-600 hover:to-purple-600"
            >
              Refresh Data
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>
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
