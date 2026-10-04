---
title: "Linux Command #03: Navigasi Direktori dengan cd, pwd, dan ls"
meta_title: "Belajar Navigasi Direktori Linux: Perintah cd, pwd, dan ls Lengkap"
description: "Kuasai navigasi di Linux filesystem menggunakan perintah cd untuk berpindah direktori, pwd untuk mengetahui posisi, dan ls dengan berbagai option untuk menjelajah isi folder."
date: 2026-09-17T15:00:00Z
image: "/images/posts/linux-command-03-hero.jpg"
categories:
  - Linux
  - Tutorial
  - Command Line
featured: false
draft: false
series: "Linux Command Mastery"
series_part: 3
---

Di dua episode sebelumnya, kita sudah tahu siapa kita (`whoami`), di mana kita (`pwd`), dan apa isi tempat kita berada (`ls`). Sekarang saatnya **bergerak!**

Bayangkan Anda sudah punya peta gedung (*filesystem*), tapi selama ini hanya berdiri di *lobby*. Di episode ini, kita akan belajar **berjalan ke ruangan-ruangan lain** — naik tangga, turun lantai, bahkan melompat langsung ke ruangan tertentu.

Semua itu dilakukan dengan satu perintah andalan: **`cd`**.

> [!NOTE]
> Episode ini adalah episode paling praktikal sejauh ini. Saya sarankan Anda membuka terminal sambil membaca, lalu langsung ikuti setiap perintah yang diajarkan.

## 🎯 Apa yang Akan Kita Pelajari?

- Perintah `cd` dan semua variasinya
- Trik navigasi cepat yang jarang diajarkan
- Mendalami `ls` dengan *option-option* penting
- Memahami `pwd` lebih dalam
- Skenario navigasi dunia nyata

## Perintah `cd` — Change Directory

**cd** adalah singkatan dari ***Change Directory*** — perintah untuk berpindah dari satu direktori ke direktori lain.

Sintaksnya sangat sederhana:

```bash
cd [tujuan]
```

Mari kita mulai dari yang paling dasar.

### Pindah ke Direktori Tertentu

```bash
cd /var/log
```

Setelah menjalankan perintah di atas, coba cek posisi Anda:

```bash
pwd
```

```text
/var/log
```

Anda sekarang berada di `/var/log`. Sesederhana itu!

### Pindah ke Home Directory

Ada tiga cara untuk pulang ke "rumah" (*home directory*):

```bash
cd ~        # Cara 1: menggunakan tilde
cd $HOME    # Cara 2: menggunakan variabel environment
cd          # Cara 3: tanpa argumen apa pun
```

Ketiganya melakukan hal yang persis sama — membawa Anda kembali ke `/home/fajar` (atau *home directory* user Anda).

> [!TIP]
> Cara ketiga (`cd` tanpa argumen) adalah yang paling sering digunakan oleh administrator Linux karena paling cepat diketik. Cukup dua huruf, langsung pulang!

### Naik Satu Level ke Atas

Ingat simbol `..` dari episode sebelumnya? Di sinilah ia beraksi:

```bash
pwd
```

```text
/home/fajar/Documents
```

```bash
cd ..
pwd
```

```text
/home/fajar
```

Anda naik satu tingkat dari `Documents` ke `fajar`. Mau naik dua tingkat sekaligus?

```bash
cd ../..
pwd
```

```text
/home
```

Anda melompat dari `/home/fajar` langsung ke `/home`'s parent, yaitu `/`. Tapi tunggu, hasilnya `/home` — karena dari `/home/fajar`, naik satu jadi `/home`, naik satu lagi jadi `/`.

Mari kita perjelas dengan contoh lengkap:

```bash
cd /home/fajar/Documents   # Mulai dari sini
cd ..                       # → /home/fajar
cd ..                       # → /home
cd ..                       # → /
```

### Kembali ke Direktori Sebelumnya

Ini trik yang sangat berguna dan **jarang diajarkan** di tutorial lain:

```bash
cd -
```

Perintah ini membawa Anda kembali ke **direktori terakhir** yang Anda kunjungi sebelumnya. Seperti tombol "Back" di *browser*!

Contoh:

```bash
cd /var/log
cd /etc
cd -
pwd
```

```text
/var/log
```

Anda melompat dari `/var/log` ke `/etc`, lalu dengan `cd -` langsung kembali ke `/var/log`. Sangat praktis ketika Anda bolak-balik antara dua lokasi.

