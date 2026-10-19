import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Schemas are deliberately minimal: T3 (projects) and T4 (writing) extend them
// as their templates need. Every fact in an entry must trace to docs/content-brief.md.

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    // Heading for the `stack` list; research projects list benchmark suites instead.
    stackLabel: z.string().default('Stack'),
    links: z
      .array(z.object({ label: z.string(), href: z.url() }))
      .default([]),
    // Case-study facts. Each is optional: leave it out rather than guess.
    context: z.string().optional(), // event or programme, e.g. "OpenAI Buildathon"
    period: z.string().optional(),
    team: z.string().optional(),
    role: z.string().optional(),
    status: z.string().optional(),
    // Only an outcome the brief records and allows on the site.
    result: z.string().optional(),
    credits: z
      .array(z.object({ name: z.string(), role: z.string() }))
      .default([]),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
