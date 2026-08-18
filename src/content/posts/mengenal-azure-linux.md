---
title: 'Panduan Lengkap Azure Linux: Pengenalan dan Instalasi di VirtualBox'
meta_title: Tutorial Instalasi Azure Linux Microsoft di VirtualBox
description: 'Panduan komprehensif membahas fitur utama Azure Linux, arsitektur, dan tutorial instalasi step-by-step menggunakan mesin virtual (VirtualBox).'
date: 2026-08-16T15:00:00.000Z
image: /images/azure-linux.jpg
categories:
  - Linux
  - Cloud
  - Tutorial
featured: true
draft: false
series: Eksperimen Sistem Operasi
series_part: 1
---

Pernahkah Anda membayangkan hari di mana raksasa pembuat Windows, **Microsoft**, akhirnya merilis sistem operasi Linux mereka sendiri?

Jika dulu terdengar seperti lelucon, hari ini hal tersebut adalah kenyataan. Selamat datang di era keterbukaan Microsoft! Mari kita membedah lebih dalam mengenai **Azure Linux** dan bagaimana cara menginstalnya.

> \[!NOTE]
> Azure Linux sebelumnya dikenal dengan nama **CBL-Mariner** (Common Base Linux). Microsoft mengubah namanya pada tahun 2023 agar lebih selaras dengan ekosistem komputasi awan mereka.

## 1. Apa itu Azure Linux?

**Azure Linux** adalah distribusi Linux yang dikembangkan, dipelihara, dan didistribusikan langsung oleh Microsoft. Namun, jangan salah sangka! Sistem operasi ini **tidak didesain untuk menggantikan Windows di laptop Anda**.

Sistem ini diciptakan dengan satu tujuan utama: **Menjadi fondasi infrastruktur Cloud (Azure).**

Microsoft menggunakan Azure Linux secara internal untuk menjalankan layanan raksasa seperti *Azure Kubernetes Service (AKS)*, infrastruktur jaringan, hingga perangkat IoT (*Internet of Things*). Karena dirancang untuk *server*, OS ini tidak dilengkapi dengan antarmuka grafis (GUI) bawaan. Semuanya murni berbasis teks (CLI).

## 2. Fitur Utama Azure Linux

Sebagai OS kelas *Enterprise*, Azure Linux memiliki filosofi "Hanya sediakan apa yang benar-benar dibutuhkan".

### 🛡️ Keamanan Ekstrem (Secure by Default)

Sistem ini membuang semua paket perangkat lunak yang tidak perlu. Semakin sedikit *software* yang terinstal, semakin sedikit pula celah keamanan yang bisa diretas oleh *hacker*. Microsoft juga memberikan pembaruan keamanan (*patch*) secara instan.

### ⚡ Sangat Ringan & Cepat

Karena ukurannya yang super minimalis, Azure Linux bisa melakukan *booting* dalam hitungan detik. Ia sangat cocok dijadikan *container base image* (misal untuk Docker).

### 📦 Berbasis RPM (Keluarga Red Hat)

Jika Anda terbiasa dengan CentOS atau Fedora, Anda akan merasa betah di sini! Azure Linux menggunakan sistem manajemen paket berbasis RPM. Anda bisa menginstal aplikasi menggunakan perintah `tdnf` (versi super cepat dari `dnf`).

> \[!TIP]
> **Trik Cepat:** Perintah `tdnf install nama-aplikasi` fungsinya sama persis dengan `apt install` di Ubuntu atau `yum install` di CentOS.

## 3. Di Mana Mendapatkan Azure Linux?

Karena sifatnya yang *Open Source* (Sumber Terbuka), Microsoft membagikan kode sumber dan *file* ISO Azure Linux secara gratis di **GitHub**.

