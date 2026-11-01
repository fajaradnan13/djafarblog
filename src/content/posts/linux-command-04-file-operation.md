---
title: "Linux Command #04: Operasi Berkas & Direktori — Membuat, Menyalin, Memindahkan, dan Menghapus"
meta_title: "Panduan CRUD Berkas Linux: touch, mkdir, cp, mv, dan rm"
description: "Pelajari cara mengelola siklus hidup berkas di Linux: membuat file kosong dengan touch, folder bersarang dengan mkdir -p, trik salin cp, rename/pindah dengan mv, serta tips aman menghapus dengan rm."
date: 2026-09-18T15:00:00Z
image: "/images/posts/linux-command-04-hero.jpg"
categories:
  - Linux
  - Tutorial
  - Command Line
featured: false
draft: false
series: "Linux Command Mastery"
series_part: 4
---

Selamat datang kembali di seri tutorial **Linux Command Mastery** persembahan channel **Teknologi Newbie**!

Pada episode sebelumnya, kita telah belajar cara bernavigasi lincah di filesystem. Di episode keempat ini, kita akan mempelajari keterampilan operasional harian terpenting: **Manajemen Berkas & Direktori** — membuat (*Create*), membaca daftar (*Read*), menyalin serta memindahkan (*Update*), hingga menghapus berkas (*Delete*) dengan aman.

---

## 🎯 1. Apa yang Akan Kita Pelajari Hari Ini?

- **Membuat Berkas Kosong (`touch`)**: Membuat file baru sekaligus memperbarui timestamp.
- **Membangun Struktur Direktori (`mkdir`)**: Trik folder bersarang instan dengan opsi `-p`.
- **Menyalin Berkas & Direktori (`cp`)**: Salin file tunggal dan mode rekursif `-r`.
- **Memindahkan & Mengganti Nama (`mv`)**: Satu perintah untuk dua fungsi berbeda.
- **Menghapus Berkas & Direktori (`rm`)**: Memahami opsi `-r`, `-f`, dan proteksi `-i`.
- **Aturan Emas Keamanan**: Mencegah bencana kehilangan data akibat perintah berbahaya.

---

## 📄 2. Membuat Berkas Kosong dengan `touch`

Perintah `touch` adalah cara paling cepat untuk membuat satu atau banyak berkas kosong sekaligus:

```bash
# Membuat satu berkas
touch catatan.txt

# Membuat beberapa berkas sekaligus
touch index.html styles.css app.js
```

### Fungsi Tambahan: Memperbarui Timestamp
Jika berkas sudah ada sebelumnya, perintah `touch` tidak akan menghapus atau mengubah isi file, melainkan hanya memperbarui waktu akses dan modifikasinya (*modification timestamp*).

---

## 📁 3. Membuat Direktori dengan `mkdir`

Perintah `mkdir` (*Make Directory*) digunakan untuk membuat folder baru.

### Trik Wajib: Opsi `-p` (*Parents*)
Secara default, `mkdir` akan error jika kita mencoba membuat subdirektori di dalam folder yang belum ada. Opsi `-p` akan membuat seluruh rantai folder induk secara otomatis:

```bash
# Tanpa opsi -p (akan gagal jika folder proyek belum ada):
# mkdir proyek/src/components

# Dengan opsi -p (otomatis membuat semua folder dari hulu ke hilir):
mkdir -p proyek/src/components
```

- **Verifikasi**: Jalankan `ls -R proyek` untuk melihat pohon folder yang baru saja dibuat.

---

## 📑 4. Menyalin Berkas & Folder dengan `cp`

Perintah `cp` (*Copy*) menyalin data dari sumber (*source*) ke tujuan (*destination*).

### 1. Menyalin Berkas Tunggal
```bash
# Salin berkas ke nama baru
cp config.json config.backup.json

# Salin berkas ke dalam direktori lain
cp data.txt ~/Documents/
```

### 2. Menyalin Direktori: Wajib Opsi `-r` (*Recursive*)
Direktori berisi berkas dan subfolder di dalamnya, sehingga harus disalin secara rekursif:

