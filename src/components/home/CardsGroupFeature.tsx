import {
  BookOpen,
  FileCheck,
  MessageSquare,
  Search,
  Shield,
  Users,
} from "lucide-react";
import CardOnboardingFeature from "./CardOnboardingFeature";

export default function CardsGroupFeature() {
  const iconSizing = "w-12 h-12";

  const features = [
    {
      icon: <MessageSquare className={`${iconSizing} text-blue-500`} />,
      title: "Chat AI Assistant",
      description:
        "Tanya langsung ke asisten AI untuk mencari buku, mendapat rekomendasi, dan bantuan navigasi perpustakaan",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: <Search className={`${iconSizing} text-emerald-500`} />,
      title: "Pencarian Cerdas",
      description:
        "Pencarian semantik dengan AI yang memahami konteks dan memberikan hasil yang lebih relevan",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      icon: <FileCheck className={`${iconSizing} text-purple-500`} />,
      title: "Deteksi Plagiarisme",
      description:
        "Periksa keaslian dokumen dengan teknologi AI untuk mendeteksi plagiarisme dan kemiripan teks",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: <BookOpen className={`${iconSizing} text-orange-500`} />,
      title: "Manajemen Koleksi",
      description:
        "Kelola koleksi buku dengan sistem CRUD lengkap, filter canggih, dan pagination yang efisien",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      icon: <Users className={`${iconSizing} text-rose-500`} />,
      title: "Multi-Role System",
      description:
        "Sistem peran yang fleksibel untuk admin, pustakawan, dan mahasiswa dengan akses yang sesuai",
      gradient: "from-rose-500 to-rose-600",
    },
    {
      icon: <Shield className={`${iconSizing} text-indigo-500`} />,
      title: "Keamanan Data",
      description:
        "Perlindungan data dengan enkripsi, kontrol akses, dan kepatuhan terhadap standar privasi",
      gradient: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-20">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-blue-100 opacity-30 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-indigo-100 opacity-20 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Grid with staggered animation delays */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardOnboardingFeature
                icon={feature.icon}
                cardTitle={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
