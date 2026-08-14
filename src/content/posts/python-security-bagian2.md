---
title: "Membangun Port Scanner Kustom: Python untuk Security Bagian 2"
description: "Lanjutan seri Python untuk Security. Di artikel ini kita akan belajar mempraktekkan ilmu dasar Python dengan membuat port scanner kustom yang ringan dan cepat."
date: 2026-08-14T10:00:00Z
categories: ["security"]
featured: false
draft: false
image: "/images/post/post-2.png"
series: "Tutorial Python Security"
series_part: 2
---

Selamat datang di bagian kedua seri **Tutorial Python Security**! Setelah di artikel pertama kita membahas fundamental mengapa Python sangat cocok untuk otomatisasi keamanan siber, kini saatnya kita mulai **coding**.

Pada tutorial kali ini, kita akan membangun sebuah *Port Scanner* sederhana yang bisa Anda gunakan untuk memeriksa *port* mana saja yang terbuka pada sebuah target alamat IP.

## Apa itu Port Scanner?

*Port scanner* adalah perangkat lunak yang dirancang untuk menyelidiki server atau host dan mencari tahu port mana saja yang terbuka (mendengarkan koneksi masuk). Ini adalah alat dasar yang digunakan baik oleh *Network Administrator* untuk mengecek keamanan jaringan mereka, maupun oleh *Penetration Tester* untuk mencari celah masuk (kerentanan).

Walaupun sudah ada *tools* hebat seperti Nmap, membangun *port scanner* sendiri adalah latihan yang luar biasa untuk memahami konsep jaringan, *socket*, dan otomatisasi dengan Python.

## Persiapan Lingkungan

Karena kita menggunakan modul bawaan Python, Anda tidak perlu menginstal pustaka eksternal pihak ketiga (seperti `pip install`). Cukup pastikan Python versi 3 sudah terinstal di komputer Anda.

Buka terminal/CMD Anda dan buat sebuah file baru bernama `port_scanner.py`.

## Menulis Kode Port Scanner

Mari kita buat *script*-nya. Kita akan menggunakan library bawaan `socket`.

```python
import socket
import threading
from datetime import datetime

# Masukkan target
target = input("Masukkan alamat IP target: ")

# Fungsi untuk memindai port
def scan_port(port):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        socket.setdefaulttimeout(1)
        
        # Mengecek apakah koneksi berhasil (0) atau error
        result = s.connect_ex((target, port))
        
        if result == 0:
            print(f"Port {port} terbuka!")
            
        s.close()
    except Exception as e:
        pass

print("-" * 50)
print(f"Memulai scanning target: {target}")
print(f"Waktu mulai: {str(datetime.now())}")
print("-" * 50)

# Memindai port 1 hingga 1024
for port in range(1, 1025):
    thread = threading.Thread(target=scan_port, args=(port,))
    thread.start()
```

### Penjelasan Kode

1. **`import socket`**: Modul yang memungkinkan kita membuat komunikasi jaringan tingkat rendah. Kita menggunakannya untuk mencoba terhubung ke *port* target.
2. **`import threading`**: Proses memindai ribuan *port* satu per satu (sekuensial) sangatlah lambat. Dengan modul `threading`, kita membuat ratusan proses berjalan bersamaan secara paralel.
3. **`s.connect_ex()`**: Ini adalah inti dari pemindai. Berbeda dengan `s.connect()` yang akan membuang *error* jika gagal, `connect_ex` mengembalikan angka `0` jika berhasil tersambung, atau kode *error* jika *port* tertutup.
4. **Timeout**: `socket.setdefaulttimeout(1)` sangat penting. Jika *port* memblokir koneksi dan tidak merespon, *script* tidak akan menggantung (hang) dan hanya akan menunggu maksimal 1 detik.

## Menguji Port Scanner

Jalankan script Anda dengan:

```bash
python port_scanner.py
```

Cobalah masukkan alamat IP router lokal Anda (biasanya `192.168.1.1` atau `192.168.0.1`), atau cobalah alamat IP lokal (localhost) Anda sendiri. 

> [!CAUTION]
> **Peringatan Penting:** Anda dilarang keras melakukan *port scanning* terhadap server atau infrastruktur publik yang tidak Anda miliki, atau tanpa izin eksplisit. Hal tersebut merupakan tindakan ilegal! Gunakan *script* ini hanya pada lingkungan *testing* milik Anda sendiri.

## Kesimpulan

Selamat, Anda baru saja membuat *tools cybersecurity* pertama Anda dengan Python! Meski sangat sederhana, fondasi yang digunakan dalam kode ini sama dengan prinsip dasar dari *scanner* jaringan canggih.

Di seri selanjutnya (Bagian 3), kita akan membahas cara memanfaatkan Python untuk melakukan **Web Scraping dan Analisis Kerentanan Website**. Sampai jumpa!
