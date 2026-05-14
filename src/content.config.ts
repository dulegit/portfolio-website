import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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

const stepsSchema = z
  .object({
    steps: z.array(
      z.object({
        num: z.string(),
        heading: z.string(),
        body: z.string(),
      }),
    ),
    links: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
        arrow: z.string(),
        external: z.boolean().optional(),
      }),
    ),
  })
  .optional();

const aboutSchema = z
  .object({
    sectionNum: z.string(),
    sectionName: z.string(),
    heading: z.string(),
    subtitle: z.string(),
    paragraphs: z.array(z.string()),
    stats: z.array(z.object({ value: z.string(), label: z.string() })),
  })
  .optional();

const expertiseSchema = z
  .object({
    sectionNum: z.string(),
    sectionName: z.string(),
    heading: z.string(),
    subtitle: z.string(),
    cards: z.array(
      z.object({
        title: z.string(),
        index: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
      }),
    ),
  })
  .optional();

const experienceSchema = z
  .object({
    sectionNum: z.string(),
    sectionName: z.string(),
    heading: z.string(),
    subtitle: z.string(),
    entries: z.array(
      z.object({
        role: z.string(),
        company: z.string(),
        period: z.string(),
        description: z.string(),
        bullets: z.array(
          z.object({
            text: z.string(),
            project: z.string().optional(),
          }),
        ),
      }),
    ),
  })
  .optional();

const selectedWorkSchema = z
  .object({
    sectionNum: z.string(),
    sectionName: z.string(),
    heading: z.string(),
    subtitle: z.string(),
    entries: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        role: z.string(),
        stack: z.string(),
        outcome: z.string(),
      }),
    ),
  })
  .optional();

const contactSchema = z
  .object({
    sectionNum: z.string(),
    sectionName: z.string(),
    heading: z.string(),
    statusText: z.string(),
    headlineAccent: z.string(),
    headlineBase: z.string(),
    body: z.string(),
    email: z.string(),
    linkedin: z.string(),
    location: z.string(),
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
    steps: stepsSchema,
    about: aboutSchema,
    expertise: expertiseSchema,
    experience: experienceSchema,
    work: selectedWorkSchema,
    contact: contactSchema,
  }),
});

export const collections = { pages };
