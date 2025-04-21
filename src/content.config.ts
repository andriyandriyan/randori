import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/blog',
    generateId: ({ entry }) => {
      const [, slug] = entry.replace('.mdx', '').split('--');
      return slug;
    }
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    publishDate: z.coerce.date(),
  }),
});

export const collections = { blog };
