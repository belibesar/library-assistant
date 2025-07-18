// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { Search, BookOpen, User, Tag, Edit3, Trash2  } from 'lucide-react';
// import { Buku } from '@/libs/types';

// // interface Book {
// //   id: string;
// //   title: string;
// //   author: string;
// //   category: string;
// //   year: number;
// //   description: string;
// //   available: number;
// //   total: number;
// //   rating?: number;
// //   isbn?: string;
// //   publisher?: string;
// // }

// export default function SearchPage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState<Buku[]>([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [activeTab, setActiveTab] = useState<'books' | 'authors' | 'categories'>('books');
//   const [hasSearched, setHasSearched] = useState(false);

//   // Mock data for demonstration
//   const mockBooks: Buku[] = [
//     {
//       id: '1',
//       title: 'Pengantar Filsafat Barat',
//       author: 'Dr. Ahmad Suryadi',
//       category: 'Filsafat',
//       year: 2020,
//       description: 'Buku pengantar komprehensif tentang sejarah dan perkembangan filsafat Barat dari zaman kuno hingga modern. Membahas pemikiran para filosof...',
//       available: 3,
//       total: 5,
//       rating: 4.5,
//       isbn: '978-623-123-456-7',
//       publisher: 'Penerbit Universitas'
//     },
//     {
//       id: '2',
//       title: 'Artificial Intelligence dan Machine Learning',
//       author: 'Dr. Budi Santoso',
//       category: 'Teknologi',
//       year: 2022,
//       description: 'Panduan lengkap tentang AI dan ML dengan implementasi praktis menggunakan Python. Cocok untuk pemula hingga menengah.',
//       available: 5,
//       total: 5,
//       rating: 4.7,
//       isbn: '978-623-234-567-8',
//       publisher: 'Tech Publications'
//     },
//     {
//       id: '3',
//       title: 'Filsafat Timur dan Barat',
//       author: 'Prof. Raden Mas Soedarsono',
//       category: 'Filsafat',
//       year: 2020,
//       description: 'Perbandingan pemikiran filosofis antara tradisi Timur dan Barat. Membahas Konfusianisme, Buddhisme, dan filsafat Yunani.',
//       available: 2,
//       total: 3,
//       rating: 4.3,
//       isbn: '978-623-345-678-9',
//       publisher: 'Philosophy Press'
//     },
//     {
//       id: '4',
//       title: 'Psikologi Kognitif Modern',
//       author: 'Prof. Maria Sari',
//       category: 'Psikologi',
//       year: 2023,
//       description: 'Eksplorasi mendalam tentang proses kognitif manusia dalam era digital.',
//       available: 4,
//       total: 6,
//       rating: 4.6,
//       isbn: '978-623-456-789-0',
//       publisher: 'Academic Press'
//     }
//   ];

//   const performSearch = useCallback((query: string) => {
//     if (!query.trim()) {
//       setSearchResults([]);
//       setHasSearched(false);
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);
//     setHasSearched(true);

//     setTimeout(() => {
//       const filtered = mockBooks.filter(book => 
//         book.title.toLowerCase().includes(query.toLowerCase()) ||
//         book.author.toLowerCase().includes(query.toLowerCase()) ||
//         book.category.toLowerCase().includes(query.toLowerCase()) ||
//         book.description.toLowerCase().includes(query.toLowerCase())
//       );
      
//       setSearchResults(filtered);
//       setIsSearching(false);
//     }, 300);
//   }, []);

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       performSearch(searchQuery);
//     }, 500);

//     return () => {
//       clearTimeout(timeoutId);
//       if (!searchQuery.trim()) {
//         setIsSearching(false);
//       }
//     };
//   }, [searchQuery, performSearch]);

//   const getTabCounts = () => {
//     const books = searchResults.length;
//     const authors = new Set(searchResults.map(book => book.author)).size;
//     const categories = new Set(searchResults.map(book => book.category)).size;
    
//     return { books, authors, categories };
//   };
// const getCategoryDescription = (category: string): string => {
//     const descriptions: Record<string, string> = {
//       'Filsafat': 'Buku-buku tentang filsafat dan pemikiran',
//       'Teknologi': 'Buku-buku tentang teknologi dan komputer',
//       'Psikologi': 'Buku-buku psikologi dan ilmu perilaku',
//       'Teologi': 'Buku-buku teologi dan studi agama',
//       'Sastra': 'Buku-buku sastra dan karya fiksi',
//       'Sejarah': 'Buku-buku sejarah dan kajian masa lalu',
//       'Ekonomi': 'Buku-buku ekonomi dan bisnis',
//       'Metodologi': 'Buku-buku metodologi penelitian'
//     };
    
//     return descriptions[category] || `Buku-buku dalam kategori ${category}`;
//   };
//   const getFilteredResults = () => {
//     switch (activeTab) {
//       case 'books':
//         return searchResults;
//       case 'authors':
//         const authorsMap = new Map();
//         searchResults.forEach(book => {
//           if (!authorsMap.has(book.author)) {
//             authorsMap.set(book.author, []);
//           }
//           authorsMap.get(book.author).push(book);
//         });
//         return Array.from(authorsMap.entries());
//       case 'categories':
//         const categoriesMap = new Map();
//         searchResults.forEach(book => {
//           if (!categoriesMap.has(book.category)) {
//             categoriesMap.set(book.category, []);
//           }
//           categoriesMap.get(book.category).push(book);
//         });
//         return Array.from(categoriesMap.entries());
//       default:
//         return searchResults;
//     }
//   };

