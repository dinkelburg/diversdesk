// https://docs.astro.build/en/guides/content-collections/#defining-collections

import { z, defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) => z.object ({
  title: z.string(),
  description: z.string(),
  contents: z.array(z.string()),
  author: z.string(),
  role: z.string().optional(),
  authorImage: image(),
  authorImageAlt: z.string(),
  pubDate: z.date(),
  dateModified: z.date().optional(),
  cardImage: image(),
  cardImageAlt: z.string(),
  readTime: z.number(),
  tags: z.array(z.string()).optional(),
  showInFeed: z.boolean().default(true),
  additionalSchema: z.any().optional(),
  }),
});

const insightsCollection = defineCollection({
  type: "content",
  schema: ({ image }) => z.object ({
  title: z.string(),
  description: z.string(),
  // contents: z.array(z.string()),
  cardImage: image(),
  cardImageAlt: z.string(),
  showInFeed: z.boolean().default(true),
  }),
});

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  'blog': blogCollection,
  'insights': insightsCollection,
};