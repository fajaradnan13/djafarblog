---
title: "Linux Command #02: Memahami Struktur Filesystem Linux"
meta_title: "Belajar Filesystem Linux: Memahami Struktur Direktori dari Root Hingga Home"
description: "Pahami struktur direktori Linux secara mendalam. Pelajari fungsi /, /home, /etc, /var, /tmp, /usr, dan konsep 'everything is a file' yang menjadi fondasi Linux."
date: 2026-09-16T15:00:00Z
image: "/images/posts/linux-command-02-hero.jpg"
categories:
  - Linux
  - Tutorial
  - Command Line
featured: false
draft: false
series: "Linux Command Mastery"
series_part: 2
---

Selamat datang kembali di seri tutorial **Linux Command Mastery** persembahan channel **Teknologi Newbie**!

Pada episode sebelumnya, kita sempat mengeksekusi perintah `pwd` dan mendapatkan hasil lokasi seperti `/home/fajar`. Di episode kedua ini, kita akan membedah **struktur filesystem Linux** — peta navigasi utama yang wajib dipahami agar tidak tersesat saat mencari berkas konfigurasi, membaca log, atau mengelola aplikasi.

---

## 🎯 1. Apa yang Akan Kita Pelajari Hari Ini?

- **Filosofi Pohon Terbalik (*Inverted Tree*)**: Mengapa Linux tidak mengenal Drive `C:\` atau `D:\`.
- **Root Directory (`/`)**: Titik awal dan pusat dari seluruh direktori.
- **Direktori Vital Linux**: Fungsi `/home`, `/etc`, `/var`, `/tmp`, `/usr`, `/bin`, `/dev`, dan `/proc`.
- **Absolute vs Relative Path**: Memahami cara menunjuk lokasi berkas secara presisi.
- **Filosofi "Everything is a File"**: Konsep unik di mana seluruh komponen dianggap sebagai berkas.

---

## 🌳 2. Filosofi Pohon Terbalik (*Inverted Tree*)

Di Windows, media penyimpanan dipisah berdasarkan *drive letter* (`C:\`, `D:\`). Di Linux, seluruh sistem organisasi penyimpanan disatukan dalam satu pohon direktori tunggal:

- **Root Directory (`/`)**: Titik puncak awal dari seluruh hierarki direktori.
- **Mounting Point**: Berbagai partisi maupun perangkat keras tambahan "ditempelkan" di dalam cabang direktori utama ini.

```text
/
├── home/
│   ├── fajar/
│   └── admin/
├── etc/
├── var/
│   └── log/
├── tmp/
├── usr/
│   ├── bin/
│   └── local/
├── bin/
├── sbin/
├── dev/
├── proc/
└── root/
```

> [!TIP]
> Gunakan perintah `tree -L 1 /` (atau `ls -l /` jika utilitas tree belum terinstal) di terminal untuk melihat cabang utama ini secara langsung.

---

## 📂 3. Mengenal Direktori-Direktori Utama

### 🚩 `/` — Root Directory
- **Fungsi**: Titik awal dari seluruh direktori dan berkas di sistem Linux.
- **Analoginya**: Lobi utama gedung — pintu masuk utama menuju seluruh ruangan lainnya.
- **Perintah Cek**: `ls /`

### 🏠 `/home` — Rumah Para User
- **Fungsi**: Direktori personal untuk setiap pengguna standar di sistem (dokumen, unduhan, dan preferensi aplikasi).
- **Simbol Tilde (`~`)**: Mewakili jalan pintas ke direktori home pengguna aktif (`/home/username`).
- **Perintah Cek**: `echo ~` ➔ Output: `/home/fajar`

### ⚙️ `/etc` — Pusat Konfigurasi Sistem
- **Fungsi**: Menyimpan hampir seluruh berkas pengaturan dan konfigurasi sistem operasi serta aplikasi.
- **Berkas Kunci**:
  - `/etc/hostname` ➔ Nama komputer/host.
  - `/etc/hosts` ➔ Tabel pemetaan IP address ke nama domain lokal.
  - `/etc/passwd` ➔ Informasi daftar pengguna sistem.
  - `/etc/fstab` ➔ Konfigurasi auto-mount partisi media penyimpanan.
  - `/etc/ssh/sshd_config` ➔ Konfigurasi server remote SSH.

### 📊 `/var` — Data Dinamis yang Selalu Berubah (*Variable*)
- **Fungsi**: Menyimpan data yang ukuran dan isinya terus berkembang secara kontinyu.
- **Sub-Direktori Penting**:
  - `/var/log` ➔ Berkas catatan sistem & log aplikasi (sangat krusial untuk troubleshooting).
  - `/var/www` ➔ Lokasi default berkas aplikasi web.
  - `/var/tmp` ➔ Berkas sementara yang tetap tersimpan meski sistem di-restart.

### 🗑️ `/tmp` — Tempat Penyimpanan Sementara
- **Fungsi**: Area penyimpanan data sementara milik pengguna atau aplikasi.
- **Karakteristik**: Semua pengguna memiliki akses tulis, dan isinya otomatis dibersihkan saat sistem di-reboot.
- **Peringatan**: Jangan pernah menyimpan berkas penting di direktori ini!

### 📦 `/usr` — Unix System Resources
- **Fungsi**: Menyimpan program, pustaka (*library*), dan dokumentasi yang diinstal oleh paket aplikasi sistem.
- **Struktur Internal**:
  - `/usr/bin` ➔ Program/perintah tingkat pengguna umum (`python3`, `git`, `vim`).
  - `/usr/sbin` ➔ Program pendukung administrasi sistem.
  - `/usr/local` ➔ Lokasi kompilasi/instalasi manual aplikasi mandiri.

### ⚡ `/bin` dan `/sbin` — Perintah Dasar & Administrasi
- `/bin`: Perintah esensial sistem yang dapat dieksekusi oleh seluruh pengguna (`ls`, `cp`, `cat`, `mkdir`).
- `/sbin`: Perintah administrasi khusus yang umumnya membutuhkan hak akses root (`fdisk`, `reboot`, `iptables`).

### 👑 `/root` — Rumah Sang Admin (*Root User*)
- **Fungsi**: Direktori home khusus untuk administrator tertinggi (**root**).
- **Mengapa Terpisah dari `/home`?**: Memastikan administrator tetap dapat login dan memperbaiki sistem saat partisi `/home` mengalami error atau gagal di-mount.

### 🔌 `/dev` — Perangkat Keras (*Device Files*)
- **Fungsi**: Representasi perangkat fisik/virtual sebagai berkas antarmuka sistem.
- **Contoh Berkas**:
  - `/dev/sda` ➔ Media penyimpanan / Hard disk utama.
  - `/dev/sda1` ➔ Partisi pertama pada hard disk utama.
  - `/dev/null` ➔ Berkas lubang hitam pembuangan data.

### 🧠 `/proc` — Virtual Filesystem Kernel
- **Fungsi**: Jendela informasi realtime mengenai kernel dan proses sistem langsung dari memori RAM.
- **Contoh Cek**: `cat /proc/cpuinfo | head -5` (Melihat spesifikasi prosesor).

---

## 🗺️ 4. Absolute Path vs Relative Path

Terdapat dua metode penulisan jalur titik lokasi (*path*) di sistem Linux:

### 1. Absolute Path (Jalur Mutlak)
- **Patokan**: Selalu diawali dari titik Root (`/`).
- **Karakteristik**: Menunjuk ke lokasi yang tepat tanpa terpengaruh posisi direktori kerja saat ini.
- **Contoh**: `/home/fajar/Documents/catatan.txt`

### 2. Relative Path (Jalur Relatif)
- **Patokan**: Berpatokan dari direktori tempat pengguna berada saat ini (tidak diawali `/`).
- **Simbol Khusus**:
  - `.` ➔ Menunjuk ke direktori saat ini.
  - `..` ➔ Menunjuk ke direktori satu tingkat di atasnya (*parent directory*).
- **Contoh**: `Documents/catatan.txt` atau `cd ..`

| Jenis Path | Rekomendasi Penggunaan |
|:---|:---|
| **Absolute Path** | Penulisan skrip otomasi (bash script) & konfigurasi sistem agar terhindar dari ambigu |
| **Relative Path** | Navigasi cepat dan interaktif secara langsung di terminal |

---

## 📄 5. Filosofi Utama: "Everything is a File"

Salah satu prinsip arsitektur terpenting di Linux adalah: **Semua objek di dalam sistem diperlakukan sebagai berkas**:

- **Berkas teks biasa** ➔ File data
- **Folder / Direktori** ➔ File yang berisi daftar referensi berkas lain
- **Hard Disk / USB Drive** ➔ File perangkat (`/dev/sda`)
- **Sesi Terminal** ➔ File antarmuka (`/dev/tty`)
- **Informasi Proses & CPU** ➔ File virtual (`/proc/cpuinfo`)

> [!NOTE]
> **Manfaat Filosofi Ini**: Pengguna dan pengembang dapat berinteraksi dengan berbagai komponen keras maupun sistem menggunakan kumpulan perintah dasar yang sama (misal: `cat`, `grep`, `echo`).

---

## 📝 6. Rangkuman Materi Episode 2

- **Hierarki Tunggal**: Linux diawali dari satu Root Directory (`/`) dan bercabang membentuk struktur pohon terbalik (*Inverted Tree*).
- **Pembagian Tugas Direktori**:
  - `/etc` untuk konfigurasi sistem.
  - `/var/log` untuk catatan/aktivitas log.
  - `/home` untuk berkas pribadi pengguna.
  - `/tmp` untuk berkas sementara yang dapat terhapus saat reboot.
- **Penulisan Path**: Absolute Path diawali simbol `/`, sedangkan Relative Path ditulis fleksibel dari titik posisi aktif.
- **Everything is a File**: Seluruh perangkat keras dan informasi sistem dipetakan sebagai berkas.

---

## 🛠️ 7. Tantangan Praktik Mandiri

Buka terminal Linux Anda (WSL, Virtual Machine, atau Cloud Shell) dan jalankan instruksi navigasi sederhana ini:

```bash
# 1. Tampilkan isi direktori root utama
ls /

# 2. Cek berkas konfigurasi nama komputer
cat /etc/hostname

# 3. Intip direktori log sistem
ls /var/log

# 4. Lihat spesifikasi prosesor via proc virtual filesystem
cat /proc/cpuinfo | head -10
```

Amati struktur dari setiap lokasi direktori dan mulailah membiasakan diri dengan tata letak berkas Linux!

---

## 🔜 8. Preview Episode 3

Pada episode berikutnya, kita akan belajar cara berpindah dan menjelajah direktori secara mahir! Kita akan mengupas tuntas perintah navigasi **`cd`** beserta trik cepatnya, mendalami opsi-opsi terbaik dari perintah **`ls`**, serta trik **Tab Completion** untuk bergerak secepat kilat di terminal.

Terima kasih sudah belajar bersama channel **Teknologi Newbie**! Jangan lupa dukung channel kami dengan Like, Subscribe, dan aktifkan lonceng notifikasinya. Sampai jumpa di Episode 3! 🐧
