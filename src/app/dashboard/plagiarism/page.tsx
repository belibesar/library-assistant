'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function PlagiarismPage() {
  const [activeTab, setActiveTab] = useState<'file' | 'text'>('file');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type === 'text/plain' || file.name.endsWith('.docx')) {
        setUploadedFile(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' || file.type === 'text/plain' || file.name.endsWith('.docx')) {
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
        status: 'warning',
        sources: [
          {
            title: 'Pengantar Filsafat Barat',
            author: 'oleh Dr. Ahmad Suryadi',
            percentage: 15.5,
            quote: '"Filsafat adalah ilmu yang mempelajari hakikat keberadaan..."'
          },
          {
            title: 'Psikologi Kognitif Modern',
            author: 'oleh Prof. Maria Sari',
            percentage: 8.2,
            quote: '"Proses kognitif manusia melibatkan berbagai aspek..."'
          }
        ],
        checkedAt: new Date().toLocaleString('id-ID'),
        warning: 'Dokumen menunjukkan beberapa kemiripan yang perlu diperiksa lebih lanjut.'
      });
      setIsChecking(false);
    }, 3000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-7xl mx-auto mt-[-20px]">
      <div className='mt[-20px]'>
        <h1 className="text-3xl font-bold text-gray-900">Cek Plagiat</h1>
        <p className="text-gray-600 mb-6">Periksa keaslian dokumen dan deteksi plagiarisme</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-semibold text-gray-900">Input Dokumen</h2>
            </div>

            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('file')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'file'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Upload File
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'text'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Paste Teks
              </button>
            </div>

            {activeTab === 'file' && (
              <div className="space-y-4">
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                    dragActive
                      ? 'border-blue-400 bg-blue-50'
                      : uploadedFile
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-300 hover:border-gray-400'
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
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {uploadedFile ? (
                    <div className="space-y-2">
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                      <div>
                        <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-600">{formatFileSize(uploadedFile.size)}</p>
                      </div>
                      <button
                        onClick={() => setUploadedFile(null)}
                        className="text-sm text-red-600 hover:text-red-700 underline"
                      >
                        Hapus file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-gray-700 font-medium">Klik untuk upload file atau drag & drop</p>
                        <p className="text-sm text-gray-500">Format: .txt, .pdf (Max 10MB)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'text' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Atau Paste Teks
                  </label>
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Paste teks yang ingin diperiksa di sini..."
                    rows={12}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all duration-200"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500">
                      {textContent.length} karakter
                    </p>
                    {textContent.length > 0 && (
                      <button
                        onClick={() => setTextContent('')}
                        className="text-sm text-red-600 hover:text-red-700 underline"
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
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  isChecking || (!uploadedFile && !textContent.trim())
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isChecking ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Memeriksa Plagiarisme...
                  </div>
                ) : (
                  'Periksa Plagiarisme'
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-semibold text-gray-900">Hasil Pemeriksaan</h2>
            </div>

            {!result && !isChecking ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">Upload dokumen atau masukkan teks untuk memulai pemeriksaan</p>
              </div>
            ) : isChecking ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-700 font-medium mb-2">Sedang memeriksa plagiarisme...</p>
                <p className="text-sm text-gray-500">Mohon tunggu beberapa saat</p>
              </div>
            ) : result ? (
              <div className="space-y-6">
                <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-800 font-medium">Perlu Perhatian</p>
                    <p className="text-yellow-700 text-sm mt-1">{result.warning}</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 text-yellow-700 text-xl font-bold mb-3">
                    {result.similarity}%
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Tingkat Kemiripan</h3>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Sumber yang Terdeteksi:</h4>
                  <div className="space-y-4">
                    {result.sources.map((source: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900 mb-1">{source.title}</h5>
                            <p className="text-sm text-gray-600">{source.author}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-gray-900">{source.percentage}%</span>
                          </div>
                        </div>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                          <p className="text-blue-800 text-sm italic">{source.quote}</p>
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
