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

Di episode sebelumnya, kita sudah menjalankan perintah `pwd` dan mendapat hasil seperti `/home/fajar`. Tapi pernahkah Anda bertanya: **kenapa bentuknya seperti itu? Apa arti garis miring-garis miring itu?**

Jawabannya ada di episode ini. Kita akan membedah **struktur filesystem Linux** — sebuah "peta" yang wajib Anda pahami sebelum mulai menjelajah dan bekerja di Linux.

> [!NOTE]
> Memahami filesystem adalah fondasi paling krusial di Linux. Tanpa ini, Anda akan sering tersesat saat mencari file konfigurasi, log, atau menjalankan program.

## 🎯 Apa yang Akan Kita Pelajari?

- Konsep "Pohon Terbalik" di Linux Filesystem
- Apa itu *Root Directory* (`/`)
- Fungsi setiap direktori utama: `/home`, `/etc`, `/var`, `/tmp`, `/usr`, `/bin`, dan lainnya
- Perbedaan *Absolute Path* dan *Relative Path*
- Filosofi unik Linux: *"Everything is a File"*

## Filosofi Pohon Terbalik

Di Windows, Anda terbiasa dengan konsep *drive letter*: `C:\`, `D:\`, `E:\`. Setiap partisi atau perangkat punya "huruf" sendiri.

Linux **tidak bekerja seperti itu.**

Di Linux, seluruh sistem dimulai dari **satu titik tunggal** yang disebut *Root Directory*, dilambangkan dengan garis miring: **`/`**

Dari titik ini, semua direktori bercabang ke bawah seperti akar pohon yang terbalik:

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
├── opt/
├── dev/
├── proc/
└── root/
```

Tidak peduli berapa banyak *hard disk* atau partisi yang Anda punya — semuanya "ditempelkan" (*mount*) ke dalam satu pohon direktori ini. Inilah yang membuat Linux terasa sangat teratur.

> [!TIP]
> Untuk melihat struktur pohon ini secara langsung di terminal Anda, coba jalankan perintah `tree -L 1 /`. Jika perintah `tree` belum terinstal, gunakan `ls -l /` sebagai alternatif.

## Mengenal Direktori-Direktori Utama

Sekarang mari kita "jalan-jalan" dan memahami fungsi setiap direktori penting di Linux.

### `/` — Root Directory

Ini adalah **titik awal dari segalanya**. Semua file dan direktori di Linux berada di bawah naungan `/`. Analoginya seperti *lobby* utama sebuah gedung — dari sini Anda bisa menuju ke lantai mana pun.

```bash
ls /
```

```text
bin  boot  dev  etc  home  lib  media  mnt  opt  proc  root  sbin  tmp  usr  var
```

### `/home` — Rumah Para User

Setiap *user* biasa di Linux memiliki sebuah "kamar pribadi" di dalam `/home`. Di sinilah semua *file* personal Anda disimpan: dokumen, unduhan, konfigurasi aplikasi, dan sebagainya.

```bash
ls /home
```

```text
fajar  admin  guest
```

Jika *username* Anda adalah `fajar`, maka rumah Anda ada di `/home/fajar`. Inilah yang dimaksud dengan simbol `~` (*tilde*) di prompt terminal — ia adalah singkatan dari *home directory* Anda.

```bash
echo ~
```

```text
/home/fajar
```

### `/etc` — Pusat Konfigurasi

**etc** sering disebut sebagai "otak konfigurasi" Linux. Di sinilah hampir semua *file* pengaturan sistem dan aplikasi disimpan. Butuh mengubah pengaturan jaringan? Ada di sini. Mau mengedit daftar *user*? Ada di sini juga.

Beberapa *file* penting di dalamnya:

| File | Fungsi |
|------|--------|
| `/etc/hostname` | Nama komputer Anda |
| `/etc/hosts` | Pemetaan nama domain ke IP Address |
| `/etc/passwd` | Daftar semua *user* di sistem |
| `/etc/fstab` | Konfigurasi partisi yang di-*mount* otomatis |
| `/etc/ssh/sshd_config` | Pengaturan *SSH server* |

```bash
cat /etc/hostname
```

```text
linux-server
```

> [!WARNING]
> Jangan sembarangan mengedit *file* di `/etc` tanpa memahami fungsinya! Kesalahan konfigurasi bisa membuat sistem tidak bisa *booting* atau layanan berhenti berjalan.

