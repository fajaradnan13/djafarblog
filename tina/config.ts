import { defineConfig } from "tinacms";

// Menyesuaikan deteksi branch untuk Cloudflare Pages
const branch =
  process.env.CF_PAGES_BRANCH || // Khusus Cloudflare Pages
  process.env.GITHUB_BRANCH ||
  "main";

export default defineConfig({
  branch,

  // Mengambil ID dan Token dari file .env
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images", // Folder di dalam 'public' untuk simpan gambar
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        // PENTING: Jalur ini sekarang mengarah ke standar Astro
        path: "src/content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Date Published",
            required: true,
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});