Saya menambahkan beberapa perubahan pada cabang feature/blog-redesign:

- Menambahkan skrip pembuatan indeks pencarian lokal (scripts/generate-search.js) yang mengekstrak frontmatter dan isi dari file markdown di src/content/blog ke public/search-index.json.
- Menambahkan dua contoh artikel di src/content/blog sebagai placeholder (security & programming).
- Menambahkan komponen Comments.astro yang memuat Utterances (menggunakan repo fajaradnan13/djafarblog) untuk komentar pada setiap halaman artikel.
- Menambahkan endpoint RSS di src/pages/rss.xml.ts yang menghasilkan RSS feed berdasarkan koleksi blog.
- Memperbarui package.json: menghapus dependensi TinaCMS yang bermasalah, menambahkan fast-glob dan gray-matter, dan memastikan build menjalankan pembuatan indeks pencarian sebelum build Astro.

Selanjutnya saya akan:
- Memodifikasi template artikel (src/pages/blog/[...slug].astro) agar menampilkan komponen komentar di bawah konten.
- Menambahkan client-side pencarian yang menggunakan public/search-index.json dari SearchModal yang sudah ada.

Jika Anda setuju, saya akan commit perubahan selanjutnya (modifikasi [...slug].astro dan integrasi search) ke cabang ini dan buka PR.