```bash
# Salin seluruh folder website ke folder website_backup
cp -r website website_backup
```

- **Tips Proteksi**: Gunakan opsi `-i` (`cp -i`) agar terminal meminta konfirmasi jika ada berkas di tujuan yang akan tertimpa (*overwrite*).

---

## 🚚 5. Memindahkan & Mengganti Nama dengan `mv`

Perintah `mv` (*Move*) memiliki dua fungsi utama tergantung target tujuannya:

### 1. Mengganti Nama Berkas / Folder (*Rename*)
Jika target berada di direktori yang sama dengan nama baru:
```bash
mv draft_laporan.txt laporan_final.txt
```

### 2. Memindahkan Berkas ke Folder Lain (*Move*)
Jika target adalah nama direktori yang sudah ada:
```bash
# Pindahkan satu file
mv laporan_final.txt ~/Documents/

# Pindahkan beberapa file sekaligus ke folder arsip
mv *.log arsip_log/
```

---

## 🗑️ 6. Menghapus Berkas & Direktori dengan `rm`

> [!WARNING]
> Di Linux Terminal, **TIDAK ADA Recycle Bin atau Trash Can**! Berkas yang dihapus lewat perintah `rm` akan langsung musnah dari sistem penyimpanan.

### Opsi-Opsi Penting `rm`

| Opsi | Fungsi | Kapan Digunakan |
|:---:|:---|:---|
| **`rm file.txt`** | Menghapus berkas tunggal biasa | Penghapusan standar |
| **`rm -i file.txt`** | Meminta konfirmasi (*interactive*: y/n) sebelum menghapus | Menghapus berkas penting |
| **`rm -r folder/`** | Menghapus direktori beserta seluruh isinya secara rekursif | Menghapus folder non-kosong |
| **`rm -rf folder/`** | Paksa hapus (*force*) tanpa konfirmasi apa pun | Digunakan dengan sangat hati-hati |

### Cara Aman Menghapus Folder Kosong
Gunakan perintah `rmdir` jika Anda hanya ingin menghapus folder yang benar-benar kosong:
```bash
rmdir folder_kosong
```

---

## 📝 7. Rangkuman Materi Episode 4

- **`touch nama_file`**: Membuat berkas baru atau memperbarui timestamp.
- **`mkdir -p path/folder/bersarang`**: Membuat rantai direktori lengkap sekaligus.
- **`cp sumber tujuan`**: Menyalin berkas (tambahkan `-r` untuk direktori).
- **`mv lama baru`**: Mengganti nama berkas atau memindahkannya ke lokasi lain.
- **`rm nama_file`**: Menghapus file secara permanen (tambahkan `-r` untuk folder).
- **Keamanan**: Biasakan menggunakan flag `-i` saat menyalin, memindah, atau menghapus file penting.

---

## 🛠️ 8. Tantangan Praktik Mandiri

Jalankan skenario alur kerja sederhana ini di terminal Anda:

```bash
# 1. Buat struktur folder proyek
mkdir -p ~/latihan_ep4/arsip

# 2. Buat tiga berkas catatan baru
cd ~/latihan_ep4
touch draft1.txt draft2.txt notes.md

# 3. Ubah nama draft1.txt menjadi tugas_selesai.txt
mv draft1.txt tugas_selesai.txt

# 4. Salin notes.md ke dalam folder arsip
cp notes.md arsip/

# 5. Hapus draft2.txt dengan konfirmasi
rm -i draft2.txt
```

---

## 🔜 9. Preview Episode 5

Pada episode berikutnya, kita akan belajar cara **melihat isi berkas tanpa membuka aplikasi editor**! Kita akan membahas `cat`, `less`, `head`, `tail`, serta berkenalan dengan editor teks terminal bawaan Linux yang ramah pemula: **Nano**.

Terima kasih sudah belajar bersama channel **Teknologi Newbie**! Jangan lupa Like, Subscribe, dan aktifkan lonceng notifikasinya. Sampai jumpa di Episode 5! 🐧
