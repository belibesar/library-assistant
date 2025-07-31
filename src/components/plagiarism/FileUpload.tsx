"use client";

import { useState } from "react";
import { Upload, CheckCircle } from "lucide-react";

interface FileUploadProps {
  uploadedFile: File | null;
  onFileChange: (file: File | null) => void;
}

export function FileUpload({ uploadedFile, onFileChange }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (
        file.type === "application/pdf" ||
        file.type === "text/plain" ||
        file.name.endsWith(".docx")
      ) {
        onFileChange(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (
        file.type === "application/pdf" ||
        file.type === "text/plain" ||
        file.name.endsWith(".docx")
      ) {
        onFileChange(file);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div
      className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
        dragActive
          ? "border-blue-400 bg-blue-50"
          : uploadedFile
            ? "border-green-400 bg-green-50"
            : "border-gray-300 hover:border-gray-400"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".pdf,.txt,.docx"
        onChange={handleFileChange}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />

      {uploadedFile ? (
        <div className="space-y-2">
          <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
          <div>
            <p className="font-medium text-gray-900">{uploadedFile.name}</p>
            <p className="text-sm text-gray-600">
              {formatFileSize(uploadedFile.size)}
            </p>
          </div>
          <button
            onClick={() => onFileChange(null)}
            className="text-sm text-red-600 underline hover:text-red-700"
          >
            Hapus file
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div>
            <p className="font-medium text-gray-700">
              Klik untuk upload file atau drag & drop
            </p>
            <p className="text-sm text-gray-500">
              Format: .txt, .pdf (Max 10MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
