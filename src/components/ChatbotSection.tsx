'use client';

import React, { useState } from 'react';
import ChatbotHeaderCard from './ChatbotHeaderCard';
import ChatbotMessagesCard from './ChatbotMessagesCard';
import { ChatMessage } from '@/libs/types';

const ChatbotSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'bot',
      message: `Selamat datang di Perpustakaan USD! 👋
      Saya siap membantu Anda mencari buku dan koleksi perpustakaan. Berikut beberapa contoh yang bisa Anda tanyakan:
      <ul>
        <li>"Carikan buku tentang filsafat"</li>
        <li>"Rangkum sinopsis buku psikologi"</li>
        <li>"Dimana letak buku teologi?"</li>
        <li>"Rekomendasi buku teknologi terbaru"</li>
      </ul>
      Silakan ketik pertanyaan Anda!`,
      timestamp: '16.00',
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [agreePrivacy, setAgreePrivacy] = useState<boolean>(false);

  const getBotResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes('filsafat')) {
      return 'Tentu, Anda mencari buku tentang filsafat. Bisakah Anda sebutkan penulis atau judul spesifiknya?';
    } else if (lowerCaseMessage.includes('psikologi')) {
      return 'Untuk sinopsis buku psikologi, mohon berikan judul bukunya. Kami akan coba carikan.';
    } else if (lowerCaseMessage.includes('teologi')) {
      return 'Buku teologi umumnya terletak di rak F (Filsafat dan Teologi) di lantai 2. Ada buku spesifik yang Anda cari?';
    } else if (lowerCaseMessage.includes('teknologi terbaru')) {
      return 'Kami memiliki koleksi buku teknologi terbaru di bagian referensi. Apa topik teknologi yang Anda minati (misalnya AI, blockchain, cybersecurity)?';
    } else if (lowerCaseMessage.includes('halo') || lowerCaseMessage.includes('hai')) {
      return 'Halo! Ada yang bisa saya bantu hari ini?';
    } else {
      return 'Maaf, saya belum mengerti pertanyaan Anda. Bisakah Anda merumuskan ulang atau bertanya dengan contoh yang diberikan?';
    }
  };

  const handleTagClick = (tagText: string) => {
    setInputMessage(tagText);
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;
    if (!agreePrivacy) {
      alert('Anda harus menyetujui kebijakan privasi untuk menggunakan fitur chat.');
      return;
    }

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      sender: 'user',
      message: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');

    setTimeout(() => {
      const botReply = getBotResponse(newMessage.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: 'bot',
          message: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="w-full">
      <ChatbotHeaderCard onTagClick={handleTagClick} />

      <ChatbotMessagesCard
        messages={messages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        agreePrivacy={agreePrivacy}
        setAgreePrivacy={setAgreePrivacy}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default ChatbotSection;