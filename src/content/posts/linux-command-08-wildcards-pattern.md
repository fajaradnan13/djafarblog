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

Bayangkan Anda baru saja selesai mengunduh 5.000 file dari server. Di dalam satu folder tersebut bercampur aduk antara foto `.jpg`, laporan keuangan `.pdf`, rekaman suara `.mp3`, dan file catatan `.log`.

Sekarang tugas Anda adalah: **Pindahkan semua laporan PDF tahun 2025 dan 2026 ke dalam folder arsip**.

Di antarmuka Windows atau macOS, Anda mungkin akan menghabiskan waktu berjam-jam menahan tombol `Ctrl` sambil mengeklik mouse satu per satu. Namun di dunia terminal Linux, tugas melelahkan tersebut bisa diselesaikan **hanya dalam 3 detik menggunakan satu baris perintah**.

Kunci dari kecepatan supranatural ini adalah **Wildcards** (sering disebut juga sebagai *Filename Expansion* atau *Globbing*).

---

## 🎯 Apa yang Akan Kita Pelajari?

1. **Konsep Globbing**: Bagaimana Shell menerjemahkan pola sebelum perintah dijalankan.
2. **Karakter Bintang (`*`)**: Mencocokkan nol, satu, atau banyak karakter tanpa batas.
3. **Karakter Tanda Tanya (`?`)**: Mencocokkan tepat satu karakter tunggal.
4. **Kurung Siku (`[...]`)**: Menyaring kumpulan karakter dan rentang nilai (*range*).
5. **Negasi Karakter (`[!...]`)**: Memilih semua berkas KECUALI pola tertentu.
6. **Kekuatan Sakti *Brace Expansion* (`{}`)**: Membuat urutan otomatis dan kombinasi matriks.
7. **Skenario Nyata**: Menertibkan folder unduhan yang berantakan dalam 3 tarikan napas.
8. **Jebakan Maut**: Kesalahan spasi pemula yang bisa menghapus seluruh file tanpa sengaja!

---

## 1. Rahasia di Balik Layar: Shell yang Bekerja

Sebelum kita menggunakan simbol-simbolnya, ada satu fakta krusial yang harus Anda pahami:

> **Perintah seperti `ls`, `cp`, atau `rm` sama sekali tidak tahu apa arti tanda bintang `*`.**

Ketika Anda mengetik:

```bash
ls *.txt
```

Bukan program `ls` yang mencari file teks, melainkan **Shell (Bash)** Anda!
1. Shell memindai direktori saat ini.
2. Shell mencari semua file yang cocok dengan pola `*.txt`.
3. Shell mengganti tulisan `*.txt` dengan daftar nama file yang ditemukan: `ls catatan.txt data.txt tugas.txt`.
4. Baru kemudian perintah `ls` dieksekusi.

Konsep ini sangat penting agar Anda paham mengapa trik wildcard ini bisa bekerja di **hampir semua perintah Linux apa pun!**

---

## 2. Karakter Bintang (`*`): Si Pemangsa Serakah

Tanda bintang **`*`** adalah wildcard yang paling sering digunakan. Ia mewakili **nol, satu, atau sebanyak apa pun karakter**.

### 1. Mencocokkan Berdasarkan Ekstensi File

```bash
# Menampilkan semua file yang berakhiran .log
ls *.log

# Menyalin semua gambar .png ke folder backup
cp *.png /backup/gambar/
```

### 2. Mencocokkan Berdasarkan Awalan Nama

```bash
# Menghapus semua file sementara yang diawali kata "temp_"
rm temp_*
```

### 3. Mencocokkan Kata di Bagian Tengah

```bash
# Mencari file apa pun yang mengandung kata "laporan" di namanya
ls *laporan*
```

Pola di atas akan mencocokkan `laporan_keuangan.xlsx`, `final_laporan_revisi.docx`, maupun `laporan.txt`.

---

## 3. Karakter Tanda Tanya (`?`): Presisi Satu Karakter

Jika tanda bintang `*` rakus menelan berapa pun jumlah karakter, maka tanda tanya **`?`** bertindak sangat presisi: **ia hanya mewakili TEPAT SATU karakter apa pun**.

Misalnya Anda memiliki file:
- `bab1.md`
- `bab2.md`
- `bab10.md`
- `bab11.md`

Jika Anda menjalankan:

```bash
ls bab?.md
```

Output:

```text
bab1.md  bab2.md
```

Perhatikan bahwa `bab10.md` dan `bab11.md` **tidak ikut terpilih**, karena angka `10` terdiri dari dua karakter, sedangkan tanda tanya `?` hanya mewakili satu karakter saja!

Contoh lain:

```bash
# Mencocokkan laporan tahun 2024, 2025, atau 2026
ls laporan_202?.pdf
```

---

## 4. Kurung Siku (`[...]`): Pilihan Spesifik & Rentang Nilai

Bagaimana jika Anda ingin memilih file tertentu, tetapi bukan sembarang karakter? Gunakan kurung siku **`[...]`**.

Ia hanya mencocokkan **satu karakter**, tetapi karakternya harus ada di dalam daftar kurung.

### 1. Daftar Karakter Eksplisit

```bash
# Hanya mencocokkan file gambar.png, gembir.png, atau gumbur.png
ls g[aeu]mb[aeu]r.png
```

### 2. Rentang Nilai (*Range*) dengan Tanda Minus `-`

Anda bisa menggunakan tanda minus untuk membuat rentang abjad atau angka:

```bash
# Memilih file bab1.md sampai bab5.md
ls bab[1-5].md

# Memilih file yang diawali huruf kapital A sampai Z
ls [A-Z]*
```

