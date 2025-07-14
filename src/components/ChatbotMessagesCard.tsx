'use client';

import React, { useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { ChatMessage, ChatbotMessagesCardProps } from '@/libs/types';

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
    <div className="bg-white text-sm p-6 rounded-lg border border-gray-200 flex flex-col flex-grow">
      <div ref={chatAreaRef} className="p-4 rounded-lg mb-4 space-y-4">
        {messages.map((msg) => (
<div
  key={msg.id}
  className={`flex mb-4 items-start w-full ${
    msg.sender === 'user' ? 'justify-end' : 'justify-start'
  } flex-row`}
>
            <div className={`relative w-10 h-10 flex-shrink-0 ${msg.sender === 'user' ? 'order-2 ml-2' : 'order-1 mr-2'}`}>
  <div className={`w-10 h-10 rounded-full flex items-center justify-center 
    ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                {msg.sender === 'bot' ? (
                  <Bot size={20} color="#1d1b27" strokeWidth={2.25} />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
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
            <div className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'order-1 items-end' : 'order-2 items-start'}`}>
  <div
    className={`p-3 rounded-lg ${
      msg.sender === 'user'
        ? 'bg-blue-500 text-white rounded-br-none'
        : 'bg-gray-200 text-black rounded-bl-none'
    }`}
    dangerouslySetInnerHTML={{ __html: msg.message }}
  />
  <div className="text-gray-500 text-sm mt-1">{msg.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
      {/* hr nya di jadikan full */}
<hr className="my-4 -mx-6 border-t border-gray-300" />
{/* hr atas dijadikan full */}
      <div className="form-control mb-4">
  <label className="label cursor-pointer justify-start items-start flex-wrap">
    <input
      type="checkbox"
      checked={agreePrivacy}
      onChange={(e) => setAgreePrivacy(e.target.checked)}
      className="checkbox checkbox-sm sm:checkbox-md text-white mr-2 mt-1 border-gray-300 checked:bg-blue-500 checked:border-blue-500 flex-shrink-0"
    />
    <span className="label-text text-xs sm:text-sm leading-tight break-words flex-1">
      💡Setuju kebijakan privasi untuk menggunakan fitur chat
    </span>
  </label>
</div>

      <div className="flex gap-2 flex-col sm:flex-row">
        <input
        type="text"
        placeholder="Tanya tentang buku, cari di rak, atau minta saran..."
        className="input input-bordered flex-grow rounded-sm text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
       onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        disabled={!agreePrivacy}
        />

        <button
          className="btn btn-sm sm:btn-md bg-blue-500 text-white rounded-[10%] px-3 sm:px-4"
          onClick={sendMessage}
          disabled={!agreePrivacy || inputMessage.trim() === ''}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 sm:w-6 sm:h-6"
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

export default ChatbotMessagesCard;