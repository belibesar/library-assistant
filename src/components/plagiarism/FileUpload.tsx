"use client";

import { useState } from "react";
import { Upload, CheckCircle, Loader2, AlertTriangle } from "lucide-react";

interface FileUploadProps {
  uploadedFile: File | null;
  onFileChange: (file: File | null) => void;
  onExtractedText?: (text: string) => void;
}

export function FileUpload({
  uploadedFile,
  onFileChange,
  onExtractedText,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleProcessFile = async (file: File) => {
    try {
      setError(null);
      setIsLoading(true);

      const isPDF =
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf");
      const isTXT =
        file.type === "text/plain" || file.name.toLowerCase().endsWith(".txt");
      const isDOCX = file.name.toLowerCase().endsWith(".docx");

      if (!isPDF && !isTXT && !isDOCX) {
        throw new Error("Tipe file tidak didukung");
      }

      if (file.size > MAX_FILE_SIZE) {
        throw new Error("Ukuran file melebihi 10MB");
      }

      onFileChange(file);

      if (onExtractedText) {
        let text = "";

        if (isPDF) {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/pdf-parse", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) throw new Error("Gagal memproses file PDF");

          const result = await response.json();
          text = result.text;
        } else if (isTXT) {
          text = await file.text();
        } else if (isDOCX) {
          throw new Error("Parsing .docx belum didukung");
        }

        onExtractedText(text);
      }
    } catch (err: any) {
      console.error("Error processing file:", err);
      setError(err.message || "Terjadi kesalahan saat memproses file");
      onFileChange(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null); 
    if (e.target.files && e.target.files[0]) {
      handleProcessFile(e.target.files[0]);
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
            : error
              ? "border-red-400 bg-red-50"
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

      {isLoading ? (
        <div className="flex animate-pulse flex-col items-center space-y-2">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          <p className="text-sm text-gray-600">Memproses file...</p>
        </div>
      ) : error ? (
        <div className="space-y-2">
          <AlertTriangle className="mx-auto h-10 w-10 text-red-600" />
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      ) : uploadedFile ? (
        <div className="space-y-2">
          <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
          <div>
            <p className="font-medium text-gray-900">{uploadedFile.name}</p>
            <p className="text-sm text-gray-600">
              {formatFileSize(uploadedFile.size)}
            </p>
          </div>
          <button
            onClick={() => {
              onFileChange(null);
              setError(null);
            }}
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
              Format: .txt, .pdf, .docx (Max 10MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
