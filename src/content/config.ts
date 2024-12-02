import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';

// Also update /src/types/index.d.ts when updating these signatures
const searchable = z.object({
  title: z.string(),
  description: z.string().optional(),
  autodescription: z.boolean().default(true),
  draft: z.boolean().default(false),
});

const about = defineCollection({
  loader: glob({ pattern: '-index.{md,mdx}', base: "./src/content/about" }),
  schema: ({ image }) => searchable.extend({
    image: image().optional(),
    imageAlt: z.string().default("image"),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.{md,mdx}', base: "./src/content/authors" }),
  schema: ({ image }) => searchable.extend({
    email: z.string().optional(),
    image: image().optional(),
    imageAlt: z.string().default("image"),
    social: z.array(
      z.object({
        name: z.string(),
        icon: z.string(),
        link: z.string(),
      }),
    ).optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: ({ image }) => searchable.extend({
    date: z.date().optional(),
    image: image().optional(),
    imageAlt: z.string().default("image"),
    author: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    complexity: z.number().default(1),
    hideToc: z.boolean().default(false),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.{md,mdx}', base: "./src/content/docs" }),
  schema: ({ image }) => searchable.extend({
    pubDatetime: z.date().optional(),
    modDatetime: z.date().optional(),
    image: image().refine((img) => img.width >= 1080, {
      message: "Image must be at least 1080 pixels wide!",
    }).optional(),
    imageAlt: z.string().default("image"),
    hideToc: z.boolean().default(false),
    hideNav: z.boolean().default(false),
  }),
});

const home = defineCollection({
  loader: glob({ pattern: '-index.{md,mdx}', base: "./src/content/home" }),
  schema: ({ image }) => z.object({
    banner: z.object({
      title: z.string(),
      content: z.string(),
      button: z.object({
        label: z.string(),
        link: z.string().optional(),
      }).optional(),
    }),
    testimonials: z.object({
      enable: z.boolean().default(true),
      title: z.string(),
      description: z.string(),
      items: z.array(
        z.object({
          name: z.string(),
          designation: z.string(),
          avatar: image().optional(),
          avatarAlt: z.string().default("avatar image"),
          content: z.string(),
        }),
      ),
    }),
  }),
});

const poetry = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.{md,mdx}', base: "./src/content/poetry" }),
  schema: ({ image }) => searchable.extend({
    date: z.date().optional(),
    image: image().optional(),
    imageAlt: z.string().default("image"),
    author: z.string().optional(),
  }),
});

const recipes = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.{md,mdx}', base: "./src/content/recipes" }),
  schema: ({ image }) => searchable.extend({
    date: z.date().optional(),
    image: image().optional(),
    imageAlt: z.string().default("image"),
    author: z.string().optional(),
    prep_time: z.number().optional(),
    servings: z.number().optional(),
    diet: z.string().optional(),
    ingredients: z.object({
      list: z.array(z.string()),
      qty: z.array(z.string()),
    }).optional(),
    instructions: z.array(z.string()).optional(),
    notes: z.array(z.string()).optional(),
  }),
});

const terms = defineCollection({
  loader: glob({ pattern: '-index.{md,mdx}', base: "./src/content/terms" }),
  schema: searchable,
});

// Export collections
export const collections = {
  about,
  authors,
  blog,
  docs,
  home,
  poetry,
  recipes,
  terms,
};
