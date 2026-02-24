import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(50).max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    category: z.enum([
      'technology',
      'security',
      'tutorial',
      'devops',
      'programming',
      'opensource',
    ]).optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    readTime: z.number().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};
