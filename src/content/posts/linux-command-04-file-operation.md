---
title: "Linux Command #04: Operasi File & Direktori dengan touch, mkdir, cp, mv, dan rm"
meta_title: "Panduan Operasi File Linux: touch, mkdir, cp, mv, dan rm Lengkap"
description: "Pelajari cara membuat file dan folder, menyalin (copy), memindahkan atau mengganti nama (move/rename), hingga menghapus berkas secara aman di terminal Linux."
date: 2026-09-19T15:00:00Z
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

Di tiga episode awal, kita sudah berkenalan dengan terminal, memahami peta denah sistem (*filesystem*), dan belajar cara berjalan-jalan menjelajah setiap sudut ruangan direktori dengan `cd`, `pwd`, dan `ls`.

Namun, selama ini kita baru sebatas **turis yang melihat-lihat**.

Sekarang, saatnya kita menjadi **arsitek dan pengelola ruangan tersebut**. Di episode ini, kita akan mulai meletakkan dokumen baru, membuat map kerja, memfotokopi data penting, merapikan berkas ke laci lain, hingga membuang sampah yang sudah tidak diperlukan.

Semua pekerjaan inti manajemen file sehari-hari di Linux berpusat pada lima perintah sakti: **`touch`**, **`mkdir`**, **`cp`**, **`mv`**, dan **`rm`**.

> [!NOTE]
> Sama seperti episode sebelumnya, saya sangat menyarankan Anda membuka jendela terminal Linux dan langsung mengetikkan setiap perintah yang kita pelajari. Ingatan di jari (*muscle memory*) jauh lebih awet daripada sekadar membaca!

---

## 🎯 Apa yang Akan Kita Pelajari?

Di Episode 4 ini, kita akan membedah secara tuntas:

1. **`touch`**: Membuat file kosong dan filosofi di balik namanya.
2. **`mkdir`**: Membuat folder tunggal dan folder bertingkat sekaligus (`-p`).
3. **`cp`**: Menyalin file, folder rekursif (`-r`), dan mencegah insiden tertimpa (`-i`).
4. **`mv`**: Mengapa *pindah* dan *rename* menggunakan perintah yang sama.
5. **`rm`**: Menghapus file, menghapus folder, dan mitos horor `rm -rf`.
6. **Skenario Nyata**: Simulasi mengelola file proyek dari awal hingga bersih.
7. **Pro Tip**: Trik pintas para sysadmin profesional yang jarang ada di buku teks.

---

## 1. Membuat Berkas Baru dengan `touch`

Cara paling cepat untuk membuat sebuah berkas baru yang masih kosong adalah dengan perintah `touch`.

Sintaksnya sangat sederhana:

```bash
touch [nama_file]
```

Mari kita buat sebuah file bernama `catatan.txt`:

```bash
touch catatan.txt
ls -l catatan.txt
```

Simulasi output terminal:

```text
-rw-r--r-- 1 fajar fajar 0 Oct 4 20:30 catatan.txt
```

Perhatikan angka `0` pada output di atas. Angka tersebut menunjukkan ukuran file (0 byte) karena file tersebut baru saja dibuat dan belum memiliki konten apa pun.

### Mengapa Namanya `touch` (Sentuh)?

Mungkin Anda bertanya: *“Kenapa bukan `create` atau `new`?”*

Di Unix dan Linux, fungsi asli perintah `touch` sebenarnya adalah **memperbarui waktu akses dan modifikasi (*timestamp*)** dari sebuah file tanpa mengubah isinya — seolah-olah sistem hanya "menyentuh" file tersebut.

Namun, jika file yang Anda "sentuh" belum ada di sistem, perintah ini otomatis membuatkannya untuk Anda. Karena sangat praktis dan cepat, sysadmin di seluruh dunia menjadikannya cara standar untuk membuat file kosong.

### Membuat Banyak File Sekaligus

Anda tidak perlu mengetikkan `touch` berulang kali. Cukup pisahkan dengan spasi:

```bash
touch bab1.md bab2.md bab3.md
ls
```

