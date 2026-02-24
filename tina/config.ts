import { defineConfig } from "tinacms";

const branch =
  process.env.CF_PAGES_BRANCH ||
  process.env.GITHUB_BRANCH ||
  "main";

export default defineConfig({
  branch,

  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "src/content/blog",
        format: "md",
        ui: {
          router: ({ document }) => {
            return `/blog/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
            validate: (value) => {
              if (!value || value.length < 3) {
                return "Title must be at least 3 characters";
              }
              if (value.length > 100) {
                return "Title must be less than 100 characters";
              }
            },
          },
          {
            type: "string",
            name: "description",
            label: "Description (Meta)",
            required: true,
            ui: {
              component: "textarea",
            },
            validate: (value) => {
              if (!value) return "Description is required";
              if (value.length < 50) return "Description must be at least 50 characters";
              if (value.length > 160) return "Description should be less than 160 characters for SEO";
            },
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Date Published",
            required: true,
          },
          {
            type: "datetime",
            name: "updatedDate",
            label: "Date Updated",
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image",
            description: "Featured image for social sharing (1200x630 recommended)",
          },
          {
            type: "string",
            name: "imageWidth",
            label: "Hero Image Width",
            description: "Control the width of hero image",
            options: [
              { label: "Full Width", value: "full" },
              { label: "Large (1200px)", value: "large" },
              { label: "Medium (800px)", value: "medium" },
              { label: "Small (600px)", value: "small" },
            ],
            ui: {
              component: "select",
            },
            default: "large",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              { label: "Technology", value: "technology" },
              { label: "Security", value: "security" },
              { label: "Tutorial", value: "tutorial" },
              { label: "DevOps", value: "devops" },
              { label: "Programming", value: "programming" },
              { label: "Open Source", value: "opensource" },
            ],
            ui: {
              component: "select",
            },
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              component: "textarea",
              description: "Enter tags separated by commas (e.g., python, security, tutorial)",
            },
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
            description: "Enable to hide this post from production",
          },
          {
            type: "number",
            name: "readTime",
            label: "Reading Time (minutes)",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "CodeBlock",
                label: "Code Block",
                inline: false,
                fields: [
                  {
                    type: "string",
                    name: "language",
                    label: "Language",
                    options: ["javascript", "typescript", "python", "bash", "json", "yaml", "html", "css", "sql", "go", "rust"],
                  },
                  {
                    type: "string",
                    name: "filename",
                    label: "Filename",
                  },
                  {
                    type: "string",
                    name: "code",
                    label: "Code",
                    ui: {
                      component: "code",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "page",
        label: "Pages",
        path: "src/content/pages",
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