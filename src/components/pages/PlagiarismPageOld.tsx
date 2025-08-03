"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";

export default function PlagiarismPage() {
  const [activeTab, setActiveTab] = useState<"file" | "text">("file");
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<any>(null);

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
        setUploadedFile(file);
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
        setUploadedFile(file);
      }
    }
  };

  const handleCheck = async () => {
    setIsChecking(true);
    // Simulate API call
    setTimeout(() => {
      setResult({
        similarity: 16.8,
        status: "warning",
        sources: [
          {
            title: "Pengantar Filsafat Barat",
            author: "oleh Dr. Ahmad Suryadi",
            percentage: 15.5,
            quote:
              '"Filsafat adalah ilmu yang mempelajari hakikat keberadaan..."',
          },
          {
            title: "Psikologi Kognitif Modern",
            author: "oleh Prof. Maria Sari",
            percentage: 8.2,
            quote: '"Proses kognitif manusia melibatkan berbagai aspek..."',
          },
        ],
        checkedAt: new Date().toLocaleString("id-ID"),
        warning:
          "Dokumen menunjukkan beberapa kemiripan yang perlu diperiksa lebih lanjut.",
      });
      setIsChecking(false);
    }, 3000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="mx-auto mt-[-20px] max-w-7xl">
      <div className="mt[-20px]">
        <h1 className="text-3xl font-bold text-gray-900">Cek Plagiat</h1>
        <p className="mb-6 text-gray-600">
          Periksa keaslian dokumen dan deteksi plagiarisme
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-700" />
              <h2 className="text-xl font-semibold text-gray-900">
                Input Dokumen
              </h2>
            </div>

            <div className="mb-6 flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab("file")}
                className={`flex-1 rounded-md px-4 py-2 font-medium transition-all duration-200 ${
                  activeTab === "file"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Upload File
              </button>
              <button
                onClick={() => setActiveTab("text")}
                className={`flex-1 rounded-md px-4 py-2 font-medium transition-all duration-200 ${
                  activeTab === "text"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Paste Teks
              </button>
            </div>

            {activeTab === "file" && (
              <div className="space-y-4">
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
                        <p className="font-medium text-gray-900">
                          {uploadedFile.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatFileSize(uploadedFile.size)}
                        </p>
                      </div>
                      <button
                        onClick={() => setUploadedFile(null)}
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
              </div>
            )}

            {activeTab === "text" && (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Atau Paste Teks
                  </label>
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Paste teks yang ingin diperiksa di sini..."
                    rows={12}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {textContent.length} karakter
                    </p>
                    {textContent.length > 0 && (
                      <button
                        onClick={() => setTextContent("")}
                        className="text-sm text-red-600 underline hover:text-red-700"
                      >
                        Hapus teks
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={handleCheck}
                disabled={isChecking || (!uploadedFile && !textContent.trim())}
                className={`w-full rounded-lg px-6 py-3 font-medium transition-all duration-200 ${
                  isChecking || (!uploadedFile && !textContent.trim())
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
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-gray-700" />
              <h2 className="text-xl font-semibold text-gray-900">
                Hasil Pemeriksaan
              </h2>
            </div>

            {!result && !isChecking ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500">
                  Upload dokumen atau masukkan teks untuk memulai pemeriksaan
                </p>
              </div>
            ) : isChecking ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                </div>
                <p className="mb-2 font-medium text-gray-700">
                  Sedang memeriksa plagiarisme...
                </p>
                <p className="text-sm text-gray-500">
                  Mohon tunggu beberapa saat
                </p>
              </div>
            ) : result ? (
              <div className="space-y-6">
                <div className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800">
                      Perlu Perhatian
                    </p>
                    <p className="mt-1 text-sm text-yellow-700">
                      {result.warning}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="mb-3 inline-flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 text-xl font-bold text-yellow-700">
                    {result.similarity}%
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">
                    Tingkat Kemiripan
                  </h3>
                </div>

                <div>
                  <h4 className="mb-4 text-lg font-semibold text-gray-900">
                    Sumber yang Terdeteksi:
                  </h4>
                  <div className="space-y-4">
                    {result.sources.map((source: any, index: number) => (
                      <div
                        key={index}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                      >
                        <div className="mb-3 flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="mb-1 font-semibold text-gray-900">
                              {source.title}
                            </h5>
                            <p className="text-sm text-gray-600">
                              {source.author}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-gray-900">
                              {source.percentage}%
                            </span>
                          </div>
                        </div>
                        <div className="rounded border-l-4 border-blue-400 bg-blue-50 p-3">
                          <p className="text-sm text-blue-800 italic">
                            {source.quote}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