```text
bab1.md  bab2.md  bab3.md  catatan.txt
```

---

## 2. Membuat Direktori / Folder Baru dengan `mkdir`

Jika `touch` digunakan untuk membuat file, maka untuk membuat folder (direktori) kita menggunakan **`mkdir`** (*Make Directory*).

Sintaks:

```bash
mkdir [nama_direktori]
```

Contoh membuat folder bernama `proyek_web`:

```bash
mkdir proyek_web
ls -F
```

```text
bab1.md  bab2.md  bab3.md  catatan.txt  proyek_web/
```

> [!TIP]
> Tanda garis miring `/` di belakang `proyek_web/` muncul karena kita menggunakan opsi `-F` pada perintah `ls`, yang menandakan bahwa itu adalah sebuah direktori.

### Senjata Rahasia: Opsi `-p` (Parents)

Bayangkan Anda ingin membuat struktur folder bersarang (*nested folder*), misalnya `proyek/frontend/assets`. 

Jika Anda menjalankan:

```bash
mkdir proyek/frontend/assets
```

Terminal akan memprotes dengan pesan error:

```text
mkdir: cannot create directory 'proyek/frontend/assets': No such file or directory
```

Linux mengeluh karena folder `proyek` dan `frontend` belum ada. 

Solusinya adalah menambahkan opsi **`-p`** (*parents*). Opsi ini memerintahkan Linux untuk membuat seluruh rantai folder induknya sekaligus jika belum tersedia:

```bash
mkdir -p proyek/frontend/assets
ls -R proyek
```

```text
proyek:
frontend

proyek/frontend:
assets

proyek/frontend/assets:
```

Sekali perintah, tiga tingkat folder langsung tercipta rapi!

---

## 3. Menyalin Berkas dan Folder dengan `cp`

Untuk menduplikasi dokumen, kita menggunakan perintah **`cp`** (*Copy*).

Sintaks dasar:

```bash
cp [sumber] [tujuan]
```

### Menyalin File dengan Nama Baru

Misalnya kita ingin menduplikasi `catatan.txt` menjadi file backup bernama `catatan_backup.txt`:

```bash
cp catatan.txt catatan_backup.txt
ls catatan*.txt
```

```text
catatan.txt  catatan_backup.txt
```

### Menyalin File ke Folder Lain

Jika tujuannya adalah nama sebuah direktori, Linux akan meletakkan salinan file tersebut ke dalam direktori tujuan dengan nama yang sama:

```bash
cp catatan.txt proyek/
ls proyek/
```

```text
catatan.txt  frontend
```

### Wajib Tahu: Menyalin Folder Wajib Pakai Opsi `-r`

Ini adalah salah satu kesalahan paling umum bagi pemula di Linux. Coba salin folder tanpa opsi tambahan:

```bash
cp proyek proyek_cadangan
```

Terminal akan menolak:

```text
cp: -r not specified; omitting directory 'proyek'
```

Ingat filosofi episode 2: direktori di Linux berisi struktur pohon. Anda tidak bisa menyalin batangnya saja tanpa menyalin ranting dan daunnya.

Gunakan opsi **`-r`** (*recursive*) untuk menyalin folder beserta seluruh isi berkas dan sub-direktorinya:

```bash
cp -r proyek proyek_cadangan
ls -d proyek*
```

```text
proyek  proyek_cadangan
```

### Mencegah Tertimpa: Opsi `-i` (Interactive)

Secara default, jika file tujuan sudah ada, `cp` akan menimpanya (*overwrite*) tanpa memberi peringatan! Untuk mencegah kehilangan data yang tak disengaja, gunakan opsi **`-i`**:

```bash
cp -i catatan.txt catatan_backup.txt
```

Terminal akan meminta konfirmasi terlebih dahulu:

```text
cp: overwrite 'catatan_backup.txt'? 
```

Ketik `y` (yes) untuk melanjutkan, atau `n` (no) untuk membatalkan.

---

## 4. Memindahkan & Mengganti Nama dengan `mv`

