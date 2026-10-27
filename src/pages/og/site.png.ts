import type { APIRoute } from 'astro';
import { SITE } from '../../config';
import { PROFILE } from '../../data/cv';
import { pngResponse, renderOgImage } from '../../utils/og';

// Default social preview image, used by every page without its own (CV, blog list, tag pages)
export const GET: APIRoute = async ({ site }) =>
	pngResponse(
		await renderOgImage({
			path: '~/whoami.sh',
			command: 'whoami',
			title: PROFILE.name,
			subtitle: SITE.description,
			footer: 'cv · blog',
			host: site?.host ?? '',
		}),
	);
