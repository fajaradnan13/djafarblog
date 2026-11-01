---
title: "Linux Command #08: Wildcards & Pattern Matching — Seleksi Ribuan Berkas dalam Sekejap"
meta_title: "Belajar Wildcards Linux: Bintang (*), Tanda Tanya (?), dan Kurung Siku ([])"
description: "Kuasai teknik pemilihan berkas kilat di Linux menggunakan globbing/wildcards (*, ?, []), manipulasi batch file, dan brace expansion ({}) untuk efisiensi maksimal."
date: 2026-09-27T15:00:00Z
image: "/images/posts/linux-command-08-hero.jpg"
categories:
  - Linux
  - Tutorial
  - Command Line
featured: false
draft: false
series: "Linux Command Mastery"
series_part: 8
---

Selamat datang kembali di seri tutorial **Linux Command Mastery** persembahan channel **Teknologi Newbie**!

Pada episode sebelumnya, kita telah mempelajari kekuatan Linux Pipe (`|`) untuk menyambungkan berbagai perintah. Di episode kedelapan ini, kita akan membahas salah satu fitur paling menghemat waktu di terminal: **Wildcards & Pattern Matching (Globbing)** — teknik cerdas untuk memilih, memindahkan, atau memanipulasi ratusan berkas sekaligus hanya dalam satu kali eksekusi perintah.

---

## 🎯 1. Apa yang Akan Kita Pelajari Hari Ini?

- **Mekanisme Kerja Globbing**: Memahami bahwa Shell Bash yang menerjemahkan pola sebelum program dieksekusi.
- **Karakter Bintang (`*`)**: Mencocokkan nol, satu, atau banyak karakter bebas tanpa batas.
- **Karakter Tanda Tanya (`?`)**: Mencocokkan tepat satu karakter tunggal pada posisi tertentu.
- **Karakter Kurung Siku (`[...]`)**: Menyaring daftar karakter spesifik dan rentang nilai (*range*).
- **Negasi Karakter (`[!...]`)**: Memilih semua berkas KECUALI pola yang ditentukan.
- **Brace Expansion (`{...}`)**: Menghasilkan deret angka, huruf, dan kombinasi matriks secara instan.
- **Peringatan Keselamatan**: Menghindari jebakan spasi maut saat menggunakan wildcard bersama `rm`.

---

## 🧠 2. Rahasia di Balik Layar: Shell yang Bekerja

Ada satu rahasia penting yang wajib dipahami sebelum menggunakan simbol wildcard:

> **Perintah seperti `ls`, `cp`, atau `rm` sama sekali tidak memproses tanda wildcard secara langsung.**

Ketika Anda mengetik:
```bash
ls *.txt
```

Proses yang terjadi di balik layar adalah:
1. **Shell Bash memindai direktori** dan mencari berkas yang cocok dengan pola `*.txt`.
2. **Ekspansi Berkas**: Bash mengganti tulisan `*.txt` dengan daftar nama berkas asli (misal: `catatan.txt`, `laporan.txt`).
3. **Eksekusi**: Perintah `ls` hanya menerima daftar nama berkas yang sudah diekspansi oleh Bash.

Karena fitur ini disediakan oleh Shell, Anda bisa menggunakan wildcard pada **perintah Linux apa pun!**

---

## ⭐ 3. Karakter Bintang (*): Mencocokkan Karakter Bebas

Simbol bintang (`*`) adalah wildcard paling populer. Fungsinya mencocokkan karakter apa pun dalam jumlah berapa pun (termasuk nol karakter).

### Contoh Penggunaan Populer

```bash
# Tampilkan semua berkas berakhiran .jpg
ls *.jpg

# Hapus semua berkas yang diawali kata "temp_"
rm temp_*

# Salin semua berkas yang memiliki kata "laporan" di mana pun letaknya
cp *laporan* ~/arsip/

# Pindahkan semua file yang diawali "app" dan berakhiran ".log"
mv app*.log /var/log/
```

---

## ❓ 4. Karakter Tanda Tanya (?): Mencocokkan Satu Karakter Tunggal

Jika tanda bintang mewakili jumlah karakter bebas, tanda tanya (`?`) mewakili **tepat satu karakter** pada posisi tertentu.

### Contoh Perbandingan

```bash
# Mencocokkan file: doc1.txt, doc2.txt, docA.txt
# TIDAK mencocokkan: doc10.txt atau doc.txt
ls doc?.txt

# Mencocokkan file dengan 4 karakter nama: foto.jpg, data.jpg
ls ????.jpg

# Menemukan laporan tahun 2020-2029 (panjang tepat 4 angka)
ls laporan-202?.pdf
```

---

## 🔲 5. Karakter Kurung Siku ([...]): Karakter Spesifik & Rentang

Gunakan tanda kurung siku `[...]` jika Anda ingin mencocokkan karakter tunggal dari sekumpulan opsi atau rentang (*range*) tertentu.

### Pola Rentang Karakter