### 3. Negasi Karakter dengan Tanda Seru (`[!...]`)

Tambahkan tanda seru `!` di awal kurung untuk memilih karakter yang **BUKAN** anggota daftar:

```bash
# Menampilkan semua file bab, KECUALI bab 1, 2, dan 3
ls bab[!1-3].md
```

Output hanya akan menampilkan `bab4.md`, `bab5.md`, dan seterusnya.

---

## 5. Trik Tambahan: Kekuatan *Brace Expansion* (`{}`)

Meskipun secara teknis bukan bagian dari wildcard globbing, kurung kurawal **`{}`** adalah salah satu fitur paling disukai oleh sysadmin untuk menghasilkan string kombinasi.

### 1. Membuat Rentang Angka atau Huruf Otomatis

Butuh membuat 20 folder sekaligus untuk modul pelatihan?

```bash
mkdir modul_{01..20}
ls -d modul_*
```

Terminal akan membuatkan `modul_01`, `modul_02`, hingga `modul_20` secara serentak!

### 2. Kombinasi Matriks Berantai

```bash
touch data_{2024,2025,2026}_{Q1,Q2,Q3,Q4}.csv
ls data_*.csv | wc -l
```

Output:

```text
12
```

Dalam sekejap, 12 berkas laporan kuartal dari 3 tahun berbeda langsung tercipta sempurna.

---

## 🔄 Skenario Praktik: Menertibkan Folder Berantakan

Mari kita simulasikan kasus nyata merapikan direktori `unduhan/`:

```bash
# 1. Masuk ke direktori kerja
cd ~/unduhan

# 2. Buat folder klasifikasi sekaligus dengan brace expansion
mkdir -p {dokumen,gambar,arsip,log}

# 3. Pindahkan semua file PDF dan Word ke folder dokumen
mv *.{pdf,docx,xlsx} dokumen/

# 4. Pindahkan semua file gambar JPG dan PNG ke folder gambar
mv *.[jp][pn]g gambar/

# 5. Pindahkan file arsip zip dan tar ke folder arsip
mv *.{zip,tar.gz,tar} arsip/

# 6. Pindahkan semua log sistem ke folder log
mv *.log log/
```

Dalam waktu kurang dari 10 detik, ribuan berkas yang awalnya berserakan langsung tertata rapi di dalam kategorinya masing-masing.

---

## ⚠️ Peringatan Bahaya: Spasi Fatal yang Menghancurkan

Ada satu kesalahan klasik pemula yang telah menyebabkan banyak air mata programmer:

> **JANGAN PERNAH MENAMBAHKAN SPASI SETELAH TANDA BINTANG SAAT MENGHAPUS!**

Bandingkan dua perintah ini:

```bash
# ✅ BENAR (Hanya menghapus file yang berakhiran .tmp):
rm *.tmp

# 💀 BENCANA TOTAL (Perhatikan ada SPASI setelah tanda bintang):
rm * .tmp
```

Mengapa berbahaya?
Karena ada spasi, Shell memecah perintah di atas menjadi dua argumen:
1. `rm *` (Artinya: **Hapus SEMUA file apa pun yang ada di dalam folder ini!**)
2. `.tmp` (Lalu hapus file bernama `.tmp` jika ada).

Akibat satu ketukan tombol spasi yang tidak disengaja, seluruh file proyek Anda bisa lenyap dalam sekejap.

> [!TIP]
> **Aturan Emas Pemula:**
> Jika Anda ragu sebelum menjalankan `rm [pola]`, gantilah kata `rm` dengan `ls` terlebih dahulu:
> ```bash
> ls *.tmp
> ```
> Jika daftar file yang muncul di layar sudah benar-benar sesuai dengan yang ingin Anda hapus, barulah ganti kembali perintahnya menjadi `rm *.tmp`.

---

## 📝 Cheatsheet Episode 8

| Pola Wildcard | Arti & Kecocokan | Contoh Nyata |
|:---:|:---|:---|
| **`*`** | Nol atau banyak karakter apa pun | `*.sh` (Semua file shell script) |
| **`?`** | Tepat 1 karakter apa pun | `app_v?.tar` (app_v1.tar, app_v2.tar) |
| **`[abc]`** | Satu karakter dari daftar | `file[123].txt` |
| **`[a-z]`** | Satu karakter dalam rentang huruf kecil | `[a-z]*.txt` |
| **`[0-9]`** | Satu angka antara 0 sampai 9 | `log_[0-9][0-9].txt` |
| **`[!abc]`** | Satu karakter yang BUKAN anggota | `[!0-9]*` (Bukan diawali angka) |
| **`{A,B}`** | Ekspansi teks alternatif | `cp file.{conf,conf.bak}` |
| **`{1..10}`** | Ekspansi deret urutan | `mkdir bab_{1..10}` |

---

## 🔜 Preview Episode 9

Sekarang kita sudah menguasai banyak sekali perintah: `cd`, `ls`, `mkdir`, `cp`, `mv`, `rm`, `cat`, `less`, `echo`, `nano`, redirection `>`, pipeline `|`, hingga wildcard `*`.

Namun, seorang master Linux bukanlah orang yang **menghafal mati ratusan opsi perintah**. 

Seorang master Linux adalah orang yang **tahu cara mencari tahu sendiri ketika dia lupa!**

Di **Episode 9**, kita akan mempelajari instrumen penyelamat terlengkap di Linux: **Sistem Dokumentasi Mandiri (`man`, `--help`, `info`, `type`, dan `which`)**. Anda tidak akan pernah lagi merasa tersesat di dalam terminal!

Sampai jumpa di Episode 9! 🐧
