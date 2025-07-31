"use client";

import { FileText } from "lucide-react";
import { TabSelector } from "./TabSelector";
import { FileUpload } from "./FileUpload";
import { TextInput } from "./TextInput";
import { CheckButton } from "./CheckButton";

interface DocumentInputProps {
  activeTab: "file" | "text";
  onTabChange: (tab: "file" | "text") => void;
  uploadedFile: File | null;
  onFileChange: (file: File | null) => void;
  textContent: string;
  onTextChange: (text: string) => void;
  isChecking: boolean;
  onCheck: () => void;
}

export function DocumentInput({
  activeTab,
  onTabChange,
  uploadedFile,
  onFileChange,
  textContent,
  onTextChange,
  isChecking,
  onCheck,
}: DocumentInputProps) {
  const isDisabled = !uploadedFile && !textContent.trim();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-gray-700" />
        <h2 className="text-xl font-semibold text-gray-900">Input Dokumen</h2>
      </div>

      <TabSelector activeTab={activeTab} onTabChange={onTabChange} />

      {activeTab === "file" && (
        <div className="space-y-4">
          <FileUpload
            onExtractedText={onTextChange}
            uploadedFile={uploadedFile}
            onFileChange={onFileChange}
          />
        </div>
      )}

      {activeTab === "text" && (
        <TextInput textContent={textContent} onTextChange={onTextChange} />
      )}

      <div className="mt-6">
        <CheckButton
          isChecking={isChecking}
          isDisabled={isDisabled}
          onCheck={onCheck}
        />
      </div>
    </div>
  );
}
