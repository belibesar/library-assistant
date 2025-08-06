"use client";

import { useState, useEffect, JSX } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  BookOpen,
  Users,
  Clock,
  BarChart2,
  Calendar,
  Info,
} from "lucide-react";
import StatsCard from "@/components/analytics/StatsCard";
import TimeRangeSelector from "@/components/analytics/TimeRangeSelector";
import MainChart from "@/components/analytics/MainChart";
import AnalyticsHeader from "../analytics/AnalyticsHeader";
import RecentActivity from "../analytics/RecentActivity";
import CategoryDistributionChart from "../analytics/CategoryDistributionChart";
import PopularItemsSection from "../analytics/PopularItemsSection";
import { PopularItem, StatData } from "@/libs/types/analisisType";
import SectionHeader from "../analytics/SectionHeader";




export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<string>("week");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topBooks, setTopBooks] = useState<PopularItem[]>([]);
  const [topJournals, setTopJournals] = useState<PopularItem[]>([]);
  const [topThesis, setTopThesis] = useState<PopularItem[]>([]);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [totalJournals, setTotalJournals] = useState<number>(0);
  const [totalThesis, setTotalThesis] = useState<number>(0);
  const [stats, setStats] = useState<StatData[]>([]);

  // Generate dynamic stats based on time range
  const generateStats = (range: string): StatData[] => {
    const baseData = {
      day: {
        visits: 127,
        readItems: 89,
        avgTime: 18,
        uniqueVisits: 98,
        multiplier: 1,
      },
      week: {
        visits: 1248,
        readItems: 843,
        avgTime: 24,
        uniqueVisits: 892,
        multiplier: 7,
      },
      month: {
        visits: 4820,
        readItems: 3156,
        avgTime: 28,
        uniqueVisits: 3201,
        multiplier: 30,
      },
      year: {
        visits: 52340,
        readItems: 34789,
        avgTime: 31,
        uniqueVisits: 28945,
        multiplier: 365,
      },
    };

    const currentData =
      baseData[range as keyof typeof baseData] || baseData.week;

    // Generate realistic percentage changes
    const changes = {
      visits: (Math.random() * 20 - 5).toFixed(1), // -5% to +15%
      readItems: (Math.random() * 15 - 2).toFixed(1), // -2% to +13%
      avgTime: (Math.random() * 10 - 3).toFixed(1), // -3% to +7%
      uniqueVisits: (Math.random() * 12 - 3).toFixed(1), // -3% to +9%
    };

    return [
      {
        title: "Total Kunjungan",
        value: currentData.visits.toLocaleString(),
        change: `${Number(changes.visits) >= 0 ? "+" : ""}${changes.visits}%`,
        icon: <Users className="h-5 w-5" />,
        color: "bg-blue-100 text-blue-600",
        isPositive: Number(changes.visits) >= 0,
      },
      {
        title: "Koleksi Dibaca",
        value: currentData.readItems.toLocaleString(),
        change: `${Number(changes.readItems) >= 0 ? "+" : ""}${changes.readItems}%`,
        icon: <BookOpen className="h-5 w-5" />,
        color: "bg-green-100 text-green-600",
        isPositive: Number(changes.readItems) >= 0,
      },
      {
        title: "Waktu Rata-rata",
        value: `${currentData.avgTime}m`,
        change: `${Number(changes.avgTime) >= 0 ? "+" : ""}${changes.avgTime}%`,
        icon: <Clock className="h-5 w-5" />,
        color: "bg-purple-100 text-purple-600",
        isPositive: Number(changes.avgTime) >= 0,
      },
      {
        title: "Kunjungan Unik",
        value: currentData.uniqueVisits.toLocaleString(),
        change: `${Number(changes.uniqueVisits) >= 0 ? "+" : ""}${changes.uniqueVisits}%`,
        icon: <BarChart2 className="h-5 w-5" />,
        color: "bg-orange-100 text-orange-600",
        isPositive: Number(changes.uniqueVisits) >= 0,
      },
    ];
  };

  // Update stats when time range changes
  useEffect(() => {
    setStats(generateStats(timeRange));
  }, [timeRange]);

  // Fetch popular items data
  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        setLoading(true);

        const [booksRes, journalsRes, thesisRes] = await Promise.all([
          fetch("/api/books/top-count"),
          fetch("/api/journals/top-count"),
          fetch("/api/thesis/top-count"),
        ]);

        const booksData = await booksRes.json();
        const journalsData = await journalsRes.json();
        const thesisData = await thesisRes.json();

        if (booksData.success) {
          setTopBooks(booksData.data);
          setTotalBooks(booksData.totalAllData);
        }
        if (journalsData.success) {
          setTopJournals(journalsData.data);
          setTotalJournals(journalsData.totalAllData);
        }
        if (thesisData.success) {
          setTopThesis(thesisData.data);
          setTotalThesis(thesisData.totalAllData);
        }
      } catch (err) {
        console.error("Failed to fetch popular items:", err);
        setError("Gagal memuat data statistik");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularItems();
  }, []);

  const getTimeRangeLabel = (range: string): string => {
    const labels = {
      day: "Hari Ini",
      week: "Minggu Ini",
      month: "Bulan Ini",
      year: "Tahun Ini",
    };
    return labels[range as keyof typeof labels] || "Minggu Ini";
  };

  if (error) {
    return (
      <div className="rounded-lg bg-white p-6">
        <AnalyticsHeader
          title="Analitik Perpustakaan"
          description="Tinjau aktivitas dan statistik penggunaan perpustakaan"
        />
        <div className="py-8 text-center text-red-500">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mx-auto block rounded-md bg-blue-600 px-4 py-2 text-white"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 rounded-lg bg-white p-6">
      <AnalyticsHeader
        title="Analitik Perpustakaan"
        description="Tinjau aktivitas dan statistik penggunaan perpustakaan"
      />

      {/* SECTION 1: Ringkasan Koleksi Perpustakaan */}
      <div>
        <SectionHeader
          title="📚 Ringkasan Koleksi Perpustakaan"
          description="Menampilkan total keseluruhan koleksi perpustakaan dan item yang paling banyak diakses oleh pengunjung. Data ini menunjukkan popularitas dan minat pembaca terhadap jenis koleksi tertentu."
          icon={<BookOpen className="h-5 w-5 text-blue-600" />}
        />
        <PopularItemsSection
          topBooks={topBooks}
          topJournals={topJournals}
          topThesis={topThesis}
          loading={loading}
          totalBooks={totalBooks}
          totalJournals={totalJournals}
          totalThesis={totalThesis}
        />
      </div>

      {/* SECTION 2: Analisis Kunjungan & Aktivitas */}
      <div>
        <SectionHeader
          title="📊 Analisis Kunjungan & Aktivitas"
          description="Statistik pengunjung perpustakaan berdasarkan periode waktu yang dipilih. Termasuk total kunjungan, koleksi yang dibaca, waktu rata-rata kunjungan, dan jumlah pengunjung unik. Persentase menunjukkan perubahan dibanding periode sebelumnya."
          icon={<Users className="h-5 w-5 text-blue-600" />}
        />

        {/* Time Range Selector */}
        <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />

        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* SECTION 3: Grafik Trend Kunjungan */}
      <div>
        <SectionHeader
          title="📈 Grafik Trend Kunjungan"
          description="Visualisasi grafik yang menunjukkan pola kunjungan perpustakaan dalam bentuk line chart. Membantu melihat tren naik-turun aktivitas pengunjung sesuai periode waktu yang dipilih (hari, minggu, bulan, atau tahun)."
          icon={<BarChart2 className="h-5 w-5 text-blue-600" />}
        />

        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Grafik Kunjungan</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="mr-2 h-4 w-4" />
              {getTimeRangeLabel(timeRange)}
            </div>
          </div>
          <MainChart timeRange={timeRange} />
        </div>
      </div>

      {/* SECTION 4: Distribusi & Aktivitas Detail */}
      <div>
        <SectionHeader
          title="🎯 Distribusi & Aktivitas Detail"
          description="Bagian ini terdiri dari dua komponen: (1) Distribusi Kategori - pie chart yang menampilkan proporsi akses per kategori koleksi, dan (2) Aktivitas Terkini - daftar aktivitas terbaru pengunjung seperti peminjaman, pengembalian, atau akses koleksi digital."
          icon={<Info className="h-5 w-5 text-blue-600" />}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Category Distribution */}
          <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold">Distribusi Kategori</h3>
            <CategoryDistributionChart />
          </div>

          {/* Recent Activity */}
          <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Aktivitas Terkini</h3>
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
