# DJAFAR.BLOG v2.0

A modern, secure, and SEO-optimized tech blog built with [Astro](https://astro.build/), [TailwindCSS](https://tailwindcss.com/), and [TinaCMS](https://tina.io/).

![Tech Blog](https://img.shields.io/badge/Astro-5.17.1-ff5d56?logo=astro&logoColor=fff)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss&logoColor=fff)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6?logo=typescript&logoColor=fff)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎨 Design & UX
- **Dark Mode First** - Modern dark theme with terminal-inspired accents
- **Responsive Design** - Mobile-first approach for all screen sizes
- **Sticky Header** - Persistent navigation with smooth transitions
- **Custom Fonts** - Inter for body text, JetBrains Mono for code
- **Smooth Animations** - Subtle fade-in and slide-up effects

### 📝 Content Features
- **Syntax Highlighting** - Dracula theme with Shiki
- **Copy to Clipboard** - One-click code copying with feedback
- **Reading Time** - Automatic calculation based on content length
- **Progress Bar** - Visual reading progress indicator
- **Table of Contents** - Auto-generated from headings
- **Search & Filter** - Real-time article search and category filtering

### 🔒 Security
- **Security Headers** - CSP, X-Frame-Options, X-Content-Type-Options
- **Input Sanitization** - XSS prevention utilities
- **Rate Limiting** - Built-in rate limiting for API endpoints
- **HTTPS Enforcement** - Upgrade insecure requests
- **No External Scripts** - Minimal third-party dependencies

### 🚀 SEO & Performance
- **Meta Tags** - Complete Open Graph and Twitter Cards
- **Sitemap** - Auto-generated sitemap.xml
- **Robots.txt** - Configured for optimal crawling
- **Semantic HTML** - Proper heading hierarchy
- **Lazy Loading** - Images load on demand
- **Lighthouse 90+** - Optimized for Core Web Vitals

## 📁 Project Structure

```
djafarblog/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── CodeBlock.astro      # Code with copy button
│   │   ├── Footer.astro         # Site footer
│   │   ├── Header.astro         # Sticky navigation
│   │   ├── ReadingProgress.astro # Progress bar
│   │   ├── SEO.astro            # Meta tags component
│   │   ├── SearchModal.astro    # Search functionality
│   │   └── TableOfContents.astro # Auto ToC
│   ├── content/
│   │   ├── blog/                # Markdown blog posts
│   │   └── config.ts            # Content collections
│   ├── layouts/
│   │   └── Layout.astro         # Base layout
│   ├── lib/
│   │   ├── security.ts          # Security utilities
│   │   └── utils.ts             # Helper functions
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── [...slug].astro  # Dynamic post pages
│   │   │   └── index.astro      # Blog listing
│   │   ├── about.astro          # About page
│   │   ├── index.astro          # Homepage
│   │   └── projects.astro       # Projects showcase
│   ├── styles/
│   │   └── global.css           # Tailwind & custom styles
│   └── middleware.ts            # Security middleware
├── tina/
│   └── config.ts                # TinaCMS configuration
├── astro.config.mjs             # Astro configuration
├── tailwind.config.mjs          # Tailwind configuration
├── tsconfig.json                # TypeScript config
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fajaradnan13/djafarblog.git
   cd djafarblog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:4321
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📝 Writing Blog Posts

Blog posts are stored as Markdown files in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "SEO description (50-160 characters)"
pubDate: 2025-01-01T10:00:00Z
updatedDate: 2025-01-02T10:00:00Z
category: "security"
tags: ["cybersecurity", "tutorial"]
draft: false
heroImage: "/images/your-image.jpg"
---

Your content here...
```

### Available Categories
- `technology`
- `security`
- `tutorial`
- `devops`
- `programming`
- `opensource`

## 🔧 Configuration

### Environment Variables

For TinaCMS integration:

```bash
PUBLIC_TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
```

### Site Configuration

Edit `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://djafar.blog', // Your domain
  // ... other config
});
```

## 🛡️ Security Features

### Content Security Policy (CSP)

Configured in `src/middleware.ts`:
- Scripts: Self + inline (for Astro islands)
- Styles: Self + Google Fonts
- Images: Self + data + HTTPS
- Fonts: Self + Google Fonts

### Input Sanitization

Utilities in `src/lib/security.ts`:
- `sanitizeHTML()` - Prevent XSS
- `sanitizeURL()` - Block dangerous protocols
- `sanitizeSearchInput()` - Clean search queries
- `checkRateLimit()` - Rate limiting

## 📊 Performance

### Lighthouse Scores (Target)
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### Optimization Techniques
- Minimal JavaScript
- CSS purging with Tailwind
- Image lazy loading
- Preconnect to external resources
- Efficient caching strategies

## 🎨 Customization

### Colors

Edit `tailwind.config.mjs`:

```javascript
colors: {
  primary: { /* ... */ },
  terminal: { /* ... */ },
  dark: { /* ... */ },
}
```

### Fonts

Edit `src/styles/global.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 👤 Author

**Fajar Adnan**
- GitHub: [@fajaradnan13](https://github.com/fajaradnan13)
- Blog: [djafar.blog](https://djafar.blog)

## 🙏 Acknowledgments

- [Astro](https://astro.build/) - The web framework for content-driven websites
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TinaCMS](https://tina.io/) - Open-source visual CMS
- [Shiki](https://github.com/shikijs/shiki) - Syntax highlighter

---

Built with ❤️ and ☕ by Fajar Adnan
