# 🚀 Djafar Blog — Modern Astro Blog & Interactive Presentation Platform

<p align="center">
  <img src="https://img.shields.io/badge/Astro-5.x-BC52EE?style=for-the-badge&logo=astro&logoColor=white" alt="Astro" />
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/TinaCMS-Git_Based-FF6B6B?style=for-the-badge&logo=tinacms&logoColor=white" alt="TinaCMS" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License" />
</p>

**Djafar Blog** adalah platform blog dan media pembelajaran teknologi modern berbasis **Astro** dan **React**. Blog ini dirancang khusus untuk menyajikan artikel tutorial komprehensif (seperti kurikulum *Linux Command Mastery*) yang dapat diubah seketika menjadi **Mode Presentasi / Slide Interaktif** langsung di peramban tanpa memerlukan aplikasi pihak ketiga.

---

## 📑 Daftar Isi Manual Book

1. [Fitur Unggulan](#-fitur-unggulan)
2. [Panduan Instalasi & Menjalankan Lokal](#-panduan-instalasi--menjalankan-lokal)
3. [Buku Panduan Penggunaan Aplikasi (Manual Book)](#-buku-panduan-penggunaan-aplikasi-manual-book)
   - [A. Menggunakan Mode Slide Interaktif (Slide View)](#a-menggunakan-mode-slide-interaktif-slide-view)
   - [B. Menulis dan Menerbitkan Artikel Baru](#b-menulis-dan-menerbitkan-artikel-baru)
   - [C. Menghubungkan Artikel ke dalam Seri (Post Series)](#c-menghubungkan-artikel-ke-dalam-seri-post-series)
   - [D. Mengelola Konten dengan Visual Dashboard (TinaCMS)](#d-mengelola-konten-dengan-visual-dashboard-tinacms)
4. [Daftar Perintah Penting (Available Scripts)](#-daftar-perintah-penting-available-scripts)
5. [Struktur Direktori Proyek](#-struktur-direktori-proyek)
6. [Deployment & Rilis Produksi](#-deployment--rilis-produksi)
7. [Lisensi](#-lisensi)

---

## ✨ Fitur Unggulan

- 🎬 **Mode Presentasi Interaktif (Slide View)**:
  - Tombol aksi mengambang (*floating button*) untuk mengubah artikel menjadi tayangan slide presentasi instan.
  - **Slide Cover Sinematik**: Menampilkan *hero image*, pill kategori, badge seri, judul bergradasi, dan sinopsis pada slide pertama.
  - **Kanvas Coretan Digital**: Pemateri dapat mencorat-coret di atas slide menggunakan mouse atau layar sentuh.
  - **3 Pilihan Tema Slide**: *Dark* (Slate/Emerald), *Midnight* (Navy/Sky Blue), dan *Light* (Clean Editorial).
  - **Kontrol Zoom Dinamis**: Skala tampilan slide dari 50% hingga 250% dengan tombol *reset zoom*.
- 📚 **Timeline Navigasi Seri (Post Series Navigator)**:
  - Menampilkan linimasa horizontal antar episode artikel lengkap dengan badge penanda part aktif.
- 📊 **Penghitung Pembaca Real-Time (View Counter)**:
  - Mengukur jumlah pembaca artikel secara otomatis dan akurat.
- 📱 **Mobile Table of Contents (MobileTOC) & Reading Progress Bar**:
  - Bilah indikator progres membaca di bagian atas halaman serta navigasi daftar isi ramah sentuhan.
- 📋 **Copy Code Button Pintar**:
  - Salin baris kode pada terminal/blok perintah hanya dengan satu kali klik.
- ✍️ **Dukungan Git-based Headless CMS (TinaCMS)**:
  - Sunting isi blog, kelola media gambar, dan konfigurasi situs melalui antarmuka visual `/admin`.
- ⚡ **Performa Ekstrem**:
  - Skor Google PageSpeed 100 dengan waktu muat secepat kilat (*Zero JS by default* berkat arsitektur pulau Astro).

---

## 🛠️ Panduan Instalasi & Menjalankan Lokal

### 1. Prasyarat Sistem
Pastikan perangkat Anda telah terpasang:
- **Node.js**: Versi LTS 18.x atau 20.x ke atas ([Unduh Node.js](https://nodejs.org/))
- **Git**: Untuk manajemen versi repositori

### 2. Kloning Repositori & Instal Dependensi
Buka terminal pada komputer Anda dan jalankan perintah:

```bash
# 1. Kloning repositori
git clone https://github.com/fajaradnan13/djafarblog.git

# 2. Masuk ke direktori proyek
cd djafarblog

# 3. Pasang semua dependensi
npm install
```

### 3. Menjalankan Server Pengembangan (Localhost)
Jalankan perintah berikut:

```bash
npm run dev
```

Secara default, aplikasi akan berjalan pada:
- **Tampilan Blog**: `http://localhost:4321/`
- **Dashboard TinaCMS**: `http://localhost:4321/admin/index.html`

---

## 📖 Buku Panduan Penggunaan Aplikasi (Manual Book)

### A. Menggunakan Mode Slide Interaktif (Slide View)

Fitur ini dirancang khusus untuk mempermudah kegiatan pengajaran di kelas, pembuatan video edukasi YouTube, atau presentasi teknis.

#### 1. Cara Mengaktifkan:
Buka artikel blog mana pun melalui peramban, lalu klik tombol hijau bundar dengan ikon papan tulis (**👨‍🏫**) yang berada di **pojok kanan bawah layar**.

#### 2. Tabel Pintasan Keyboard (Keyboard Shortcuts):

| Tombol Keyboard | Fungsi / Tindakan |
|:---|:---|
| **`→` (Panah Kanan)**, **`Spasi`**, atau **`PageDown`** | Berpindah ke slide berikutnya |
| **`←` (Panah Kiri)** atau **`PageUp`** | Kembali ke slide sebelumnya |
| **`↓` (Panah Bawah)** / **`↑` (Panah Atas)** | Menggulir isi slide yang panjang |
| **`C`** | Menghapus seluruh coretan kanvas aktif |
| **`+`** atau **`=`** | Memperbesar tampilan slide (*Zoom In*) |
| **`-`** | Memperkecil tampilan slide (*Zoom Out*) |
| **`0`** | Mengembalikan perbesaran ke ukuran normal (100%) |
| **`Esc`** | Menutup mode presentasi dan kembali ke tampilan artikel blog |

#### 3. Fitur Tambahan di Mode Slide:
- **Ganti Tema**: Klik tombol *Light*, *Dark*, atau *Midnight* di pojok kiri bawah untuk menyesuaikan pencahayaan ruangan presentasi Anda.
- **Mencoret Slide**: Cukup klik dan seret kursor mouse (atau gunakan stylus/jari pada layar sentuh) untuk melingkari atau menggarisbawahi poin penting materi.

---

### B. Menulis dan Menerbitkan Artikel Baru

Artikel blog ditulis menggunakan format **Markdown (`.md`)** atau **MDX (`.mdx`)** di dalam folder `src/content/posts/`.

#### 1. Struktur Template Artikel Standar:
Buat berkas baru, misalnya `src/content/posts/nama-artikel-anda.md`:

```markdown
---
title: "Linux Command #06: I/O Redirection — Mengalirkan Input, Output, dan Error"
meta_title: "Panduan I/O Redirection Linux: >, >>, 2>, dan /dev/null"
description: "Pelajari cara mengendalikan aliran data di terminal Linux menggunakan operator redirection dan menangkap error."
date: 2026-09-22T15:00:00Z
image: "/images/posts/linux-command-06-hero.jpg"
categories:
  - Linux
  - Tutorial
  - Command Line
featured: false
draft: false
series: "Linux Command Mastery"
series_part: 6
---

Paragraf pembuka artikel Anda ditulis di sini...

## 🎯 1. Apa yang Akan Kita Pelajari Hari Ini?
Poin-poin pembahasan...

## ⚙️ 2. Konsep Dasar
Penjelasan konsep...
```

#### 2. Tips Penulisan agar Optimal di Mode Slide:
- Gunakan heading level 2 (`## Judul Bagian`) untuk setiap topik bahasan baru. Setiap kali sistem mendeteksi tag `##`, konten di bawahnya akan otomatis dipisah menjadi slide baru.
- Gunakan blok kode dengan penanda bahasa (contoh: ` ```bash `) agar tombol *Copy Code* otomatis muncul.
- Format tabel Markdown secara otomatis dikonversi dengan tipografi yang nyaman dibaca pada layar proyektor.

---

### C. Menghubungkan Artikel ke dalam Seri (Post Series)

Jika Anda sedang menulis artikel bersambung (seperti tutorial multi-episode):
1. Berikan nama seri yang sama pada properti `series` di frontmatter:  
   `series: "Linux Command Mastery"`
2. Tentukan nomor urut episode pada properti `series_part`:  
   `series_part: 1`
3. Komponen linimasa **Post Series** akan secara otomatis menghubungkan artikel tersebut dengan episode sebelum dan sesudahnya secara berurutan.

---

### D. Mengelola Konten dengan Visual Dashboard (TinaCMS)

Bagi Anda yang lebih menyukai antarmuka visual tanpa membuka kode:
1. Pastikan server lokal menyala (`npm run dev`).
2. Kunjungi `http://localhost:4321/admin/index.html`.
3. Anda dapat:
   - Membuat dan mengedit postingan dengan editor WYSIWYG.
   - Mengunggah berkas gambar langsung ke pustaka media.
   - Mengubah konfigurasi global situs (*title*, deskripsi, informasi penulis, dan media sosial).
4. Setiap kali Anda menekan tombol **Save** di TinaCMS, perubahan akan langsung disimpan ke dalam berkas Markdown di komputer Anda dan siap di-commit ke Git.

---

## 💻 Daftar Perintah Penting (Available Scripts)

| Perintah | Deskripsi |
|:---|:---|
| `npm run dev` | Menjalankan server pengembang lokal (Astro + TinaCMS daemon) |
| `npm run build` | Melakukan kompilasi statis produksi ke folder `dist/` |
| `npm run preview` | Menjalankan preview lokal dari hasil kompilasi produksi |
| `npm run format` | Merapikan format kode secara otomatis menggunakan Prettier |
| `npm run generate-json` | Membuat ulang indeks pencarian artikel (`fuse.js`) |
| `npm run check` | Memeriksa validitas tipe TypeScript dan sintaks berkas `.astro` |
| `npm run deploy:cf-workers` | Membangun dan merilis langsung ke Cloudflare Workers via Wrangler |

---

## 📂 Struktur Direktori Proyek

```text
djafarblog/
├── public/                     # Aset statis publik
│   └── images/                 # Gambar artikel, banner, dan ikon
├── src/
│   ├── content/
│   │   └── posts/              # Tempat seluruh artikel Markdown (.md) disimpan
│   ├── layouts/
│   │   ├── Base.astro          # Template kerangka dasar HTML
│   │   └── components/
│   │       ├── SlideView.tsx   # Komponen Mode Presentasi Interaktif
│   │       ├── PostSeries.astro# Komponen linimasa seri artikel
│   │       ├── MobileTOC.astro # Navigasi Daftar Isi mobile
│   │       └── ViewCounter.astro# Penghitung pembaca artikel
│   └── pages/                  # Rute halaman situs web (.astro)
├── tina/                       # Skema dan konfigurasi TinaCMS
├── LINUX_SERIES_ROADMAP.md     # Silabus lengkap kurikulum Linux Command Mastery
├── astro.config.mjs            # Konfigurasi Astro
└── package.json                # Daftar paket dan perintah script
```

---

## 🌐 Deployment & Rilis Produksi

Aplikasi ini dapat di-deploy dengan sangat mudah ke berbagai penyedia hosting statis modern:

- **Vercel / Netlify**: Cukup hubungkan repositori GitHub Anda. Konfigurasi build:
  - *Build Command*: `npm run build`
  - *Publish Directory*: `dist`
- **Cloudflare Pages / Workers**:
  - Jalankan `npm run deploy:cf-workers` atau hubungkan melalui dashboard Cloudflare Pages.

---

## 📄 Lisensi

Proyek ini dirilis di bawah lisensi [MIT License](LICENSE). Anda bebas menggunakan, memodifikasi, dan mengembangkan kode ini untuk keperluan pribadi maupun komersial.
