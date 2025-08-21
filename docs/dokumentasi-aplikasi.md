# Dokumentasi Aplikasi Library Assistant (SADHARLib)

## Daftar Isi
1. [Pendahuluan](#pendahuluan)
2. [Fitur Aplikasi](#fitur-aplikasi)
3. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
4. [Alur Aplikasi](#alur-aplikasi)
5. [Alur Data](#alur-data)
6. [Logika Aplikasi](#logika-aplikasi)
7. [Diagram](#diagram)

## Pendahuluan

SADHARLib (Sanata Dharma Library Assistant) adalah sistem perpustakaan modern yang mengintegrasikan teknologi Artificial Intelligence untuk memudahkan pencarian koleksi perpustakaan dengan fitur bersinopsis, analisis pengguna, dan deteksi kemiripan. Aplikasi ini dirancang untuk meningkatkan pengalaman pengguna perpustakaan dengan menyediakan berbagai fitur canggih yang memudahkan akses dan pengelolaan koleksi perpustakaan.

## Fitur Aplikasi

### 1. Chat AI Assistant
Fitur ini memungkinkan pengguna untuk berinteraksi langsung dengan asisten AI untuk mencari buku, mendapatkan rekomendasi, dan bantuan navigasi perpustakaan. Pengguna dapat mengajukan pertanyaan dalam bahasa alami dan mendapatkan respons yang relevan.

### 2. Pencarian Cerdas
Pencarian semantik dengan AI yang memahami konteks dan memberikan hasil yang lebih relevan. Fitur ini memungkinkan pengguna untuk menemukan buku dan koleksi perpustakaan dengan lebih mudah dan akurat.

### 3. Deteksi Plagiarisme
Fitur ini memungkinkan pengguna untuk memeriksa keaslian dokumen dengan teknologi AI untuk mendeteksi plagiarisme dan kemiripan teks. Sistem akan memberikan persentase kemiripan dan sumber-sumber yang mungkin mirip.

### 4. Manajemen Koleksi
Pengelolaan koleksi buku dengan sistem CRUD (Create, Read, Update, Delete) lengkap, filter canggih, dan pagination yang efisien. Fitur ini memudahkan pengelolaan koleksi perpustakaan.

### 5. Multi-Role System
Sistem peran yang fleksibel untuk admin, pustakawan, dosen, dan mahasiswa dengan akses yang sesuai. Setiap peran memiliki hak akses dan fitur yang berbeda sesuai dengan kebutuhan.

### 6. Keamanan Data
Perlindungan data dengan enkripsi, kontrol akses, dan kepatuhan terhadap standar privasi. Fitur ini memastikan keamanan data pengguna dan koleksi perpustakaan.

## Teknologi yang Digunakan

### Frontend
- **Next.js**: Framework React untuk pengembangan aplikasi web dengan fitur server-side rendering dan static site generation.
- **React**: Library JavaScript untuk membangun antarmuka pengguna.
- **Tailwind CSS**: Framework CSS untuk styling dengan pendekatan utility-first.
- **DaisyUI**: Komponen UI untuk Tailwind CSS.
- **Chart.js**: Library untuk membuat visualisasi data dan grafik.
- **Lucide React**: Library ikon untuk React.
- **SweetAlert2**: Library untuk menampilkan alert dan dialog yang menarik.

### Backend
- **Next.js API Routes**: Untuk membuat API endpoints.
- **MongoDB**: Database NoSQL untuk penyimpanan data.
- **Google Generative AI**: Untuk fitur AI dan chatbot.
- **PDF.js**: Untuk menampilkan dan memproses file PDF.
- **pdf-parse**: Untuk mengekstrak teks dari file PDF.

### Autentikasi & Keamanan
- **bcryptjs**: Untuk hashing password.
- **jsonwebtoken** & **jose**: Untuk implementasi JWT (JSON Web Token).
- **Zod**: Untuk validasi data.

### Caching & Optimasi
- **ioredis**: Client Redis untuk caching.

## Alur Aplikasi

### 1. Alur Pengguna (User Flow)

#### a. Pengguna Tidak Terotentikasi
1. Pengguna mengakses halaman utama (landing page)
2. Pengguna dapat melihat informasi tentang fitur-fitur aplikasi
3. Pengguna dapat login atau register untuk mengakses fitur lengkap

#### b. Pengguna Terotentikasi
1. Setelah login, pengguna diarahkan ke dashboard
2. Pengguna dapat mengakses fitur-fitur sesuai dengan peran mereka:
   - **Admin**: Akses penuh ke semua fitur, termasuk manajemen pengguna dan koleksi
   - **Pustakawan**: Akses ke manajemen koleksi dan laporan
   - **Dosen/Mahasiswa**: Akses ke pencarian, chatbot, dan deteksi plagiarisme

### 2. Alur Fitur Utama

#### a. Chat AI Assistant
1. Pengguna mengakses fitur chatbot di dashboard
2. Pengguna mengirimkan pertanyaan atau permintaan
3. Sistem memproses permintaan menggunakan Google Generative AI
4. Sistem menampilkan respons yang relevan

#### b. Pencarian Koleksi
1. Pengguna mengakses fitur pencarian
2. Pengguna memasukkan kata kunci atau filter
3. Sistem mencari koleksi yang sesuai di database
4. Sistem menampilkan hasil pencarian dengan pagination

#### c. Deteksi Plagiarisme
1. Pengguna mengakses fitur deteksi plagiarisme
2. Pengguna mengunggah dokumen atau memasukkan teks
3. Sistem menganalisis kemiripan dengan koleksi yang ada
4. Sistem menampilkan hasil analisis dengan persentase kemiripan dan sumber-sumber yang mirip

#### d. Manajemen Koleksi
1. Admin/Pustakawan mengakses fitur manajemen koleksi
2. Admin/Pustakawan dapat menambah, mengedit, atau menghapus koleksi
3. Sistem memperbarui database sesuai dengan perubahan

## Alur Data

### 1. Model Data

Aplikasi menggunakan MongoDB sebagai database dengan beberapa model utama:

- **User**: Menyimpan informasi pengguna (admin, pustakawan, dosen, mahasiswa)
- **Book**: Menyimpan informasi buku (judul, sinopsis, jumlah, tersedia, dipinjam, dll)
- **Journal**: Menyimpan informasi jurnal
- **Thesis**: Menyimpan informasi skripsi/tesis
- **Pengarang**: Menyimpan informasi pengarang
- **Penerbit**: Menyimpan informasi penerbit
- **Publikasi**: Menyimpan informasi publikasi

### 2. Alur Data Utama

#### a. Autentikasi
1. Pengguna mengirimkan kredensial (username/email dan password)
2. Server memverifikasi kredensial dengan database
3. Jika valid, server menghasilkan JWT token
4. Token disimpan di client-side untuk otentikasi selanjutnya

#### b. Pencarian dan Pengambilan Data
1. Client mengirimkan permintaan pencarian ke server
2. Server mengquery database berdasarkan parameter pencarian
3. Server mengembalikan hasil pencarian ke client
4. Client menampilkan hasil pencarian kepada pengguna

#### c. Manajemen Koleksi
1. Admin/Pustakawan mengirimkan permintaan CRUD ke server
2. Server memvalidasi permintaan dan memperbarui database
3. Server mengembalikan status operasi ke client
4. Client menampilkan konfirmasi atau pesan error

#### d. Chatbot dan AI
1. Pengguna mengirimkan pesan ke server
2. Server meneruskan pesan ke Google Generative AI
3. Google Generative AI memproses pesan dan menghasilkan respons
4. Server mengembalikan respons ke client
5. Client menampilkan respons kepada pengguna

## Logika Aplikasi

### 1. Autentikasi dan Otorisasi
- Aplikasi menggunakan JWT untuk autentikasi
- Middleware ProtectedRoute dan PublicRoute untuk mengontrol akses
- Konteks AuthContext untuk menyimpan dan mengelola state autentikasi

### 2. Manajemen State
- React Hooks untuk mengelola state komponen
- Custom hooks (useLibraryItems, useAllLibraryItems, dll) untuk logika bisnis

### 3. Caching dan Optimasi
- Redis untuk caching data yang sering diakses
- Optimasi query database dengan indeks dan agregasi

### 4. Integrasi AI
- Google Generative AI untuk chatbot dan pencarian semantik
- Algoritma similarity untuk deteksi plagiarisme

### 5. Validasi Data
- Zod untuk validasi input pengguna
- Validasi server-side untuk keamanan tambahan

## Diagram

Diagram-diagram berikut memberikan gambaran visual tentang struktur dan alur aplikasi:

1. [Diagram Arsitektur Aplikasi](./arsitektur-aplikasi.png)
2. [Diagram Alur Pengguna](./alur-pengguna.png)
3. [Diagram Entity Relationship (ERD)](./entity-relationship-diagram.png)
4. [Diagram Alur Data](./alur-data.png)
5. [Diagram Komponen](./komponen.png)