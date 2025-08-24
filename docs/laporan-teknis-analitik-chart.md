# Laporan Teknis: Penggunaan Chart dan Analitik pada Project Library Assistant

## Pendahuluan

Pada project Library Assistant, fitur chart dan analitik digunakan untuk memberikan visualisasi data yang membantu pengguna dan admin dalam memahami statistik koleksi, aktivitas pengguna, serta tren penggunaan perpustakaan digital. Fitur ini diimplementasikan pada dashboard dan beberapa bagian lain yang relevan.

## Struktur dan Komponen

Fitur chart dan analitik diimplementasikan melalui beberapa komponen React yang berada di dalam folder `src/components/analytics/` dan `src/components/collections/`. Komponen-komponen utama antara lain:

- **AnalyticsHeader.tsx**: Menyediakan header dan filter untuk tampilan analitik.
- **CategoryDistributionChart.tsx**: Menampilkan distribusi kategori koleksi dalam bentuk chart.
- **MainChart.tsx**: Visualisasi utama statistik koleksi atau aktivitas.
- **PopularItemsSection.tsx**: Menampilkan item paling populer berdasarkan statistik.
- **RecentActivity.tsx**: Menampilkan aktivitas terbaru pengguna.
- **StatsCard.tsx**: Menampilkan ringkasan statistik dalam bentuk kartu.
- **TimeRangeSelector.tsx**: Memungkinkan pengguna memilih rentang waktu analisis.
- **VerticalBarChart.tsx**: Menampilkan data dalam bentuk bar chart vertikal.

Komponen-komponen ini memanfaatkan data yang diambil dari API backend melalui hooks seperti `useGetStatsCount.ts`, `useGetViewCounts.ts`, dan `useAllLibraryItems.ts`.

## Detail Teknis Chart dan Analitik

### 1. Sumber Data Chart

- **Statistik Koleksi** (jumlah buku, jurnal, skripsi):
  Diambil dari endpoint `/api/stats` yang mengakses fungsi `getCountBooks`, `getCountJournals`, dan `getCountThesis` pada masing-masing model database.
- **Akses/Views Koleksi**:
  Diambil dari endpoint `/api/stats/count-view` yang menjumlahkan field `count` pada setiap koleksi (buku, jurnal, skripsi) menggunakan agregasi MongoDB.
- **Distribusi Kategori**:
  Komponen `CategoryDistributionChart` menerima data jumlah koleksi per kategori (buku, jurnal, skripsi) dan divisualisasikan dalam bentuk doughnut chart.
- **Item Terpopuler**:
  Diambil dari endpoint seperti `/api/books/top-count`, `/api/journals/top-count`, `/api/thesis/top-count` yang mengambil 5 koleksi teratas berdasarkan field `count` (jumlah akses/peminjaman).
- **Statistik Aktivitas**:
  Komponen seperti `MainChart` menggunakan data dummy atau hasil agregasi waktu (harian, mingguan, bulanan) untuk menampilkan tren aktivitas.

### 2. Cara Penghitungan

- **Total Koleksi**:
  Menggunakan `countDocuments()` pada koleksi MongoDB.
- **Total Akses**:
  Menggunakan agregasi `{$group: {_id: null, totalCount: {$sum: "$count"}}}` pada field `count` di setiap dokumen koleksi.
- **Top 5 Terpopuler**:
  Menggunakan agregasi `{$sort: {count: -1}}, {$limit: 5}` untuk mengambil 5 koleksi dengan akses terbanyak.
- **Distribusi Kategori**:
  Data jumlah koleksi per kategori diolah menjadi array dan dipetakan ke chart.
- **Perbandingan Periode**:
  Komponen seperti `StatsCard` menampilkan perubahan (delta) dibanding periode sebelumnya, biasanya dihitung dari data historis atau dummy.

### 3. Alur Data ke Chart

1. **Frontend** memanggil custom hooks (`useGetStatsCount`, `useGetViewCounts`, `useAllLibraryItems`) untuk fetch data dari API.
2. **API** mengakses model database dan melakukan agregasi/perhitungan sesuai kebutuhan.
3. **Data** yang sudah diolah dikirim ke frontend, lalu dipetakan ke props komponen chart (`MainChart`, `VerticalBarChart`, `CategoryDistributionChart`, dll).
4. **Chart.js** digunakan untuk render visualisasi (bar, doughnut, dsb) berdasarkan data yang diterima.

### 4. Detail Lain

- **Field `count`** pada setiap koleksi di database digunakan sebagai dasar perhitungan popularitas/akses.
- **Pengambilan data** untuk chart terpopuler dan distribusi selalu membatasi hasil (misal top 5) agar visualisasi tetap informatif dan tidak overload.
- **Interaksi**: Pengguna dapat memilih kategori, rentang waktu, atau melakukan pencarian yang akan memicu fetch data baru dan update chart secara dinamis.

