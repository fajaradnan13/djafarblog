import { getCollection } from 'astro:content';

export async function get() {
  const site = import.meta.env.SITE || 'https://teknologinewbie.pages.dev';
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);

  const items = posts.map((p) => ({
    title: p.data.title,
    link: `${site}/blog/${p.slug}/`,
    pubDate: new Date(p.data.pubDate).toUTCString(),
    description: p.data.description,
  }));

  const xmlItems = items.map((it) => `
    <item>
      <title><![CDATA[${it.title}]]></title>
      <link>${it.link}</link>
      <guid isPermaLink="true">${it.link}</guid>
      <pubDate>${it.pubDate}</pubDate>
      <description><![CDATA[${it.description}]]></description>
    </item>
  `).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Teknologi Newbie</title>
      <link>${site}</link>
      <description>Blog tentang teknologi, programming, dan keamanan siber.</description>
      <language>id-ID</language>
      ${xmlItems}
    </channel>
  </rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