```bash
# Hanya cocok dengan berkas foto1.png, foto2.png, foto3.png
ls foto[123].png

# Menggunakan rentang angka 1 sampai 5
ls data-[1-5].csv

# Menggunakan rentang abjad huruf kecil a sampai z
ls [a-z]*.txt

# Menggunakan rentang huruf besar A sampai F
ls log_[A-F].log
```

---

## 🚫 6. Negasi Kurung Siku ([!...]): Memilih Kecuali Pola

Tambahkan tanda seru (`!`) tepat di awal kurung siku untuk membalikkan kondisi (cocokkan apa pun KECUALI karakter di dalam kurung).

```bash
# Tampilkan berkas yang TIDAK diakhiri dengan angka 1 sampai 5
ls data-[!1-5].csv

# Hapus semua file backup kecuali yang berawalan huruf 'A'
rm [!A]*.bak

# Pilih file yang diawali karakter bukan huruf vokal
ls [!aiueo]*.txt
```

---

## ⚡ 7. Magic Brace Expansion ({...}): Membuat Deret & Matriks Otomatis

*Brace Expansion* (`{}`) bukan pencari file, melainkan **generator string otomatis** yang diekspansi oleh Bash.

### 1. Menghasilkan Deret Angka dan Abjad (`..`)

```bash
# Membuat 10 folder secara instan: bab-1 sampai bab-10
mkdir bab-{1..10}

# Menghasilkan deret huruf dari a sampai z
echo {a..z}
```

### 2. Multi-Ekstensi / Multi-Target

```bash
# Backup file dengan menambahkan ekstensi .bak tanpa menulis ulang nama file
cp nginx.conf{,.bak}
# Diekspansi menjadi: cp nginx.conf nginx.conf.bak

# Tampilkan beberapa ekstensi sekaligus
ls *.{jpg,png,gif}
```

### 3. Matriks Kombinasi

```bash
# Membuat struktur direktori proyek 2 cabang x 3 level sekaligus
mkdir -p proyek/{frontend,backend}/{src,dist,tests}
```

---

## ⚠️ 8. Jebakan Spasi Fatal pada rm

Kesalahan menambahkan spasi pada wildcard bisa berakibat **kehancuran total sistem berkas**!

### Perhatikan Perbedaan Maut Ini:

```bash
# ✅ AMAN: Menghapus semua file berakhiran .tmp di direktori saat ini
rm *.tmp

# 💥 BENCANA BESAR (Perhatikan ada SPASI setelah tanda bintang):
rm * .tmp
```

Mengapa bisa jadi bencana? Karena Bash menerjemahkannya sebagai **dua target terpisah**:
1. Hapus target pertama: `*` (artinya **HAPUS SEMUA BERKAS TANPA TERKECUALI!**).
2. Hapus target kedua: `.tmp`.

> [!WARNING]
> Sebelum menjalankan perintah penghapusan `rm *pola*`, selalu uji coba polanya terlebih dahulu menggunakan perintah `ls *pola*` untuk memastikan berkas yang terdeteksi sudah tepat!

---

## 📝 9. Rangkuman Materi Episode 8

- **Globbing / Wildcard**: Dijalankan dan diekspansi oleh Shell Bash sebelum perintah dieksekusi.
- **Karakter Penting**:
  - `*` : Karakter bebas dalam jumlah berapa pun (0 atau lebih).
  - `?` : Tepat satu karakter tunggal.
  - `[abc]` atau `[1-9]` : Satu karakter dari daftar kumpulan atau rentang nilai.
  - `[!abc]` : Satu karakter selain yang ada di dalam kurung.
- **Brace Expansion (`{}`)**: Generator deret angka/huruf (`{1..10}`) dan duplikasi string kilat (`file{,.bak}`).
- **Aturan Emas**: Selalu verifikasi seleksi wildcard dengan `ls` sebelum menghapus berkas dengan `rm`.

---

## 🛠️ 10. Tantangan Praktik Mandiri

Praktikkan keajaiban wildcard dan brace expansion di terminal Anda:

```bash
# 1. Buat direktori uji coba
mkdir -p ~/latihan_ep8 && cd ~/latihan_ep8

# 2. Buat puluhan file uji coba dalam 1 detik dengan brace expansion
touch data-{1..10}.txt laporan-{A..E}.pdf image-{1..5}.jpg

# 3. Tampilkan hanya file dengan angka genap (2, 4, 6, 8, 10)
ls data-[2468].txt data-10.txt

# 4. Tampilkan semua file PDF dan JPG saja
ls *.{pdf,jpg}

# 5. Bersihkan direktori latihan
cd ~ && rm -rf ~/latihan_ep8
```

---

## 🔜 11. Preview Episode 9

Pada episode berikutnya, kita akan membahas cara menjadi pengguna Linux mandiri tanpa perlu terus-menerus bertanya atau Googling: **Sistem Bantuan & Dokumentasi Linux**! Kita akan mengupas tuntas cara membaca manual resmi melalui `man`, mencari opsi cepat dengan `--help`, serta memahami perbedaan perintah internal vs eksternal dengan `type`.

Terima kasih sudah belajar bersama channel **Teknologi Newbie**! Jangan lupa Like, Subscribe, dan aktifkan lonceng notifikasinya. Sampai jumpa di Episode 9! 🐧