## Alur Data

1. **Pengambilan Data**: Data statistik diambil dari endpoint API yang berada di `src/app/api/stats/` dan endpoint terkait koleksi.
2. **Pengolahan Data**: Data yang diterima diolah pada hooks custom untuk disesuaikan dengan kebutuhan visualisasi.
3. **Visualisasi**: Data yang sudah diolah kemudian diberikan ke komponen chart untuk divisualisasikan menggunakan library chart (misal: Chart.js, Recharts, atau library lain sesuai implementasi).
4. **Interaksi**: Pengguna dapat melakukan filter, memilih rentang waktu, atau melihat detail statistik melalui komponen interaktif.

## Contoh Penggunaan

- **Dashboard Admin**: Menampilkan statistik jumlah koleksi, distribusi kategori, aktivitas pengguna, dan item populer.
- **Halaman Koleksi**: Menampilkan statistik dan distribusi koleksi berdasarkan kategori.

## Manfaat

- Membantu admin dalam mengambil keputusan berbasis data.
- Memberikan insight kepada pengguna tentang tren dan aktivitas perpustakaan.
- Memudahkan monitoring performa koleksi dan penggunaan aplikasi.

## Penutup

Fitur chart dan analitik pada Library Assistant dirancang modular dan mudah dikembangkan, sehingga dapat disesuaikan dengan kebutuhan analisis data di masa mendatang.

## Contoh Kode dan Logika Chart

### Contoh 1: Chart Distribusi Kategori Koleksi (Frontend)

```tsx
// src/components/analytics/CategoryDistributionChart.tsx
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function CategoryDistributionChart({ data }) {
  const chartRef = useRef(null);
  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Buku", "Jurnal", "Skripsi"],
        datasets: [
          {
            data: [data.books, data.journals, data.thesis],
            backgroundColor: ["#3b82f6", "#8b5cf6", "#f97316"],
          },
        ],
      },
      options: { responsive: true, cutout: "70%" },
    });
    return () => chart.destroy();
  }, [data]);
  return <canvas ref={chartRef} />;
}
```

**Logika:**

- Data jumlah koleksi per kategori diterima sebagai props.
- Chart.js digunakan untuk membuat doughnut chart.
- Destroy chart instance setiap update untuk mencegah duplikasi.

### Contoh 2: Bar Chart Item Terpopuler (Frontend)

```tsx
// src/components/analytics/VerticalBarChart.tsx
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function VerticalBarChart({ data, color }) {
  const chartRef = useRef(null);
  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((item) => item.judul),
        datasets: [
          {
            data: data.map((item) => item.count),
            backgroundColor: color,
          },
        ],
      },
      options: { responsive: true, plugins: { legend: { display: false } } },
    });
    return () => chart.destroy();
  }, [data, color]);
  return <canvas ref={chartRef} />;
}
```

**Logika:**

- Data item terpopuler (judul dan count) diterima sebagai props.
- Chart.js digunakan untuk membuat bar chart vertikal.
- Data diambil dari hasil query top 5 koleksi terpopuler.

### Contoh 3: Algoritma Pengambilan Top 5 Buku Terpopuler (Backend)

```typescript
// src/db/models/BookModel.ts
static async getTop5MostBorrowedBooks() {
  const collection = await this.collection();
  const books = await collection
    .aggregate([
      { $sort: { count: -1 } },
      { $limit: 5 },
    ])
    .toArray();
  return books;
}
```

**Logika:**

- Menggunakan agregasi MongoDB untuk mengurutkan koleksi berdasarkan field `count` (jumlah akses/peminjaman).
- Mengambil 5 teratas untuk ditampilkan pada chart terpopuler.

### Contoh 4: Penghitungan Total Koleksi (Backend)

```typescript
// src/db/models/BookModel.ts
static async getCountBooks() {
  const collection = await this.collection();
  const count = await collection.countDocuments();
  return count;
}
```

**Logika:**

- Menghitung total dokumen pada koleksi buku di database.

### Contoh 5: Penghitungan Total Akses (Backend)

```typescript
// src/db/models/BookModel.ts
static async getTotalAccessCount() {
  const collection = await this.collection();
  const result = await collection.aggregate([
    { $group: { _id: null, totalCount: { $sum: "$count" } } }
  ]).toArray();
  return result[0]?.totalCount ?? 0;
}
```

**Logika:**

- Menjumlahkan seluruh field `count` pada koleksi buku untuk mendapatkan total akses.
