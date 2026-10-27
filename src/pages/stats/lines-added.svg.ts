import type { APIRoute } from 'astro';
import { getLinesAddedPerDay, renderLinesAddedChart } from '../../utils/stats';

// Chart embedded in README.md, redrawn from the git history on every deploy
export const GET: APIRoute = () =>
	new Response(renderLinesAddedChart(getLinesAddedPerDay()), {
		headers: { 'Content-Type': 'image/svg+xml' },
	});
