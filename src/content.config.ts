import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const collections = {
	blog: defineCollection({
		// Each post is a folder: src/content/blog/<slug>/index.md, with its images in <slug>/images/
		loader: glob({ base: './src/content/blog', pattern: '*/index.md' }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).default([]),
			draft: z.boolean().default(false),
		}),
	}),
};
