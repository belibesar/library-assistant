import { AlertCircle, CheckCircle, X } from "lucide-react";

const ModalAlert = ({
  message,
  onClose,
}: {
  message: { type: "success" | "error"; text: string } | null;
  onClose: () => void;
}) => {
  if (!message) return null;

  const isSuccess = message.type === "success";

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/30">
      <div
        className={`relative max-w-sm rounded-lg border px-6 py-4 shadow-lg ${
          isSuccess
            ? "border-green-200 bg-green-100 text-green-800"
            : "border-red-200 bg-red-100 text-red-800"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-inherit transition hover:opacity-70"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex items-center space-x-3">
          {isSuccess ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span>{message.text}</span>
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
