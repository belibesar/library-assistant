"use client";

import React, { useRef, useEffect } from "react";
import { Bot } from "lucide-react";
import { ChatbotMessagesCardProps, ResultChatbotCard } from "@/libs/types";

const ChatbotMessagesCard: React.FC<ChatbotMessagesCardProps> = ({
  messages,
  inputMessage,
  setInputMessage,
  agreePrivacy,
  setAgreePrivacy,
  sendMessage,
}) => {
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-grow flex-col rounded-lg border border-gray-200 bg-white p-6 text-sm">
      <div ref={chatAreaRef} className="mb-4 space-y-4 rounded-lg p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 flex w-full items-start ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } flex-row`}
          >
            <div
              className={`relative h-10 w-10 flex-shrink-0 ${msg.sender === "user" ? "order-2 ml-2" : "order-1 mr-2"}`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
              >
                {msg.sender === "bot" ? (
                  <Bot size={20} color="#1d1b27" strokeWidth={2.25} />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Kontainer untuk pesan dan timestamp */}
            <div
              className={`flex max-w-[80%] flex-col ${msg.sender === "user" ? "order-1 items-end" : "order-2 items-start"}`}
            >
              <div
                className={`rounded-lg p-3 ${
                  msg.sender === "user"
                    ? "rounded-br-none bg-blue-500 text-white"
                    : "rounded-bl-none bg-gray-200 text-black"
                }`}
                dangerouslySetInnerHTML={{ __html: msg.message }}
              />
              <div>
                {/* // Usage of BookDisplay component within the messages mapping */}
                {/* kalo ada buku */}
                {msg?.results &&
                  msg?.type === "buku" &&
                  msg?.results?.map((book, index) => (
                    <BookDisplay key={index} book={book} />
                  ))}
                {msg.racks &&
                  msg.racks.map((rack, index) => (
                    <RackDisplay key={index} rack={rack} />
                  ))}
              </div>
              <div className="mt-1 text-sm text-gray-500">{msg.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
      {/* hr nya di jadikan full */}
      <hr className="-mx-6 my-4 border-t border-gray-300" />
      {/* hr atas dijadikan full */}
      <div className="form-control mb-4">
        <label className="label cursor-pointer flex-wrap items-start justify-start">
          <input
            type="checkbox"
            checked={agreePrivacy}
            onChange={(e) => setAgreePrivacy(e.target.checked)}
            className="checkbox checkbox-sm sm:checkbox-md mt-1 mr-2 flex-shrink-0 border-gray-300 text-white checked:border-blue-500 checked:bg-blue-500"
          />
          <span className="label-text flex-1 text-xs leading-tight break-words sm:text-sm">
            💡Setuju kebijakan privasi untuk menggunakan fitur chat
          </span>
        </label>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          placeholder="Tanya tentang buku, cari di rak, atau minta saran..."
          className="input input-bordered flex-grow rounded-sm text-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          disabled={!agreePrivacy}
        />

        <button
          className="btn btn-sm sm:btn-md rounded-[10%] bg-blue-500 px-3 text-white sm:px-4"
          onClick={sendMessage}
          disabled={!agreePrivacy || inputMessage.trim() === ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4 sm:h-6 sm:w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const BookDisplay: React.FC<{
  book: ResultChatbotCard;
}> = ({ book }) => {
  return (
    <div className="mt-5 rounded-bl-none bg-blue-200 p-5 text-black">
      <h3>
        Judul: <span className="font-bold">{book?.judul || ""}</span>{" "}
      </h3>
      <p>Sinopsis: {book?.abstrak || ""}</p>
      <p>Jumlah: {book?.jumlah || ""}</p>
      <p>Buku tersedia: {book?.tersedia || ""}</p>
      <p>Buku sedang dipinjam: {book?.dipinjam || ""}</p>
    </div>
  );
};
const RackDisplay: React.FC<{
  rack: string;
}> = ({ rack }) => {
  return (
    <div className="mt-5 rounded-bl-none bg-blue-200 p-5 text-black">
      <h3>
        <span className="font-bold">{rack}</span>{" "}
      </h3>
    </div>
  );
};

export default ChatbotMessagesCard;