### Pindah ke Direktori dengan Spasi di Namanya

Ini jebakan klasik bagi pemula. Bagaimana kalau nama foldernya mengandung spasi?

```bash
cd My Documents    # ❌ Error! Linux mengira "My" dan "Documents" adalah dua argumen
```

Solusinya ada dua:

```bash
cd "My Documents"    # Cara 1: gunakan tanda kutip
cd My\ Documents     # Cara 2: gunakan backslash sebelum spasi
```

> [!WARNING]
> Hindari membuat direktori dengan spasi di namanya jika Anda bekerja di *server*. Gunakan *underscore* (`_`) atau *dash* (`-`) sebagai pengganti spasi, misalnya: `my_documents` atau `my-documents`.

## Mendalami `ls` — Melihat Isi Direktori

Di Episode 1, kita sudah berkenalan dengan `ls`. Sekarang mari kita pelajari *option-option* yang akan membuat Anda jauh lebih produktif.

### `ls -l` — Format Detail (Long Format)

```bash
ls -l /home/fajar
```

```text
total 32
drwxr-xr-x 2 fajar fajar 4096 Oct  4 10:00 Desktop
drwxr-xr-x 3 fajar fajar 4096 Oct  4 09:30 Documents
drwxr-xr-x 2 fajar fajar 4096 Oct  3 18:45 Downloads
-rw-r--r-- 1 fajar fajar  220 Sep 15 08:00 .bashrc
-rw-r--r-- 1 fajar fajar    0 Oct  4 10:15 catatan.txt
```

Setiap kolom punya arti:

| Kolom | Contoh | Arti |
|-------|--------|------|
| 1 | `drwxr-xr-x` | Tipe file + hak akses (*permission*) |
| 2 | `2` | Jumlah *hard link* |
| 3 | `fajar` | Pemilik (*owner*) |
| 4 | `fajar` | Grup (*group*) |
| 5 | `4096` | Ukuran dalam *byte* |
| 6 | `Oct 4 10:00` | Tanggal modifikasi terakhir |
| 7 | `Desktop` | Nama file/direktori |

Huruf pertama di kolom 1 menunjukkan **tipe**:
- `d` = direktori (*directory*)
- `-` = file biasa (*regular file*)
- `l` = *symbolic link* (pintasan)

### `ls -a` — Tampilkan Semua (Termasuk Tersembunyi)

```bash
ls -a
```

```text
.  ..  .bashrc  .profile  .ssh  Desktop  Documents  Downloads
```

Perhatikan file-file yang diawali titik (`.bashrc`, `.profile`, `.ssh`). Ini adalah *file tersembunyi* di Linux. Tanpa `-a`, file-file ini tidak akan muncul.

Dan dua entri spesial:
- `.` = direktori saat ini
- `..` = direktori induk (satu level di atas)

### `ls -lh` — Ukuran yang Mudah Dibaca

```bash
ls -lh /var/log
```

```text
-rw-r--r-- 1 root root  12K Oct  4 09:00 auth.log
-rw-r--r-- 1 root root 4.2M Oct  4 10:30 syslog
-rw-r--r-- 1 root root 890K Oct  3 23:59 kern.log
```

Huruf `h` di sini artinya *human-readable*. Alih-alih menampilkan angka mentah seperti `4398046`, ia menampilkan `4.2M` yang jauh lebih mudah dipahami.

### `ls -lt` — Urutkan Berdasarkan Waktu

```bash
ls -lt /var/log
```

File yang paling baru dimodifikasi akan muncul **paling atas**. Sangat berguna ketika Anda ingin tahu *file* mana yang baru saja berubah.

Mau dibalik? Tambahkan `r` (*reverse*):

```bash
ls -ltr /var/log
```

Sekarang yang paling baru ada di **paling bawah** — cocok untuk melihat kronologi perubahan.

### `ls -R` — Rekursif (Lihat Isi Subfolder)

```bash
ls -R /home/fajar/Documents
```

```text
/home/fajar/Documents:
catatan.txt  Projects

/home/fajar/Documents/Projects:
website  scripts
```

Perintah ini akan "menyelam" ke dalam setiap subfolder dan menampilkan isinya juga. Hati-hati menggunakan ini di direktori besar seperti `/` — outputnya bisa sangat panjang!

### Kombinasi Favorit

Dalam praktik sehari-hari, kombinasi yang paling sering digunakan adalah:

