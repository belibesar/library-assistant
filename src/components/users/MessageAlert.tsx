import { AlertCircle, CheckCircle } from "lucide-react";

const MessageAlert = ({
  message,
}: {
  message: { type: "success" | "error"; text: string } | null;
}) =>
  message && (
    <div
      className={`mb-6 flex items-center space-x-3 rounded-lg p-4 ${
        message.type === "success"
          ? "border border-green-200 bg-green-100 text-green-800"
          : "border border-red-200 bg-red-100 text-red-800"
      }`}
    >
      {message.type === "success" ? (
        <CheckCircle className="h-5 w-5" />
      ) : (
        <AlertCircle className="h-5 w-5" />
      )}
      <span>{message.text}</span>
    </div>
  );

export default MessageAlert;
