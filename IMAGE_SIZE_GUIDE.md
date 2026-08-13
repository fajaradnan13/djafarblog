# 📝 Panduan Mengontrol Lebar Gambar di Blog

Ada 2 cara untuk mengontrol lebar gambar di postingan blog Anda:

---

## 🎨 CARA 1: Kontrol Hero Image (Gambar Utama)

### Menggunakan TinaCMS Admin:

1. Buka `http://localhost:4321/admin`
2. Pilih post yang ingin diedit
3. Scroll ke bagian **"Hero Image"**
4. Pilih lebar gambar dari dropdown **"Hero Image Width"**:
   - **Full Width** - Lebar penuh (100%)
   - **Large (1200px)** - Besar (default)
   - **Medium (800px)** - Sedang
   - **Small (600px)** - Kecil

5. Klik **Save**

### Edit Manual di Front Matter:

Tambahkan field `imageWidth` di front matter Markdown:

```markdown
---
title: "Judul Artikel"
description: "Deskripsi"
pubDate: 2025-01-01T10:00:00Z
imageWidth: "large"  # ← Tambahkan ini
---
```

**Pilihan nilai:**
- `"full"` - Lebar penuh
- `"large"` - Besar (1200px)
- `"medium"` - Sedang (800px)
- `"small"` - Kecil (600px)

---

## 🎨 CARA 2: Kontrol Gambar dalam Konten Artikel

Untuk gambar yang Anda sisipkan dalam konten artikel, gunakan class CSS khusus.

### Opsi A: Menggunakan HTML (Recommended)

```markdown
<!-- Gambar kecil -->
<img src="/images/my-image.jpg" alt="Deskripsi" class="img-small" />

<!-- Gambar sedang -->
<img src="/images/my-image.jpg" alt="Deskripsi" class="img-medium" />

<!-- Gambar besar -->
<img src="/images/my-image.jpg" alt="Deskripsi" class="img-large" />

<!-- Gambar full width -->
<img src="/images/my-image.jpg" alt="Deskripsi" class="img-full" />
```

### Opsi B: Dengan Caption

```markdown
<figure>
  <img src="/images/my-image.jpg" alt="Deskripsi" class="img-medium" />
  <figcaption class="img-caption">Ini adalah caption untuk gambar</figcaption>
</figure>
```

### Opsi C: Markdown Biasa (Auto Responsive)

Gambar markdown biasa sudah responsive:

```markdown
![Alt text](/images/my-image.jpg)
```

Gambar akan otomatis max-width 100% dan centered.

---

## 📏 UKURAN LEBAR GAMBAR

| Class | Max Width | Penggunaan |
|-------|-----------|------------|
| `img-small` | 600px (30rem) | Icon, diagram kecil, screenshot detail |
| `img-medium` | 800px (32rem) | Gambar ilustrasi standar |
| `img-large` | 1200px (42rem) | Gambar lebar, screenshot full |
| `img-full` | 100% | Banner, hero images |

---

## 💡 TIPS

1. **Hero Image** - Gunakan `large` atau `medium` untuk tampilan terbaik
2. **Screenshot Code** - Gunakan `medium` agar text tetap terbaca
3. **Diagram/Flowchart** - Gunakan `large` atau `full` untuk detail
4. **Icon/Logo** - Gunakan `small` agar tidak terlalu dominan
5. **Mobile Friendly** - Semua gambar otomatis responsive di mobile

---

## 🎯 CONTOH PENGGUNAAN

```markdown
---
title: "Tutorial Python"
imageWidth: "large"
---

# Pendahuluan

Ini adalah gambar hero image yang akan ditampilkan di atas artikel
dengan ukuran large (1200px).

## Sub Judul

Berikut adalah gambar dalam konten:

<img src="/images/screenshot.png" alt="Screenshot" class="img-medium" />

Dan gambar kecil untuk icon:

<img src="/images/icon.png" alt="Icon" class="img-small" />
```

---

## 🔧 TROUBLESHOOTING

### Gambar masih terlalu lebar?
- Pastikan menggunakan class yang benar
- Coba gunakan `img-small` atau `img-medium`

### Gambar tidak centered?
- Class `img-small`, `img-medium`, `img-large` otomatis centered
- Gunakan `<figure>` tag untuk hasil terbaik

### Gambar pecah/buram?
- Gunakan gambar dengan resolusi cukup tinggi
- Export dengan format WebP atau PNG untuk kualitas terbaik

---

## 📱 RESPONSIVE BEHAVIOR

Semua gambar otomatis responsive:
- **Desktop**: Sesuai class yang dipilih
- **Tablet**: Max 100% dari container
- **Mobile**: Full width (100%) untuk keterbacaan optimal

---

Selamat mencoba! 🚀