```bash
ls -la     # Semua file + detail (termasuk tersembunyi)
ls -lah    # Semua file + detail + ukuran human-readable
ls -ltr    # Detail + urut waktu terbaru di bawah
```

## Mendalami `pwd` — Print Working Directory

`pwd` terlihat sangat sederhana, tapi sebenarnya ia punya satu *option* yang cukup penting:

### `pwd -P` — Physical Path

```bash
pwd -P
```

Apa bedanya? Kadang di Linux, sebuah direktori sebenarnya adalah *symbolic link* (pintasan) ke lokasi lain. `pwd` biasa akan menampilkan jalur *link*-nya, sedangkan `pwd -P` menampilkan **jalur fisik yang sebenarnya**.

Contoh:

```bash
cd /usr/bin
pwd
```

```text
/usr/bin
```

```bash
pwd -P
```

```text
/usr/bin
```

Dalam kasus ini, keduanya sama karena `/usr/bin` bukan *symbolic link*. Tapi di server-server tertentu, Anda mungkin menemukan kasus di mana hasilnya berbeda — dan di situlah `pwd -P` berguna untuk mengetahui lokasi yang *sesungguhnya*.

## Skenario Dunia Nyata

Mari kita gabungkan semua yang sudah dipelajari dalam satu skenario yang realistis. Bayangkan Anda baru saja login ke sebuah *server* Linux dan diminta untuk mengecek *log* terbaru.

```bash
# 1. Cek siapa saya dan di mana saya
whoami
pwd

# 2. Pindah ke direktori log
cd /var/log

# 3. Lihat file log terbaru
ls -ltr

# 4. Hmm, saya perlu cek konfigurasi juga
cd /etc
ls -la

# 5. Balik lagi ke log
cd -

# 6. Selesai, pulang ke rumah
cd
```

Perhatikan bagaimana setiap perintah saling melengkapi. Ini adalah pola kerja harian seorang administrator Linux — **navigasi, observasi, navigasi lagi**.

## Kesalahan Umum Saat Navigasi

**1. Salah ketik nama direktori**

```bash
cd /var/lgo    # ❌ Typo! Seharusnya "log"
```

```text
bash: cd: /var/lgo: No such file or directory
```

Solusi: gunakan tombol **Tab** untuk *auto-complete*. Ketik `cd /var/lo` lalu tekan `Tab`, dan shell akan melengkapinya menjadi `cd /var/log` secara otomatis.

**2. Lupa bahwa Linux *case-sensitive***

```bash
cd /Home/Fajar    # ❌ Huruf besar!
cd /home/fajar    # ✅ Benar
```

**3. Mencoba masuk ke file, bukan direktori**

```bash
cd /etc/hostname    # ❌ Itu file, bukan direktori!
```

```text
bash: cd: /etc/hostname: Not a directory
```

> [!TIP]
> **Trik Tab Completion:** Ini adalah senjata rahasia yang *wajib* Anda kuasai. Saat mengetik path, tekan `Tab` untuk melengkapi otomatis. Tekan `Tab` dua kali untuk melihat semua opsi yang tersedia. Kebiasaan ini akan menghemat banyak waktu dan mengurangi *typo*.

## Kesimpulan

Di episode ini, kita sudah menguasai seni navigasi di Linux:

- **`cd [tujuan]`** — berpindah ke direktori tujuan
- **`cd ..`** — naik satu level ke atas
- **`cd ~`** atau **`cd`** — pulang ke *home directory*
- **`cd -`** — kembali ke direktori sebelumnya (seperti tombol "Back")
- **`ls -la`**, **`ls -lh`**, **`ls -ltr`** — melihat isi direktori dengan berbagai perspektif
- **Tab Completion** — senjata rahasia untuk navigasi cepat tanpa *typo*

> [!IMPORTANT]
> **Praktik Singkat:** Coba "jalan-jalan" di filesystem Linux Anda. Kunjungi `/etc`, `/var/log`, `/usr/bin`, lalu kembali ke *home* menggunakan `cd`. Gunakan `pwd` setiap kali berpindah untuk memastikan posisi Anda. Biasakan menggunakan tombol `Tab` saat mengetik path!

Di episode berikutnya, kita akan mulai **bekerja dengan file** — membuat, menyalin, memindahkan, dan menghapus file menggunakan perintah `touch`, `cp`, `mv`, dan `rm`. Ini adalah skill dasar yang akan Anda gunakan setiap hari sebagai pengguna Linux. Sampai jumpa! 🚀