Perintah **`mv`** (*Move*) memiliki peran ganda yang sangat menarik:
1. Memindahkan file/folder ke lokasi lain.
2. Mengganti nama (*rename*) file/folder.

Mengapa satu perintah bisa melakukan dua hal yang kelihatannya berbeda?

Di dalam sistem operasi Linux, "mengganti nama" sebenarnya hanyalah **memindahkan file ke alamat inode atau nama baru di dalam tabel direktori yang sama**.

Sintaks:

```bash
mv [sumber] [tujuan]
```

### 1. Mengganti Nama File (Rename)

Jika parameter kedua adalah nama file baru di direktori yang sama:

```bash
mv catatan.txt draft_artikel.txt
ls
```

File `catatan.txt` kini telah berganti nama menjadi `draft_artikel.txt`.

### 2. Memindahkan File ke Folder Lain

Jika parameter kedua adalah sebuah direktori:

```bash
mv draft_artikel.txt proyek/
ls proyek/
```

File berpindah tempat ke dalam folder `proyek/`.

### 3. Memindahkan Sekaligus Mengganti Nama

Kita juga bisa melakukan keduanya dalam satu tarikan napas:

```bash
mv bab1.md proyek/bab_pendahuluan.md
```

File `bab1.md` dipindahkan ke dalam folder `proyek` dan seketika berubah namanya menjadi `bab_pendahuluan.md`.

> [!NOTE]
> Berbeda dengan `cp`, saat memindahkan direktori menggunakan `mv`, Anda **tidak perlu** menambahkan opsi `-r`. Cukup `mv folder_lama folder_baru`.

---

## 5. Menghapus File dan Direktori dengan `rm`

Perintah **`rm`** (*Remove*) digunakan untuk membuang berkas.

> [!WARNING]
> Di terminal Linux, **TIDAK ADA FOLDER RECYCLE BIN ATAU TRASH!** Ketika Anda menekan `Enter` pada perintah `rm`, file tersebut akan langsung dihapus dari *filesystem index*. Sangat sulit (atau bahkan mustahil) untuk mengembalikannya tanpa software forensic khusus.

### Menghapus File Biasa

```bash
rm catatan_backup.txt
```

File langsung terhapus seketika tanpa peringatan.

### Menghapus Direktori: Opsi `-r`

Sama seperti `cp`, jika Anda mencoba menghapus folder menggunakan `rm` biasa:

```bash
rm proyek_cadangan
```

Terminal akan membalas:

```text
rm: cannot remove 'proyek_cadangan': Is a directory
```

Untuk menghapus folder beserta seluruh isinya, gunakan opsi rekursif:

```bash
rm -r proyek_cadangan
```

### Mitos & Kenyataan: Horor Perintah `rm -rf`

Anda mungkin sering melihat meme programmer tentang perintah keramat:

```bash
# JANGAN PERNAH DIJALANKAN!
sudo rm -rf /*
```

Mari kita bedah artinya agar tidak sekadar menjadi momok:
- **`rm`**: Hapus berkas.
- **`-r`**: Rekursif (seluruh folder dan sub-folder).
- **`-f`**: *Force* (paksa tanpa konfirmasi dan abaikan pesan error jika file tidak ada).
- **`/*`**: Mulai dari direktori *root* paling atas hingga seluruh sistem operasi!

Jika dieksekusi dengan akun administrator (`sudo`), perintah ini akan melenyapkan seluruh sistem operasi Linux Anda hingga server mati total. Distribusi Linux modern bahkan sudah menyematkan proteksi `--no-preserve-root` untuk mencegah kecelakaan fatal ini.

Sebagai pemula, biasakan menggunakan opsi **`-i`** (*interactive*) saat menghapus berkas penting:

```bash
rm -i bab*.md
```

Terminal akan menanyakan izin satu per satu sebelum menghapus setiap file.

---

## 🔄 Skenario Praktik Nyata

Mari kita simulasikan alur kerja seorang developer saat menyiapkan ruang kerja proyek baru di terminal.

