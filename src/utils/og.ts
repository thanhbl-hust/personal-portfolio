import { readFile } from 'node:fs/promises';
import path from 'node:path';
import satori, { type SatoriOptions } from 'satori';
import sharp from 'sharp';

// Social preview images (og:image) are rendered at build time as terminal-style cards

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

// Dark theme colors from src/styles/global.css (CSS variables aren't available outside the browser)
export const COLORS = {
	bg: '#0f1117',
	surface: '#161a23',
	surface2: '#1d2230',
	border: '#283044',
	muted: '#8a93a8',
	heading: '#eef1f7',
	accent: '#7aa2f7',
	green: '#9ece6a',
	yellow: '#e0af68',
	red: '#f7768e',
};

// JetBrains Mono ships as subsets that together cover Vietnamese. Satori picks one font per family name,
// so each subset gets its own name and the font-family list makes Satori fall back across them per glyph.
const FONT_DIR = path.join(process.cwd(), 'node_modules/@fontsource/jetbrains-mono/files');
const FONT_SUBSETS = ['latin', 'latin-ext', 'vietnamese'];
const FONT_WEIGHTS = [400, 700] as const;
const fontName = (subset: string) => `JetBrains Mono ${subset}`;
const FONT_FAMILY = FONT_SUBSETS.map(fontName).join(', ');

type Fonts = SatoriOptions['fonts'];
let fonts: Promise<Fonts> | undefined;

const loadFonts = () =>
	(fonts ??= Promise.all(
		FONT_SUBSETS.flatMap((subset) =>
			FONT_WEIGHTS.map(async (weight) => ({
				name: fontName(subset),
				data: await readFile(path.join(FONT_DIR, `jetbrains-mono-${subset}-${weight}-normal.woff`)),
				weight,
				style: 'normal' as const,
			})),
		),
	));

// Minimal stand-in for JSX elements, which Satori takes as input. Every node is a flex box sized like
// `box-sizing: border-box`, since Satori defaults to content-box and padding would push the card off the image.
type Child = OgNode | string;
interface OgNode {
	type: string;
	props: { style: Record<string, unknown>; children?: Child | Child[] };
}

const el = (style: Record<string, unknown>, children?: Child | Child[]): OgNode => ({
	type: 'div',
	props: { style: { display: 'flex', boxSizing: 'border-box', ...style }, children },
});

export interface OgCard {
	/** Shown in the window's title bar, e.g. "~/whoami.sh". */
	path: string;
	/** Shell command shown above the title, e.g. "whoami". */
	command: string;
	title: string;
	subtitle?: string;
	/** Bottom-left text, e.g. tags. */
	footer: string;
	/** Bottom-right text, e.g. the site host. */
	host: string;
}

export async function renderOgImage(card: OgCard): Promise<Buffer> {
	const titleSize = card.title.length > 60 ? 48 : card.title.length > 36 ? 56 : 64;

	const dot = (color: string) => el({ width: 18, height: 18, borderRadius: 9, backgroundColor: color });

	const tree = el(
		{
			width: OG_WIDTH,
			height: OG_HEIGHT,
			padding: 48,
			backgroundColor: COLORS.bg,
			fontFamily: FONT_FAMILY,
		},
		el(
			{
				width: '100%',
				height: '100%',
				flexDirection: 'column',
				overflow: 'hidden',
				border: `2px solid ${COLORS.border}`,
				borderRadius: 18,
				backgroundColor: COLORS.surface,
			},
			[
				el(
					{
						alignItems: 'center',
						height: 60,
						padding: '0 28px',
						borderBottom: `2px solid ${COLORS.border}`,
						backgroundColor: COLORS.surface2,
					},
					[
						el({ gap: 10 }, [dot(COLORS.red), dot(COLORS.yellow), dot(COLORS.green)]),
						// Right margin balances the dots so the path stays centered
						el({ flex: 1, justifyContent: 'center', marginRight: 74, color: COLORS.muted, fontSize: 22 }, card.path),
					],
				),
				el({ flex: 1, minHeight: 0, flexDirection: 'column', padding: '40px 60px' }, [
					el({ gap: 16, color: COLORS.muted, fontSize: 28 }, [el({ color: COLORS.green, fontWeight: 700 }, '$'), card.command]),
					el(
						{
							display: 'block',
							marginTop: 22,
							color: COLORS.heading,
							fontSize: titleSize,
							fontWeight: 700,
							lineHeight: 1.2,
							lineClamp: 3,
						},
						card.title,
					),
					...(card.subtitle
						? [
								el(
									{ display: 'block', marginTop: 20, color: COLORS.muted, fontSize: 28, lineHeight: 1.45, lineClamp: 2 },
									card.subtitle,
								),
							]
						: []),
					el({ flex: 1 }),
					el({ justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, fontSize: 24 }, [
						el({ color: COLORS.accent }, card.footer),
						el({ color: COLORS.muted }, card.host),
					]),
				]),
			],
		),
	);

	// Satori typings expect a React element; the plain object above has the same shape
	const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
		width: OG_WIDTH,
		height: OG_HEIGHT,
		fonts: await loadFonts(),
	});

	return sharp(Buffer.from(svg)).png().toBuffer();
}

export const pngResponse = (png: Buffer) =>
	new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
