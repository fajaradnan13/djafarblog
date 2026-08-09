import fg from 'fast-glob';
import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

async function build() {
  const entries = await fg(['src/content/blog/**/*.md', 'src/content/blog/**/*.mdx']);
  const out = [];

  for (const file of entries) {
    const raw = await fs.readFile(file, 'utf-8');
    const { data, content } = matter(raw);

    // derive slug from filename or frontmatter
    const basename = path.basename(file).replace(/\.mdx?$/, '');
    const slug = data.slug || basename;

    out.push({
      title: data.title || '',
      description: data.description || '',
      pubDate: data.pubDate ? new Date(data.pubDate).toISOString() : null,
      category: data.category || null,
      tags: data.tags || [],
      slug,
      body: content.replace(/\n+/g, ' ').slice(0, 2000),
    });
  }

  await fs.mkdir('public', { recursive: true });
  await fs.writeFile('public/search-index.json', JSON.stringify(out, null, 2), 'utf-8');
  console.log(`Wrote ${out.length} entries to public/search-index.json`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
