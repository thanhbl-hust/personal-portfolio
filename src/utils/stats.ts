import { execFileSync } from 'node:child_process';
import { COLORS } from './og';

// "Lines added per day" chart shown in README.md, drawn from the git history at build time

export interface DayStat {
	/** YYYY-MM-DD, in the commit's own timezone. */
	day: string;
	lines: number;
}

// Generated files, which would drown out hand-written changes
const IGNORED_FILES = new Set(['package-lock.json']);

const WIDTH = 800;
const HEIGHT = 380;
const PLOT = { top: 150, right: 24, bottom: 44, left: 72 };
const FONT = "'JetBrains Mono', ui-monospace, 'Cascadia Code', Consolas, monospace";

const shiftDay = (day: string, offset: number) => {
	const date = new Date(`${day}T00:00:00Z`);
	date.setUTCDate(date.getUTCDate() + offset);
	return date.toISOString().slice(0, 10);
};

const formatDay = (day: string, withYear = false) =>
	new Date(`${day}T00:00:00Z`).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: withYear ? 'numeric' : undefined,
		timeZone: 'UTC',
	});

const formatNumber = (n: number) => n.toLocaleString('en-US');
const round = (n: number) => Math.round(n * 10) / 10;

/** Lines added per day, from the day before the first commit (always 0) to the last commit. Days without commits are 0. */
export const getLinesAddedPerDay = (): DayStat[] => {
	const added = new Map<string, number>();
	let day = '';
	const log = execFileSync('git', ['log', '--numstat', '--format=@%ad', '--date=short'], { encoding: 'utf8' });
	for (const line of log.split('\n')) {
		if (line.startsWith('@')) {
			day = line.slice(1);
			added.set(day, added.get(day) ?? 0);
			continue;
		}
		const [insertions, , file] = line.split('\t');
		// Binary files report "-" instead of a line count
		if (!file || insertions === '-' || IGNORED_FILES.has(file)) continue;
		added.set(day, (added.get(day) ?? 0) + Number(insertions));
	}

	const commitDays = [...added.keys()].sort();
	const lastDay = commitDays[commitDays.length - 1];
	const days: DayStat[] = [];
	for (let d = shiftDay(commitDays[0], -1); d <= lastDay; d = shiftDay(d, 1)) {
		days.push({ day: d, lines: added.get(d) ?? 0 });
	}
	return days;
};

// Rounds the axis up to about 4 even steps of 1, 2, or 5 × 10^n lines
const niceScale = (max: number) => {
	const raw = Math.max(max, 1) / 4;
	const magnitude = 10 ** Math.floor(Math.log10(raw));
	const step = Math.max(1, [1, 2, 5].map((m) => m * magnitude).find((s) => s >= raw) ?? 10 * magnitude);
	return { step, max: step * Math.ceil(Math.max(max, 1) / step) };
};

/** Bar chart as an SVG terminal window, in the site's dark theme so it reads the same on light and dark GitHub. */
export const renderLinesAddedChart = (days: DayStat[]) => {
	const total = days.reduce((sum, { lines }) => sum + lines, 0);
	const scale = niceScale(Math.max(...days.map(({ lines }) => lines)));
	const plotWidth = WIDTH - PLOT.left - PLOT.right;
	const plotHeight = HEIGHT - PLOT.top - PLOT.bottom;
	const baseline = HEIGHT - PLOT.bottom;
	const y = (lines: number) => round(baseline - (lines / scale.max) * plotHeight);
	const slot = plotWidth / days.length;
	const barWidth = round(Math.min(slot * 0.6, 48));
	const center = (i: number) => round(PLOT.left + slot * (i + 0.5));
	// Label every nth day, counted back from the latest so it is always labelled
	const labelEvery = Math.ceil(days.length / 8);
	const showValues = days.length <= 14;

	const grid: string[] = [];
	for (let lines = 0; lines <= scale.max; lines += scale.step) {
		grid.push(
			`<line x1="${PLOT.left}" x2="${WIDTH - PLOT.right}" y1="${y(lines)}" y2="${y(lines)}" stroke="${COLORS.border}"/>`,
			`<text x="${PLOT.left - 12}" y="${y(lines) + 4}" text-anchor="end" fill="${COLORS.muted}" font-size="11">${formatNumber(lines)}</text>`,
		);
	}

	const bars = days.flatMap(({ day, lines }, i) => [
		lines > 0
			? `<rect x="${round(center(i) - barWidth / 2)}" y="${y(lines)}" width="${barWidth}" height="${round(baseline - y(lines))}" rx="3" fill="${COLORS.accent}"/>`
			: '',
		showValues
			? `<text x="${center(i)}" y="${y(lines) - 8}" text-anchor="middle" fill="${COLORS.heading}" font-size="11">${formatNumber(lines)}</text>`
			: '',
		(days.length - 1 - i) % labelEvery === 0
			? `<text x="${center(i)}" y="${baseline + 24}" text-anchor="middle" fill="${COLORS.muted}" font-size="11">${formatDay(day)}</text>`
			: '',
	]);

	return [
		`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img">`,
		'<title>Lines added per day</title>',
		`<style>text { font-family: ${FONT}; }</style>`,
		`<clipPath id="window"><rect width="${WIDTH}" height="${HEIGHT}" rx="12"/></clipPath>`,
		'<g clip-path="url(#window)">',
		`<rect width="${WIDTH}" height="${HEIGHT}" fill="${COLORS.surface}"/>`,
		`<rect width="${WIDTH}" height="36" fill="${COLORS.surface2}"/>`,
		`<line x1="0" x2="${WIDTH}" y1="36.5" y2="36.5" stroke="${COLORS.border}"/>`,
		'</g>',
		`<rect x="0.5" y="0.5" width="${WIDTH - 1}" height="${HEIGHT - 1}" rx="11.5" fill="none" stroke="${COLORS.border}"/>`,
		...[COLORS.red, COLORS.yellow, COLORS.green].map((color, i) => `<circle cx="${20 + i * 18}" cy="18" r="6" fill="${color}"/>`),
		`<text x="${WIDTH / 2}" y="22" text-anchor="middle" fill="${COLORS.muted}" font-size="12">~/personal-portfolio</text>`,
		`<text x="24" y="72" fill="${COLORS.muted}" font-size="13"><tspan fill="${COLORS.green}" font-weight="700">$</tspan> git log --numstat</text>`,
		`<text x="24" y="102" fill="${COLORS.heading}" font-size="20" font-weight="700">Lines added per day</text>`,
		`<text x="24" y="124" fill="${COLORS.muted}" font-size="12">${formatNumber(total)} lines in total · as of ${formatDay(days[days.length - 1].day, true)}</text>`,
		...grid,
		...bars.filter(Boolean),
		'</svg>',
		'',
	].join('\n');
};
