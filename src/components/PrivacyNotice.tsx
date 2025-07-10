import React from 'react';
import { Shield } from 'lucide-react';
const PrivacyNotice: React.FC = () => {
  return (
    <div className="text-[14px] bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg relative mb-4">
  <div className="flex items-center gap-2">
    <Shield size={26} color="#113FF7" strokeWidth={2.25} />
    <div>
      <p><span className='font-bold'>Perlindungan Data:</span> Kami melindungi privasi Anda. Data percakapan tidak disimpan permanen dan digunakan hanya untuk layanan perpustakaan.</p>
    </div>
  </div>
</div>
  );
};

export default PrivacyNotice;