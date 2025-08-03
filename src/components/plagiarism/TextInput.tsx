"use client";

interface TextInputProps {
  textContent: string;
  onTextChange: (text: string) => void;
}

export function TextInput({ textContent, onTextChange }: TextInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Atau Paste Teks
        </label>
        <textarea
          value={textContent}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Paste teks yang ingin diperiksa di sini..."
          rows={12}
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-gray-500">{textContent.length} karakter</p>
          {textContent.length > 0 && (
            <button
              onClick={() => onTextChange("")}
              className="text-sm text-red-600 underline hover:text-red-700"
            >
              Hapus teks
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
