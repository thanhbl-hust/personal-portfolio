import type { APIRoute } from 'astro';
import { getPosts } from '../../utils/posts';
import { foldText, markdownToText } from '../../utils/text';

// Folded body text of every post by id, fetched by PostSearch the first time the search box is used
export const GET: APIRoute = async () => {
	const posts = await getPosts();
	const bodies = Object.fromEntries(posts.map((post) => [post.id, foldText(markdownToText(post.body ?? ''))]));
	return new Response(JSON.stringify(bodies), {
		headers: { 'Content-Type': 'application/json' },
	});
};
