import {
  BookOpen,
  FileCheck,
  MessageSquare,
  Search,
  Shield,
  Users,
} from "lucide-react";
import CardOnboardingFeature from "../CardOnboardingFeature";

export default function CardsGroupFeature() {
  const iconSizing = "mb-4 h-24 w-24";
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
      <CardOnboardingFeature
        icon={<MessageSquare className={`${iconSizing} text-blue-600`} />}
        cardTitle="Chat AI Assistant"
        description="Tanya langsung ke asisten AI untuk mencari buku, mendapat rekomendasi, dan bantuan navigasi perpustakaan"
      />
      <CardOnboardingFeature
        icon={<Search className={`${iconSizing} text-green-600`} />}
        cardTitle="Pencarian Cerdas"
        description="Pencarian semantik dengan AI yang memahami konteks dan memberikan hasil yang lebih relevan"
      />
      <CardOnboardingFeature
        icon={<FileCheck className={`${iconSizing} text-purple-600`} />}
        cardTitle="Deteksi Plagiarisme"
        description="Periksa keaslian dokumen dengan teknologi AI untuk mendeteksi plagiarisme dan kemiripan teks"
      />
      <CardOnboardingFeature
        icon={<BookOpen className={`${iconSizing} text-orange-600`} />}
        cardTitle="Manajemen Koleksi"
        description="Kelola koleksi buku dengan sistem CRUD lengkap, filter canggih, dan pagination yang efisien"
      />
      <CardOnboardingFeature
        icon={<Users className={`${iconSizing} text-red-600`} />}
        cardTitle="Multi-Role System"
        description="Sistem peran yang fleksibel untuk admin, pustakawan, dosen dan mahasiswa dengan akses yang sesuai"
      />
      <CardOnboardingFeature
        icon={<Shield className={`${iconSizing} text-indigo-600`} />}
        cardTitle="Keamanan Data"
        description="Perlindungan data dengan enkripsi, kontrol akses, dan kepatuhan terhadap standar privasi"
      />
    </div>
  );
}