//   const { books: bookCount, authors: authorCount, categories: categoryCount } = getTabCounts();

//   return (
//     <div className="max-w-7xl mx-auto mt-[-20px]">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Pencarian</h1>
//         <p className="text-gray-600">
//           Cari buku, pengarang, dan kategori dengan AI
//         </p>
//       </div>
// <div className="flex w-full flex-col py-2">
//         <div className="w-full rounded-lg bg-white p-4 shadow-sm border border-gray-200">
//             <div className="relative">
//         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//           <Search className="w-5 h-5 text-gray-400" />
//         </div>
//         <input
//   type="text"
//   className="w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//   placeholder="Cari buku, pengarang, atau topik..."
//   value={searchQuery}
//   onChange={(e) => setSearchQuery(e.target.value)}
// />

//       </div>
//         </div>
      
//       </div>

//       {hasSearched && (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//           {isSearching ? (
//             <div className="text-center py-16">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 Sedang mencari...
//               </h3>
//               <p className="text-gray-500">
//                 AI sedang menganalisis database perpustakaan
//               </p>
//             </div>
//           ) : searchResults.length === 0 ? (
//             <div className="text-center py-16">
//               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <BookOpen className="w-8 h-8 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 Tidak ada hasil ditemukan
//               </h3>
//               <p className="text-gray-500">
//                 Coba gunakan kata kunci yang berbeda
//               </p>
//             </div>
//           ) : (
//             <div>
//               <div className="border-b border-gray-200 px-6">
//                 <nav className="flex space-x-8">
//                   <button
//                     onClick={() => setActiveTab('books')}
//                     className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
//                       activeTab === 'books'
//                         ? 'border-blue-500 text-blue-600'
//                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                     }`}
//                   >
//                     <BookOpen className="w-4 h-4" />
//                     Buku ({bookCount})
//                   </button>
                  
//                   <button
//                     onClick={() => setActiveTab('authors')}
//                     className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
//                       activeTab === 'authors'
//                         ? 'border-blue-500 text-blue-600'
//                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                     }`}
//                   >
//                     <User className="w-4 h-4" />
//                     Pengarang ({authorCount})
//                   </button>
                  
//                   <button
//                     onClick={() => setActiveTab('categories')}
//                     className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
//                       activeTab === 'categories'
//                         ? 'border-blue-500 text-blue-600'
//                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                     }`}
//                   >
//                     <Tag className="w-4 h-4" />
//                     Kategori ({categoryCount})
//                   </button>
//                 </nav>
//               </div>

//               <div className="p-6">
//   {activeTab === 'books' && (
//     <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//       {searchResults.map((book) => (
//         <div
//           key={book.id}
//           className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100"
//         >
//           <div className="p-4 pb-3">
//             <div className="mb-1 flex items-start justify-between">
//               <div>
//                 <BookOpen size={30} color="#113FF7" />
//               </div>
//               <div className="flex gap-1">
//                 <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600">
//                   <Edit3 size={16} />
//                 </button>
//                 <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600">
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-3">
//               <h3 className="line-clamp-2 text-lg leading-tight font-bold text-gray-900">
//                 {book.title}
//               </h3>
//               <p className="text-sm text-gray-600">oleh {book.author}</p>

//               <span className="inline-block rounded-full bg-gray-100 px-3 text-xs font-medium text-gray-700">
//                 {book.category}
//               </span>

//               <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
//                 {book.description}
//               </p>
//             </div>
//           </div>

//           <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
//             <div className="flex items-center justify-between">
//               <span className="text-md text-gray-500">{book.year}</span>
//               <span
//                 className={`rounded-md px-2 py-1 text-sm font-semibold ${
//                   book.available > 0
//                     ? 'bg-green-50 text-green-600'
//                     : 'bg-red-50 text-red-600'
//                 }`}
//               >
//                 {book.available}/{book.total} tersedia
//               </span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   )}

//                {activeTab === 'authors' && (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {(getFilteredResults() as [string, Buku[]][]).map(([author, books]) => (
//                       <div key={author} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow duration-200">
//                         <div className="flex items-center gap-3">
//                           <div className="flex items-center justify-center flex-shrink-0">
//                             <User size={32} color="#113FF7" />
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <h3 className="font-semibold text-gray-900 text-base truncate">{author}</h3>
//                             <p className="text-sm text-gray-600">Pengarang</p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {activeTab === 'categories' && (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//     {(getFilteredResults() as [string, Buku[]][]).map(([category, books]) => (
//       <div
//         key={category}
//         className="border border-gray-200 rounded-md p-3 bg-white hover:shadow-sm transition-shadow duration-200"
//       >
//         <div className="flex items-start gap-2">
//           <Tag size={20} className="mt-2" color='#8927B2' />
//           <div className="flex-1 min-w-0">
//             <h3 className="font-medium text-md text-gray-900 mb-0.5">{category}</h3>
//             <p className="text-md text-gray-600 leading-snug line-clamp-3">
//               {getCategoryDescription(category)}
//             </p>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// )}

//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {!hasSearched && !isSearching && (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//           <div className="text-center py-16">
//             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Search className="w-10 h-10 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               Mulai Pencarian Anda
//             </h3>
//             <p className="text-gray-500 mb-6">
//               Ketik di kolom pencarian untuk menemukan buku, pengarang, atau topik secara real-time
//             </p>
//             <div className="flex justify-center">
//               <div className="text-sm text-gray-400">
//                 💡 Tips: Pencarian akan dimulai secara otomatis saat Anda mengetik
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }