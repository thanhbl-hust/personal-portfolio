import type { APIRoute } from 'astro';
import { pngResponse, renderOgImage } from '../../../utils/og';
import { getPosts, type Post } from '../../../utils/posts';

// One social preview image per post, at /og/blog/<slug>.png
export async function getStaticPaths() {
	const posts = await getPosts();
	return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute = async ({ props, site }) => {
	const { post } = props as { post: Post };

	return pngResponse(
		await renderOgImage({
			path: `~/blog/${post.id}`,
			command: 'cat index.md',
			title: post.data.title,
			subtitle: post.data.description,
			footer: post.data.tags.map((tag) => `#${tag}`).join(' '),
			host: site?.host ?? '',
		}),
	);
};
