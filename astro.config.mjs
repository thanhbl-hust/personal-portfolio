// @ts-check
import { satteri } from '@astrojs/markdown-satteri';
import expressiveCode from 'astro-expressive-code';
import { defineConfig } from 'astro/config';
import { calloutsPlugin } from './src/plugins/markdown-callouts.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://thanhbl-hust.github.io',
	// GitHub Pages serves this project site under /<repo-name>/
	base: '/personal-portfolio',
	integrations: [
		// Code blocks: syntax highlighting, copy button, file titles, terminal frames, line markers
		expressiveCode({
			themes: ['tokyo-night', 'github-light'],
			// Follow the site's theme toggle ([data-theme] on <html>) instead of the OS preference
			themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
			useDarkModeMediaQuery: false,
			styleOverrides: {
				codeFontFamily: 'var(--font-mono)',
				uiFontFamily: 'var(--font-mono)',
				borderRadius: '0.5rem',
				borderColor: 'var(--border)',
			},
		}),
	],
	markdown: {
		// Sätteri is Astro's default Markdown processor; plugins are passed to it directly
		processor: satteri({
			mdastPlugins: [calloutsPlugin],
			features: {
				// Posts are written in Vietnamese, so localize the labels Markdown generates inside them
				gfm: {
					footnotes: {
						label: 'Chú thích',
						backLabel: 'Quay lại vị trí chú thích {reference}',
					},
				},
			},
		}),
	},
});