### `/var` — Data yang Selalu Berubah

**var** adalah singkatan dari *variable*. Direktori ini menyimpan data yang ukurannya terus berubah-ubah seiring waktu, seperti:

- **`/var/log`** — Semua *log* sistem dan aplikasi tersimpan di sini. Ini adalah tempat pertama yang Anda kunjungi saat melakukan *troubleshooting*.
- **`/var/www`** — Lokasi default *file* website (jika Anda menjalankan *web server*).
- **`/var/tmp`** — *File* sementara yang bertahan meskipun sistem di-*restart*.

```bash
ls /var/log
```

```text
auth.log  boot.log  dmesg  kern.log  syslog  wtmp
```

Nanti di episode-episode yang lebih lanjut, kita akan sering berkunjung ke `/var/log` untuk menganalisis apa yang terjadi di dalam sistem.

### `/tmp` — Tempat Sampah Sementara

Direktori ini adalah tempat menyimpan *file* sementara. Siapa pun bisa menulis di sini, dan **isinya akan dihapus otomatis** saat sistem di-*restart*.

Kapan `/tmp` berguna? Misalnya ketika Anda sedang mengunduh *file* besar dan butuh tempat untuk menyimpan sementara sebelum dipindahkan ke lokasi permanen.

```bash
ls /tmp
```

> [!TIP]
> Karena siapa saja bisa menulis ke `/tmp`, jangan pernah menyimpan data penting di sini. Anggap saja seperti *sticky note* — ditulis sebentar, lalu dibuang.

### `/usr` — Program dan Library

**usr** (*Unix System Resources*) adalah direktori besar yang menyimpan program-program yang diinstal oleh *user* atau *package manager*.

Struktur di dalamnya mirip dengan `/`:

| Direktori | Isi |
|-----------|-----|
| `/usr/bin` | Program-program umum (`python`, `git`, `vim`, dll.) |
| `/usr/sbin` | Program administrasi sistem |
| `/usr/lib` | *Library* yang dibutuhkan program |
| `/usr/local` | Program yang Anda instal secara manual (bukan dari *package manager*) |
| `/usr/share` | Data yang bisa dipakai bersama (dokumentasi, ikon, font, dll.) |

### `/bin` dan `/sbin` — Perintah Esensial

**`/bin`** menyimpan perintah-perintah dasar yang **wajib ada** agar sistem bisa berfungsi, seperti `ls`, `cp`, `mv`, `cat`, dan `mkdir`. Perintah-perintah di sini bisa dijalankan oleh semua *user*.

**`/sbin`** juga menyimpan perintah esensial, tapi khusus untuk **administrasi sistem** — seperti `fdisk`, `ifconfig`, dan `reboot`. Biasanya hanya *root* yang bisa menjalankannya.

```bash
ls /bin | head -10
```

```text
bash
cat
cp
date
echo
grep
ls
mkdir
mv
rm
```

### `/root` — Rumah Sang Admin

