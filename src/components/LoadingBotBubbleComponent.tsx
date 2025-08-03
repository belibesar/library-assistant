import { Bot } from "lucide-react";

export default function LoadingBotBubbleComponent() {
  return (
    <div className="flex justify-start gap-3">
      <div className="flex max-w-[80%] gap-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
          <Bot size={20} color="#1d1b27" strokeWidth={2.25} />
        </div>
        <div className="rounded-lg bg-gray-100 px-6 py-3">
          <div className="flex space-x-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
