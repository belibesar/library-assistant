"use client";

import React from "react";
import { BookOpen, MessageSquare, FileCheck } from "lucide-react";
import { ChatbotHeaderCardProps } from "@/libs/types";

const ChatbotHeaderCard: React.FC<ChatbotHeaderCardProps> = ({
  onTagClick,
}) => {
  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
      {" "}
      {/* Card styling */}
      <div className="flex items-center gap-2">
        <BookOpen size={25} color="#113FF7" />
        <h2 className="mb-2 text-xl font-bold">Asisten Perpustakaan USD</h2>
      </div>
      <p className="mb-2 text-sm text-gray-500">
        Universitas Sanata Dharma - Jelajahi koleksi perpustakaan dan temukan
        buku yang Anda cari
      </p>
      <div className="flex flex-wrap gap-2"></div>
    </div>
  );
};

export default ChatbotHeaderCard;
