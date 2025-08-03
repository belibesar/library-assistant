"use client";

interface CheckButtonProps {
  isChecking: boolean;
  isDisabled: boolean;
  onCheck: () => void;
}

export function CheckButton({
  isChecking,
  isDisabled,
  onCheck,
}: CheckButtonProps) {
  return (
    <button
      onClick={onCheck}
      disabled={isChecking || isDisabled}
      className={`w-full rounded-lg px-6 py-3 font-medium transition-all duration-200 ${
        isChecking || isDisabled
          ? "cursor-not-allowed bg-gray-300 text-gray-500"
          : "bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl"
      }`}
    >
      {isChecking ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          Memeriksa Plagiarisme...
        </div>
      ) : (
        "Periksa Plagiarisme"
      )}
    </button>
  );
}
