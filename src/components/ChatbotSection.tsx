"use client";

import React, { useState } from "react";
import ChatbotHeaderCard from "./ChatbotHeaderCard";
import ChatbotMessagesCard from "./ChatbotMessagesCard";
import { ChatMessage } from "@/libs/types";

const ChatbotSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "bot",
      message: `
      Selamat datang di Perpustakaan USD! 👋
      <ul>
        <li>Saya siap membantu Anda mencari buku dan koleksi perpustakaan. Berikut beberapa contoh yang bisa Anda tanyakan:</li>
        <li>"Rekomendasikan skripsi tentang pendidikan, dong!"</li>
        <li>"Rekomendasikan saya buku tentang habits"</li>
        <li>"Apakah buku "Sapiens: A Brief History of Humankind" masih tersedia untuk dipinjam?"</li>
        <li>"Rekomendasikan saya jurnal terkait teknik"</li>
        <li>"Dimana letak buku Bumi Manusia?"</li>
      </ul>
      Silakan ketik pertanyaan Anda!`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [agreePrivacy, setAgreePrivacy] = useState<boolean>(false);

  const sentRequestToChatBotAI = async (userMessage: string) => {
    try {
      setLoading(true);
      const lowerCaseMessage = userMessage.toLowerCase();
      console.log(lowerCaseMessage, "<----sentRequestToChatBotAI");
      const response = await fetch("/api/chatbot", {
        method: "POST",
        body: JSON.stringify({ messageRequestFromClient: lowerCaseMessage }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseJson = await response.json();
      console.log(responseJson);

      if (!response.ok) {
        throw new Error(responseJson.message || "Error occurred");
      }

      console.log(response, "response from api/chatbot");

      setLoading(false);
      return responseJson; // Assuming the API returns a 'reply' field
    } catch (error) {
      console.log(error, "<--- sentRequestToApiChatbot");
      setLoading(false);
      return "An error occurred"; // Return a fallback message
    }
  };

  const handleTagClick = (tagText: string) => {
    setInputMessage(tagText);
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;
    if (!agreePrivacy) {
      alert(
        "Anda harus menyetujui kebijakan privasi untuk menggunakan fitur chat.",
      );
      return;
    }

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      sender: "user",
      message: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    console.log(newMessage, "<-----sendMessage");

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");

    // setTimeout(async () => {
    const botReply = await sentRequestToChatBotAI(newMessage.message);
    console.log(botReply, "botReply");

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        sender: "bot",
        message: botReply.response.message || botReply.response,
        results: botReply.response.result || [],
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: botReply.response.type || "unidentified",
      },
    ]);

    // }, 1000);
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
        loading={loading}
      />
    </div>
  );
};

export default ChatbotSection;
