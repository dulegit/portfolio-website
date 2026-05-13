import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { string } from 'astro:schema';

const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const seoSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: imageSchema.optional(),
    noIndex: z.boolean().default(false),
  })
  .optional();

const heroSchema = z
  .object({
    name: z.string(),
    title: z.string(),
    location: z.string(),
    description: z.string(),
  })
  .optional();

const headerSchema = z.object({
  name: z.string(),
  navItems: z.array(z.object({num: z.string(), label: z.string(), href: z.string()}))
})

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    seo: seoSchema,
    header: headerSchema,
    hero: heroSchema,
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    heroImage: imageSchema.optional(),
    author: z.string().optional(), // reference to author slug
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    seo: seoSchema,
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    bio: z.string().optional(),
    avatar: imageSchema.optional(),
  }),
});

export const collections = { pages, posts, authors };
