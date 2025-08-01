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
      message: `Selamat datang di Perpustakaan USD! 👋
      Saya siap membantu Anda mencari buku dan koleksi perpustakaan. Berikut beberapa contoh yang bisa Anda tanyakan:
      <ul>
        <li>"Carikan buku tentang filsafat"</li>
        <li>"Rangkum sinopsis buku psikologi"</li>
        <li>"Dimana letak buku teologi?"</li>
        <li>"Rekomendasi buku teknologi terbaru"</li>
      </ul>
      Silakan ketik pertanyaan Anda!`,
      timestamp: "16.00",
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [agreePrivacy, setAgreePrivacy] = useState<boolean>(false);

  const sentRequestToChatBotAI = async (userMessage: string) => {
    try {
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

      return responseJson; // Assuming the API returns a 'reply' field
    } catch (error) {
      console.log(error, "<--- sentRequestToApiChatbot");
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
        books: botReply.response.books || [],
        racks: botReply.response.results || "",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
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
      />
    </div>
  );
};

export default ChatbotSection;