```bash
# 1. Buat struktur folder proyek
mkdir -p blog-api/{src,config,logs}

# 2. Buat file-file awal
touch blog-api/src/index.js blog-api/config/database.json blog-api/README.md

# 3. Buat file catatan sementara di luar
touch temporary_notes.txt

# 4. Pindahkan catatan ke dalam proyek dengan nama baru
mv temporary_notes.txt blog-api/TODO.md

# 5. Buat salinan cadangan config
cp blog-api/config/database.json blog-api/config/database.json.bak

# 6. Lihat hasil kerja kita secara menyeluruh
ls -R blog-api
```

Simulasi hasil akhirnya:

```text
blog-api:
config  logs  README.md  src  TODO.md

blog-api/config:
database.json  database.json.bak

blog-api/logs:

blog-api/src:
index.js
```

Rapi, cepat, dan terstruktur tanpa sekali pun menyentuh mouse!

---

## ⚠️ Kesalahan Umum Pemula

| Kesalahan | Contoh Kasus | Solusi yang Tepat |
|:---|:---|:---|
| **Lupa Opsi Rekursif** | Menjalankan `cp folder1 folder2` atau `rm folder1` | Tambahkan opsi `-r` (`cp -r` atau `rm -r`). |
| **Spasi pada Nama File** | Mengetik `touch laporan tugas.docx` (malah membuat dua file terpisah: `laporan` dan `tugas.docx`) | Gunakan tanda kutip: `touch "laporan tugas.docx"` atau escape spasi: `touch laporan\ tugas.docx`. |
| **Tertimpa Tanpa Sadar** | Menjalankan `cp file.txt file_penting.txt` yang sudah ada | Gunakan opsi pencegah `-i` (`cp -i`). |
| **Terburu-buru Menghapus** | Asal mengetik `rm -rf *` di folder yang salah | Selalu jalankan `pwd` terlebih dahulu sebelum melakukan operasi penghapusan massal! |

---

## 💡 Pro Tip: Backup Kilat dengan *Brace Expansion*

Pernahkah Anda melihat seorang sysadmin senior membuat backup file konfigurasi dengan mengetik ini?

```bash
cp nginx.conf{,.bak}
```

Bagi pemula, sintaks `{,.bak}` tampak seperti mantra sihir. Padahal itu adalah fitur bawaan bash bernama **Brace Expansion**. Perintah di atas otomatis diterjemahkan oleh shell menjadi:

```bash
cp nginx.conf nginx.conf.bak
```

Anda tidak perlu mengetikkan nama file dua kali. Trik kecil ini akan menghemat banyak waktu ketika Anda mengelola server sehari-hari!

---

## 📝 Cheatsheet Episode 4

| Perintah | Opsi Favorit | Fungsi Utama |
|:---|:---:|:---|
| **`touch <file>`** | `-` | Membuat file kosong baru atau memperbarui timestamp. |
| **`mkdir <dir>`** | `-p` | Membuat direktori (opsi `-p` untuk membuat rantai folder induk). |
| **`cp <src> <dst>`** | `-r`, `-i` | Menyalin file atau folder (`-r` untuk direktori, `-i` untuk konfirmasi). |
| **`mv <src> <dst>`** | `-i` | Memindahkan berkas atau mengganti nama (*rename*). |
| **`rm <file>`** | `-r`, `-i`, `-f` | Menghapus berkas atau direktori (`-r` direktori, `-f` paksa). |

---

## 🔜 Preview Episode 5

Sekarang kita sudah mahir membuat, menata, menduplikasi, dan membuang file di Linux filesystem. Tapi tentu timbul pertanyaan baru:

> *"Bagaimana cara kita melihat apa isi di dalam file-file teks tersebut? Dan bagaimana cara mengubah isinya langsung dari terminal tanpa aplikasi GUI?"*

Di **Episode 5**, kita akan membedah perintah-perintah pembaca dan editor teks esensial: **`cat`**, **`less`**, **`echo`**, dan pengenalan text editor legendaris yang ramah pemula: **`nano`**.

Sampai jumpa di episode berikutnya, selamat bereksplorasi di terminal! 🐧
