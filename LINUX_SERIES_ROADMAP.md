# 🐧 Roadmap Seri Artikel: Linux Command Mastery

Dokumen ini adalah panduan, pelacak progres, dan kerangka silabus lengkap untuk seluruh seri konten **Linux Command Mastery** pada [djafarblog](file:///c:/Users/IISM032430/Documents/djafarblog). 

Dokumen ini berfungsi sebagai acuan tunggal agar setiap episode konsisten dari segi gaya bahasa (pengajaran YouTube & Slide Mode), metadata frontmatter, dan alur kurikulum.

---

## 🧭 Standar "DNA" Penulisan Episode

Setiap artikel ditulis dengan prinsip:
1. **Gaya Bahasa**: Santai, komunikatif, dan interaktif seperti sedang mengajar di kelas / membuat video YouTube edukasi (bukan dokumentasi teknis kaku).
2. **Kesesuaian Slide Mode**: Pembagian heading (`##` dan `###`) serta poin-poin dibuat ringkas dan padat visual agar nyaman ketika dibuka menggunakan fitur *Slide Presentation Mode* blog.
3. **Praktik Langsung Terintegrasi**: Contoh perintah langsung disandingkan dengan simulasi output terminal (`text`) dan analisis *"apa artinya"*.
4. **Struktur Konten**:
   - **Hook Pembuka**: Analogi dunia nyata atau masalah umum yang dihadapi pengguna.
   - **🎯 Apa yang Akan Kita Pelajari?**: Checklist poin bahasan materi.
   - **Konsep Inti**: Penjelasan logika di balik perintah.
   - **Command, Sintaks & Contoh Nyata**: Penjelasan opsi-opsi penting dan studi kasus.
   - **⚠️ Kesalahan Umum Pemula**: Jebakan typo, case-sensitivity, atau permission error.
   - **💡 Pro Tip**: Shortcut, trik navigasi cepat (seperti Tab completion).
   - **Kesimpulan**: Rangkuman 2-3 kalimat inti.
   - **Preview Episode Berikutnya**: Jembatan menuju materi episode selanjutnya.

### Template Metadata Frontmatter
```yaml
---
title: "Linux Command #XX: [Judul Menarik & Jelas]"
meta_title: "[Judul SEO / Pencarian]"
description: "[Deskripsi ringkas 1-2 kalimat menarik]"
date: YYYY-MM-DDT15:00:00Z
image: "/images/posts/linux-command-XX-hero.jpg"
categories:
  - Linux
  - Tutorial
  - Command Line
featured: false
draft: false
series: "Linux Command Mastery"
series_part: XX
---
```

---

## 📊 Status Progres Ringkas

- **Total Seri Direncanakan**: 11 Level (~125 Episode)
- **Sudah Terbit (Live)**: 5 Episode (Level 1)
- **Sedang / Akan Dikerjakan**: Episode 6 — *I/O Redirection (`>`, `>>`, `<`, `2>`)*

---

## 📚 Silabus & Pelacak Episode

### 🟢 Level 1 — Linux Fundamentals

Fokus: Fondasi awal terminal, filesystem, navigasi, operasi file, dan perintah esensial pemula.

| No | Judul / Topik | Status | File Sumber |
|:---|:---|:---:|:---|
| 01 | **Berkenalan dengan Terminal Linux**<br>*(Apa itu Linux/Terminal/Shell, Mengapa CLI, Struktur Command, `whoami`, `pwd`, `ls`, Membaca Prompt)* | ✅ Selesai | [linux-command-01-berkenalan-dengan-terminal.md](file:///c:/Users/IISM032430/Documents/djafarblog/src/content/posts/linux-command-01-berkenalan-dengan-terminal.md) |
| 02 | **Memahami Struktur Filesystem Linux**<br>*(Filosofi Inverted Tree, Tour Direktori `/`, `/home`, `/etc`, `/var`, `/tmp`, dll, Absolute vs Relative Path, Everything is a file)* | ✅ Selesai | [linux-command-02-memahami-filesystem.md](file:///c:/Users/IISM032430/Documents/djafarblog/src/content/posts/linux-command-02-memahami-filesystem.md) |
| 03 | **Navigasi Direktori dengan `cd`, `pwd`, dan `ls`**<br>*(Kuasai `cd`, `cd ~`, `cd ..`, `cd -`, `ls -lah`, `pwd -P`, Tab completion, skenario jalan-jalan di server)* | ✅ Selesai | [linux-command-03-navigasi-direktori.md](file:///c:/Users/IISM032430/Documents/djafarblog/src/content/posts/linux-command-03-navigasi-direktori.md) |
| 04 | **File Operation dengan `touch`, `cp`, `mv`, dan `rm`**<br>*(Membuat file kosong, copy file/direktori `-r`, rename/pindah file, hapus aman & bahaya `rm -rf`)* | ✅ Selesai | [linux-command-04-file-operation.md](file:///c:/Users/IISM032430/Documents/djafarblog/src/content/posts/linux-command-04-file-operation.md) |
| 05 | **Membuat & Membaca Isi File: `cat`, `less`, `echo`, `nano`**<br>*(Membaca file cepat dengan `cat`, paging dengan `less`, input sederhana dengan `echo`, editing dasar dengan `nano`)* | ✅ Selesai | [linux-command-05-membaca-membuat-file.md](file:///c:/Users/IISM032430/Documents/djafarblog/src/content/posts/linux-command-05-membaca-membuat-file.md) |
| 06 | **I/O Redirection: Mengarahkan Output & Input (`>`, `>>`, `<`, `2>`)**<br>*(Standard Output, Standard Error, Append vs Overwrite, Null device `/dev/null`)* | ⏳ **Next** | `src/content/posts/linux-command-06-io-redirection.md` |
| 07 | **Kekuatan Linux Pipe (`\|`): Menghubungkan Antar Perintah**<br>*(Filosofi Unix, menggabungkan perintah kecil menjadi satu pipeline dahsyat)* | 📋 Rencana | `src/content/posts/linux-command-07-linux-pipe.md` |
| 08 | **Wildcards dan Pattern Matching: Seleksi File Kilat**<br>*(Karakter `*`, `?`, `[a-z]`, kurung kurawal `{}` untuk efisiensi kerja massal)* | 📋 Rencana | `src/content/posts/linux-command-08-wildcards-pattern.md` |
| 09 | **Mencari Bantuan Sendiri: `man`, `--help`, `info`, `type`, `which`**<br>*(Cara membaca dokumentasi bawaan Linux dan mengetahui asal suatu perintah)* | 📋 Rencana | `src/content/posts/linux-command-09-command-help.md` |
| 10 | **Rangkuman Level 1 & Mini Project: Linux File Management**<br>*(Studi kasus merapikan workspace dan simulasi pengelolaan file server nyata)* | 📋 Rencana | `src/content/posts/linux-command-10-mini-project-level-1.md` |

---

### 🟡 Level 2 — File & Text Processing

Fokus: Menjelajah isi file teks, pencarian data, regex, dan manipulasi log server.

- **11.** Mencari File Berdasarkan Nama & Atribut: Perintah `find`
- **12.** Filter & Pencarian Teks dengan `grep`
- **13.** Mengurutkan dan Menghitung Data: `sort`, `uniq`, dan `wc`
- **14.** Memotong & Menggabungkan Kolom: `cut`, `tr`, dan `paste`
- **15.** Melihat Bagian File: `head`, `tail`, dan `tail -f` untuk Log Monitoring
- **16.** Dasar Regular Expressions (Regex) di Terminal
- **17.** Pengolahan Teks Kolom Modern: Pengenalan `awk`
- **18.** Stream Editor: Edit Teks Otomatis dengan `sed`
- **19.** Menghubungkan Output ke Argumen dengan `xargs`
- **20.** **Mini Project Level 2**: Analisis Log Web Server (Mencari IP Pengunjung Terbanyak & Error HTTP)

---

### 🟠 Level 3 — User, Group & File Permission

Fokus: Hak akses multi-user, keamanan berkas, kepemilikan file, dan privilege.

- **21.** Konsep Multi-User & Group di Linux
- **22.** Identifikasi Pengguna: `whoami`, `id`, `who`, `w`
- **23.** Manajemen User: `useradd`, `usermod`, `userdel`, `/etc/passwd`
- **24.** Manajemen Group: `groupadd`, `gpasswd`, `/etc/group`
- **25.** Membaca Izin Berkas Linux (Read, Write, Execute: `rwx`)
- **26.** Mengubah Hak Akses dengan `chmod` (Metode Simbolik vs Numerik/Oktal)
- **27.** Mengubah Kepemilikan: `chown` dan `chgrp`
- **28.** Special Permissions: SUID, SGID, dan Sticky Bit
- **29.** Access Control List (ACL) untuk Hak Akses Lebih Fleksibel
- **30.** **Mini Project Level 3**: Mengatur Struktur Folder Kolaborasi Tim yang Aman

---

### 🔵 Level 4 — Process & System Monitoring

Fokus: Mengontrol aplikasi yang berjalan di background/foreground, monitoring resource, sinyal interupsi.

- **31.** Memahami Proses di Linux (PID, PPID, State)
- **32.** Memeriksa Proses Aktif dengan `ps`
- **33.** Monitoring Resource Realtime: `top` vs `htop`
- **34.** Menghentikan & Membunuh Proses: `kill`, `pkill`, `killall` (Sinyal SIGTERM vs SIGKILL)
- **35.** Background & Foreground Process: Simbol `&`
- **36.** Mengelola Job Terminal: `jobs`, `bg`, `fg`
- **37.** Menjalankan Proses Tahan Putus Koneksi dengan `nohup`
- **38.** Mengatur Prioritas CPU: `nice` dan `renice`
- **39.** Menjelajah Virtual Filesystem `/proc`
- **40.** **Mini Project Level 4**: Investigasi Proses Rakus CPU/RAM & Script Troubleshooting

---

### 🟣 Level 5 — Storage & Disk Management

Fokus: Kapasitas harddisk, partisi, mounting media, inode, dan pemecahan masalah disk penuh.

- **41.** Konsep Disk, Partisi, dan Filesystem di Linux
- **42.** Memeriksa Sisa Kapasitas Partisi: `df -h`
- **43.** Menemukan Folder yang Menghabiskan Ruang: `du -sh`
- **44.** Melihat Daftar Blok Storage dengan `lsblk`
- **45.** Memasang dan Melepas Media: `mount` dan `umount`
- **46.** Mengenal UUID Partisi dengan `blkid`
- **47.** Automount Saat Booting: Memahami `/etc/fstab`
- **48.** Memahami Inode (Apa yang Terjadi Jika Inode Penuh padahal Disk Masih Ada Ruang?)
- **49.** Simbolic Link vs Hard Link (`ln -s` vs `ln`)
- **50.** **Mini Project Level 5**: Investigasi dan Pemulihan Server yang Mengalami "Disk Full"

---

### 🌐 Level 6 — Networking & Remote Administration

Fokus: Konfigurasi jaringan, troubleshooting koneksi, transfer file, dan remote shell.

- **51.** Dasar Jaringan di Linux (Interface, Gateway, DNS)
- **52.** Cek IP & Interface dengan `ip addr` (Pengganti `ifconfig`)
- **53.** Routing Table dengan `ip route`
- **54.** Menguji Konektivitas dengan `ping`
- **55.** Melihat Port dan Koneksi Terbuka: `ss` (Pengganti modern `netstat`)
- **56.** Mengirim Request HTTP via Terminal dengan `curl`
- **57.** Mengunduh Berkas dari Internet dengan `wget`
- **58.** Analisis DNS Lookup dengan `dig` dan `nslookup`
- **59.** Melacak Rute Paket: `traceroute` dan `mtr`
- **60.** Pisau Lipat Jaringan: Perintah `nc` (Netcat)
- **61.** Remote Server Aman dengan `ssh` (Password vs SSH Key-Pair)
- **62.** Transfer File Antar Server: `scp` dan `rsync`
- **63.** **Mini Project Level 6**: Troubleshooting Server Web yang Tidak Bisa Diakses dari Luar

---

### ⚙️ Level 7 — Package & Service Management (Systemd)

Fokus: Menginstall software, update sistem, mengelola daemon/service, dan log systemd.

- **64.** Filosofi Paket Software Linux (Debian vs RHEL ecosystem)
- **65.** Manajemen Paket Debian/Ubuntu: `apt` dan `dpkg`
- **66.** Manajemen Paket RHEL/Rocky/Fedora: `dnf` dan `rpm`
- **67.** Mengatur Repository Sumber Paket
- **68.** Mengenal `systemd` sebagai Init System Modern
- **69.** Mengontrol Service: `systemctl` (start, stop, restart, status, enable, disable)
- **70.** Membaca Log Sistem Terpusat dengan `journalctl`
- **71.** Membuat Unit Service Kustom (`my-app.service`)
- **72.** **Mini Project Level 7**: Deploy Nginx Web Server Otomatis Berjalan Saat Reboot

---

### 📜 Level 8 — Bash Scripting & Automation

Fokus: Otomasi tugas berulang menggunakan shell script dari dasar hingga tingkat lanjut.

- **73.** Menulis Bash Script Pertama (Shebang `#!/bin/bash`, Izin Eksekusi)
- **74.** Variabel dan Tipe Data di Bash
- **75.** Menerima Input Interaktif dari Pengguna (`read`)
- **76.** Percabangan Logika: Struktur `if-else` dan operator pembanding
- **77.** Percabangan Multi-Kondisi dengan `case`
- **78.** Perulangan: `for` dan `while` loop
- **79.** Modularisasi Kode dengan Function
- **80.** Exit Status (`$?`) dan Error Handling (`set -e`)
- **81.** Menggunakan Argumen Script (`$1`, `$@`, `$#`)
- **82.** Array di Bash Scripting
- **83.** Menjadwalkan Script Otomatis dengan `cron` dan `crontab`
- **84.** **Mini Project Level 8**: Script Backup Folder & Database Otomatis Harian

---

### 🚀 Level 9 — Advanced Linux & Deep Troubleshooting

Fokus: Shell expansion, trik command substitution, optimasi baris perintah, dan metodologi investigasi sistem.

- **85.** Environment Variable Sistem (`$PATH`, `$USER`, `$HOME`, `/etc/environment`)
- **86.** Shell Expansion & Brace Expansion
- **87.** Command Substitution: Sintaks `$(command)`
- **88.** Pencarian File Kompleks: Kombinasi `find -exec`
- **89.** Advanced `awk`: Format Laporan & Matematika Teks
- **90.** Advanced `sed`: Regex Replacement Multi-Line
- **91.** Process Substitution `<(command)`
- **92.** Menjalankan Perintah Paralel dengan `GNU Parallel` / Background loop
- **93.** Metodologi Investigasi Masalah Linux (Dari Kernel hingga Aplikasi)
- **94.** **Mini Project Level 9**: Final Sysadmin Challenge — Skenario Server Down

---

### 🛡️ Level 10 — Linux Security & Hardening

Fokus: Keamanan akses, audit aktivitas pengguna, investigasi indikasi penyusupan.

- **95.** Prinsip Keamanan Linux & Least Privilege
- **96.** Konfigurasi Sudoers Aman via `visudo`
- **97.** Hardening SSH (Ganti port, disable root password, fail2ban)
- **98.** Audit Login Pengguna: `last`, `lastb`, `who`
- **99.** Memeriksa Log Otentikasi: `/var/log/auth.log` atau `journalctl -u ssh`
- **100.** Mendeteksi Proses Mencurigakan dan Port Siluman
- **101.** Memeriksa Mekanisme Persistence (Crontab tak dikenal, Systemd rogue)
- **102.** **Mini Project Level 10**: Investigasi Insiden Keamanan pada Server Terkompromi

---

### 🐳 Level 11 — Linux for DevOps & Containerization

Fokus: Integrasi Linux dalam workflow modern DevOps, Git, Docker, dan deployment pipeline.

- **103.** Linux sebagai Fondasi DevOps Modern
- **104.** Menguasai Git CLI di Terminal
- **105.** Menyiapkan Environment Server Modern
- **106.** SSH Key Management untuk Server CI/CD
- **107.** Pengenalan Arsitektur Docker di Linux
- **108.** Perintah Docker CLI Esensial (`run`, `ps`, `stop`, `exec`)
- **109.** Memahami Image & Container Docker
- **110.** Docker Volume & Persistence di Filesystem Linux
- **111.** Docker Network: Bagaimana Container Berbicara satu sama lain
- **112.** Membaca Log Container dengan `docker logs`
- **113.** Troubleshooting Masalah Umum Docker di Host Linux
- **114.** **Final Capstone Project**: Menjalankan Web App Multi-Container di Linux Server

---

*Catatan: File ini akan terus diperbarui statusnya setiap kali episode baru dirilis ke GitHub & Cloudflare Pages.*
