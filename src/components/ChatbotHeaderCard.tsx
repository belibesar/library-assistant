// components/ChatbotHeaderCard.tsx
'use client';

import React from 'react';
import { BookOpen, MessageSquare, FileCheck } from 'lucide-react';
interface ChatbotHeaderCardProps {
  onTagClick: (tagText: string) => void;
}

const ChatbotHeaderCard: React.FC<ChatbotHeaderCardProps> = ({ onTagClick }) => {
  return (
    <div className="bg-base-100 p-6 rounded-lg shadow-lg mb-6"> {/* Card styling */}
      <div className="flex items-center gap-2">
        <BookOpen size={25} color="#113FF7" />
        <h2 className="text-xl font-bold mb-2">Asisten Perpustakaan USD</h2>
      </div>
      <p className="text-sm text-gray-500 mb-2">
        Universitas Sanata Dharma - Jelajahi koleksi perpustakaan dan temukan buku yang Anda cari
      </p>

      <div className="flex gap-2 flex-wrap">
<button className="px-4 py-1 text-xs bg-gray-100 font-bold text-black rounded-full transition flex items-center gap-1">
  <MessageSquare color="#111d22" size={14} />
  Obrolan
</button>
{/* <button className="px-4 py-1 text-xs border border-gray-500 text-gray-500 rounded-full hover:bg-gray-100 transition">Jelajahi Koleksi</button>
<button className="px-4 py-1 text-xs border border-gray-500 text-gray-500 rounded-full hover:bg-gray-100 transition">Cek Plagiat</button> */}
<button className="px-4 py-1 text-xs border border-gray-500 text-gray-500 rounded-full hover:bg-gray-100 transition flex items-center gap-1">
  <BookOpen color="#111d22" size={14} />
  Jelajahi Koleksi
</button>

<button className="px-4 py-1 text-xs border border-gray-500 text-gray-500 rounded-full hover:bg-gray-100 transition flex items-center gap-1">
  <FileCheck color="#111d22" size={14} />
  Cek Plagiat
</button>

      </div>
    </div>
  );
};

export default ChatbotHeaderCard;