"use client";

import { useState } from "react";
import { DocumentInput } from "../plagiarism/DocumentInput";
import { ResultsPanel } from "../plagiarism/ResultPanel";
import { PlagiarismResult } from "@/libs/types/plagiarismType";

export default function PlagiarismPage() {
  const [activeTab, setActiveTab] = useState<"file" | "text">("file");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<PlagiarismResult | null>(null);

  const handleCheck = async () => {
    setIsChecking(true);
    setResult(null);

    try {
      const content =
        activeTab === "text" ? textContent : await uploadedFile?.text();

      if (!content || content.trim() === "") {
        alert("Konten tidak boleh kosong");
        setIsChecking(false);
        return;
      }

      const checkTextPlagiarism = async (text: string) => {
        const res = await fetch("/api/plagiarism", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        if (!res.ok) {
          throw new Error("Gagal memeriksa plagiarisme");
        }

        const data = await res.json();
        return data as PlagiarismResult;
      };

      const resultFromServer = await checkTextPlagiarism(content);
      setResult(resultFromServer);
    } catch (err) {
      console.error("Error checking plagiarism:", err);
      alert("Terjadi kesalahan saat memeriksa plagiarisme");
    } finally {
      setIsChecking(false);
    }
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
          <DocumentInput
            activeTab={activeTab}
            onTabChange={setActiveTab}
            uploadedFile={uploadedFile}
            onFileChange={setUploadedFile}
            textContent={textContent}
            onTextChange={setTextContent}
            isChecking={isChecking}
            onCheck={handleCheck}
          />
        </div>

        <div className="space-y-6">
          <ResultsPanel result={result} isChecking={isChecking} />
        </div>
      </div>
    </div>
  );
}
