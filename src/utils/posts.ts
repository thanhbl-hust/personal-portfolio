import { type CollectionEntry, getCollection } from 'astro:content';
import { foldText } from './text';
import { withBase } from './url';

export type Post = CollectionEntry<'blog'>;

export interface Heading {
	depth: number;
	slug: string;
	text: string;
}

export interface TagSummary {
	slug: string;
	label: string;
	count: number;
}

/** Posts sorted newest first. Drafts are only included in `npm run dev`. */
export const getPosts = async () => {
	const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
	return posts.sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.data.title.localeCompare(b.data.title),
	);
};

export const tagSlug = (tag: string) =>
	foldText(tag)
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

export const postHref = (post: Post) => withBase(`/blog/${post.id}/`);

export const tagHref = (tag: string) => withBase(`/blog/tags/${tagSlug(tag)}/`);

/** Unique tags across the given posts with their post counts, sorted alphabetically. */
export const getTags = (posts: Post[]): TagSummary[] => {
	const tags = new Map<string, TagSummary>();

	for (const post of posts) {
		for (const label of post.data.tags) {
			const slug = tagSlug(label);
			const tag = tags.get(slug) ?? { slug, label, count: 0 };
			tag.count += 1;
			tags.set(slug, tag);
		}
	}

	return [...tags.values()].sort((a, b) => a.label.localeCompare(b.label));
};

/** Headings listed in a post's table of contents: ## and ###, minus the hidden footnotes heading. */
export const getTocItems = (headings: Heading[]) =>
	headings.filter((heading) => (heading.depth === 2 || heading.depth === 3) && heading.slug !== 'footnote-label');

/** Formats a date as YYYY-MM-DD. Frontmatter dates are parsed as UTC midnight. */
export const formatDate = (date: Date) => date.toISOString().slice(0, 10);
