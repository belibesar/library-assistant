import React from 'react';
import { Shield } from 'lucide-react';
const PrivacyNotice: React.FC = () => {
  return (
    <div className="text-sm sm:text-[14px] bg-blue-100 border border-blue-400 text-blue-700 px-3 sm:px-4 py-3 rounded-lg relative mb-4">
      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
        <Shield size={20} className="sm:w-[26px] sm:h-[26px] mt-0.5 sm:mt-0 flex-shrink-0" color="#113FF7" strokeWidth={2.25} />
        <div className="flex-1 min-w-0">
          <p className="leading-relaxed">
            <span className='font-bold'>Perlindungan Data:</span> Kami melindungi privasi Anda. Data percakapan tidak disimpan permanen dan digunakan hanya untuk layanan perpustakaan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;