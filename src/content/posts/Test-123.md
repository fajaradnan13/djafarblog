---
title: "Panduan Lengkap Penulisan Artikel (Cheat Sheet)"
meta_title: "Cheat Sheet Markdown untuk Blog"
description: "Ini adalah artikel referensi (template) yang berisi semua format penulisan, mulai dari kode, daftar isi, hingga kotak peringatan."
date: 2026-08-16T12:00:00Z
image: "/images/image-placeholder.png"
categories:
  - Tutorial
featured: true
draft: false
series: "Panduan Penulis"
series_part: 1
---

Artikel ini adalah *Cheat Sheet* (Contekan) yang bisa Anda jadikan referensi (atau *copy-paste*) saat menulis artikel baru. Artikel ini berisi **semua fitur** yang didukung oleh sistem blog edukasi Anda!

## 1. Kotak Peringatan (Admonitions)

Gunakan fitur ini untuk menarik perhatian pembaca pada poin-poin krusial di tutorial Anda.

> [!NOTE]
> **Ini adalah Note (Catatan).** 
> Gunakan untuk memberikan informasi tambahan, konteks, atau referensi bacaan yang berguna tapi tidak kritis.

> [!TIP]
> **Ini adalah Tip (Tips/Trik).**
> Cocok untuk memberi tahu jalan pintas (*shortcut*), trik rahasia, atau cara yang lebih efisien untuk melakukan sesuatu.

> [!IMPORTANT]
> **Ini adalah Important (Penting).**
> Gunakan untuk informasi krusial yang HARUS dibaca agar siswa bisa memahami inti dari tutorial Anda.

> [!WARNING]
> **Ini adalah Warning (Peringatan).**
> Gunakan untuk memperingatkan pembaca tentang potensi masalah, konfigurasi yang sensitif, atau hal yang bisa menyebabkan *error*.

> [!CAUTION]
> **Ini adalah Caution (Awas/Bahaya!).**
> Gunakan khusus untuk tindakan destruktif, seperti menghapus database, memberikan akses *root*, atau mengekspos kredensial API.

## 2. Blok Kode (Code Blocks)

Blok kode di bawah ini sudah dilengkapi dengan sintaks warna cerdas dan tombol **Copy** otomatis!

### Kode Python Biasa
```python
import socket

def scan_port(ip, port):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((ip, port))
        if result == 0:
            print(f"Port {port} is Open! 🔓")
        sock.close()
    except Exception as e:
        print(f"Error: {e}")

# Memanggil fungsi
scan_port("192.168.1.1", 80)
```

### Perintah Terminal (Bash)
```bash
# Menjalankan script scanner
python3 scanner.py --target 10.10.10.1

# Memperbarui package npm
npm install -g npm@latest
```

## 3. Daftar (Lists) dan Teks (*Formatting*)

Anda bisa menggunakan berbagai format teks untuk merapikan penjelasan:

**Daftar Tidak Berurut (Bullet Points):**
* Memahami konsep jaringan dasar
* Mengetahui bahasa pemrograman Python
* Memiliki sistem operasi Linux (Opsional)

**Daftar Berurut (Numbered Lists):**
1. Langkah pertama adalah instalasi.
2. Langkah kedua adalah konfigurasi.
3. Langkah terakhir adalah eksekusi program.

Anda bisa membuat teks **Tebal (Bold)**, *Miring (Italic)*, atau teks kode tunggal (`sudo su`) di tengah kalimat.

## 4. Menyisipkan Gambar

Gambar akan otomatis dibuat responsif (menyesuaikan layar HP).

![Contoh Gambar Arsitektur](/images/image-placeholder.png)

## 5. Fitur Seri Artikel & Daftar Isi

* **Daftar Isi (TOC):** Semua Sub-judul (H2 dan H3) di artikel ini sudah otomatis masuk ke menu **Daftar Isi** di sebelah kanan (atau di tombol melayang pada HP).
* **Seri Artikel:** Gulir ke paling bawah halaman ini, dan Anda akan melihat kotak "Seri Artikel". Ini terjadi karena di `Frontmatter` (kode bagian paling atas artikel), kita mengisi field `series` dan `series_part`.