Anda bisa mengunduhnya langsung dari repositori resmi mereka:
**[github.com/microsoft/azurelinux](https://github.com/microsoft/azurelinux)**

Untuk pengguna biasa yang ingin bereksperimen, pastikan Anda menavigasi ke halaman *Releases* dan mencari file ber-ekstensi **`.iso`** (Pilih versi arsitektur `x86_64` untuk PC standar).

## 4. Persiapan Mesin Virtual (VirtualBox)

Mari kita lakukan eksperimen! Karena menginstal OS murni CLI langsung ke PC cukup berisiko bagi pemula, kita akan menggunakan **VirtualBox** sebagai mesin virtual.

1. Buka VirtualBox dan klik tombol **New**.
2. Pada bagian *Name and Operating System*:
   * Name: `Azure Linux Server`
   * Type: **Linux**
   * Version: **Other Linux (64-bit)**
3. Pada bagian *Hardware*, alokasikan RAM minimal **2GB (2048 MB)** dan CPU minimal **2 Core**.
4. Buat Virtual Hard Disk (VDI) dengan ukuran minimal **20GB** (disarankan *Dynamically allocated*).
5. Sebelum mesin dinyalakan, klik kanan pada mesin tersebut lalu pilih **Settings**.
   * Masuk ke **Storage**, klik ikon CD kosong, lalu cari dan masukkan file ISO Azure Linux yang sudah Anda unduh.
   * Masuk ke **Network**, ubah *Attached to* menjadi **Bridged Adapter** agar server Anda mendapatkan IP Address langsung dari *router* rumah Anda.

## 5. Proses Instalasi Azure Linux

Sekarang, jalankan (*Start*) mesin virtual Anda.

### Tahap 1: Menu Boot

Saat layar hitam pertama muncul, gunakan tombol panah atas/bawah di *keyboard* Anda untuk memilih **"Install Azure Linux"** dan tekan `Enter`.

### Tahap 2: Navigasi Installer

> \[!WARNING]
> Proses instalasi Azure Linux menggunakan *Text-mode Installer* (TUI). *Mouse* tidak dapat digunakan di sini! Gunakan tombol **Tab** untuk berpindah menu, tombol **Spasi** untuk mencentang, dan **Enter** untuk memilih.

1. **Pemilihan Mode Instalasi (Installation Type):**
   Sistem akan bertanya varian apa yang ingin diinstal. Pilih **Core** untuk server dasar yang sangat ringan, atau **Full** jika Anda membutuhkan kelengkapan alat-alat jaringan dan utilitas tambahan. (Sangat disarankan memilih **Core** untuk eksperimen awal).
2. **Partisi Disk (Disk Partitioning):**
   Pilih opsi **Erase and Install** (atau *Auto Partition*). Sistem akan otomatis memformat Virtual Hard Disk 20GB yang kita buat tadi dan mengatur strukturnya tanpa perlu campur tangan manual.
3. **Pembuatan Akun (Account Setup):**
   Sistem akan meminta Anda membuat kata sandi (*password*) untuk *user* `root`. Ketikkan kata sandi yang kuat dan mudah diingat. (Ingat: saat Anda mengetik, karakter tidak akan muncul di layar demi keamanan).

### Tahap 3: Penyelesaian

Setelah Anda mengkonfirmasi konfigurasi, proses ekstraksi *file* akan berjalan. Karena Azure Linux sangat ringan, proses ini biasanya selesai dalam waktu kurang dari 2 menit.
Setelah muncul notifikasi "Installation Complete", pilih **Reboot**.

*(Jangan lupa mencabut / me-remove ISO dari menu Storage VirtualBox agar tidak masuk ke menu instalasi lagi)*.

## 6. Uji Coba Pasca-Instalasi

Setelah mesin *restart*, Anda akan disambut oleh layar terminal hitam yang meminta *login*.

* Ketikkan *username*: `root`
* Ketikkan *password* yang Anda buat saat instalasi.

Untuk membuktikan bahwa Anda sedang berada di OS buatan Microsoft, jalankan perintah identifikasi sistem operasi ini:

```bash
cat /etc/os-release
```

Anda akan melihat *output* epik seperti ini:

```text
NAME="Azure Linux"
VERSION="2.0"
ID="azurelinux"
ID_LIKE="vmware-photon"
PRETTY_NAME="Azure Linux 2.0"
ANSI_COLOR="1;34"
HOME_URL="https://aka.ms/azurelinux"
BUG_REPORT_URL="https://aka.ms/azurelinux"
SUPPORT_URL="https://aka.ms/azurelinux"
```

Selanjutnya, pastikan server Anda sudah terhubung ke internet dengan melakukan *ping*:

```bash
ping -c 4 google.com
```

## Kesimpulan

Langkah Microsoft membuat Azure Linux adalah bukti nyata bahwa perseteruan antara "Windows vs Linux" sudah usai. Di dunia Cloud dan Server modern, **Linux adalah rajanya**, dan Microsoft dengan cerdas ikut menunggangi ombak tersebut.

> \[!IMPORTANT]
> **Tugas Praktik Anda:** Cobalah instal web server *Nginx* di dalam Azure Linux Anda menggunakan perintah `tdnf install nginx`, lalu nyalakan layanannya dengan `systemctl start nginx`. Buka *browser* di PC asli Anda dan ketikkan IP Address Azure Linux tersebut!

Selamat bereksperimen, dan sampai jumpa di seri eksperimen sistem operasi berikutnya! 🚀