Jangan bingung antara `/` (*root directory*) dan `/root` (*root user's home*). Keduanya sangat berbeda!

- `/` adalah **titik awal** seluruh filesystem
- `/root` adalah **home directory** milik *user* `root` (administrator tertinggi)

Kenapa *root* tidak tinggal di `/home/root`? Karena di situasi darurat, partisi `/home` mungkin tidak bisa di-*mount*. Dengan menempatkan rumah *root* langsung di bawah `/`, administrator tetap bisa login dan memperbaiki sistem.

### `/dev` — Perangkat Keras

Di Linux, ada filosofi unik: **everything is a file** — termasuk perangkat keras! *Hard disk*, *keyboard*, *mouse*, bahkan *terminal* Anda, semuanya direpresentasikan sebagai *file* di dalam `/dev`.

| File | Perangkat |
|------|-----------|
| `/dev/sda` | *Hard disk* pertama |
| `/dev/sda1` | Partisi pertama di *hard disk* pertama |
| `/dev/tty` | Terminal Anda saat ini |
| `/dev/null` | "Lubang hitam" — semua data yang dikirim ke sini langsung hilang |
| `/dev/zero` | Sumber tak terbatas angka nol |

```bash
ls /dev/sda*
```

```text
/dev/sda  /dev/sda1  /dev/sda2
```

### `/proc` — Jendela ke Kernel

Ini adalah direktori yang sangat spesial. **`/proc` sebenarnya tidak ada di dalam hard disk Anda!** Ia adalah *virtual filesystem* yang dibuat oleh *kernel* Linux secara langsung di memori (RAM).

Isinya berupa informasi *real-time* tentang kondisi sistem: proses yang berjalan, penggunaan CPU, memori, dan sebagainya.

```bash
cat /proc/cpuinfo | head -5
```

```text
processor       : 0
vendor_id       : GenuineIntel
cpu family      : 6
model           : 142
model name      : Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz
```

## Absolute Path vs Relative Path

Ini konsep yang akan Anda pakai setiap hari di Linux. Ada dua cara untuk menunjuk lokasi sebuah *file* atau direktori:

### Absolute Path (Jalur Mutlak)

Selalu dimulai dari *root* (`/`) dan menuliskan jalur lengkap tanpa ada yang terlewat.

```text
/home/fajar/Documents/catatan.txt
```

Tidak peduli Anda sedang berada di direktori mana — *absolute path* selalu menunjuk ke lokasi yang sama.

### Relative Path (Jalur Relatif)

Ditulis relatif terhadap posisi Anda saat ini. Tidak diawali dengan `/`.

Contoh: jika saat ini Anda berada di `/home/fajar`:

```text
Documents/catatan.txt
```

Ini sama saja dengan `/home/fajar/Documents/catatan.txt`, tapi lebih singkat.

Ada dua simbol khusus yang sering dipakai di *relative path*:

| Simbol | Arti |
|--------|------|
| `.` (titik) | Direktori saat ini (*current directory*) |
| `..` (dua titik) | Direktori induk / satu level ke atas (*parent directory*) |

Contoh penggunaan:

```bash
# Jika kita di /home/fajar/Documents
cd ..       # Pindah ke /home/fajar
cd ../..    # Pindah ke /home
cd ./Music  # Pindah ke /home/fajar/Documents/Music
```

> [!NOTE]
> Kapan pakai yang mana? Gunakan **absolute path** ketika menulis *script* atau konfigurasi agar tidak ambigu. Gunakan **relative path** saat bekerja interaktif di terminal agar lebih cepat mengetik.

## Everything is a File

Ini adalah filosofi paling mendasar di Linux yang membedakannya dari sistem operasi lain:

**Di Linux, semuanya diperlakukan sebagai file.**

- Dokumen teks? File.
- Direktori? Sebenarnya juga *file* (tipe khusus yang berisi daftar *file* lain).
- Hard disk? File (di `/dev/sda`).
- Koneksi jaringan? File.
- Proses yang berjalan? File (di `/proc`).
- Bahkan layar terminal Anda? File (di `/dev/tty`).

Kenapa ini penting? Karena artinya Anda bisa menggunakan **perintah yang sama** untuk berinteraksi dengan berbagai hal. Perintah `cat` yang biasanya dipakai untuk membaca isi *file* teks, ternyata juga bisa dipakai untuk membaca informasi CPU dari `/proc/cpuinfo`.

Konsep ini mungkin terasa abstrak sekarang, tapi semakin dalam Anda belajar Linux, semakin Anda akan menghargai keeleganan desain ini.

## Kesimpulan

Di episode ini, kita sudah memetakan "rumah besar" bernama Linux Filesystem:

- Semua dimulai dari *Root Directory* (`/`) — satu titik awal untuk segalanya
- Setiap direktori punya peran spesifik: `/home` untuk *user*, `/etc` untuk konfigurasi, `/var` untuk data dinamis, `/tmp` untuk *file* sementara
- Ada dua cara menunjuk lokasi: **Absolute Path** (dari `/`) dan **Relative Path** (dari posisi saat ini)
- Linux menganut filosofi *"Everything is a File"* — dari dokumen hingga perangkat keras

> [!IMPORTANT]
> **Praktik Singkat:** Jalankan perintah `ls /` di terminal Anda, lalu coba masuk ke beberapa direktori yang sudah kita bahas: `ls /etc`, `ls /var/log`, `cat /etc/hostname`. Mulai biasakan diri Anda dengan "tata letak" rumah Linux ini.

Di episode berikutnya, kita akan mulai **bergerak** di dalam filesystem ini! Kita akan belajar navigasi direktori menggunakan perintah `cd`, dan memperdalam penggunaan `pwd` serta `ls` dengan berbagai *option* yang sangat berguna. Sampai jumpa! 🚀
