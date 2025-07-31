"use client";

interface TabSelectorProps {
  activeTab: "file" | "text";
  onTabChange: (tab: "file" | "text") => void;
}

export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <div className="mb-6 flex rounded-lg bg-gray-100 p-1">
      <button
        onClick={() => onTabChange("file")}
        className={`flex-1 rounded-md px-4 py-2 font-medium transition-all duration-200 ${
          activeTab === "file"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        Upload File
      </button>
      <button
        onClick={() => onTabChange("text")}
        className={`flex-1 rounded-md px-4 py-2 font-medium transition-all duration-200 ${
          activeTab === "text"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        Paste Teks
      </button>
    </div>
  );
}
