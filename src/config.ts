export const SITE = {
	title: 'Lam Thanh Bui',
	initials: 'LTB',
	// Day the site went live (YYYY-MM-DD), shown in the footer
	launchDate: '2026-10-28',
	description: 'DevOps Engineer — CV and technical notes.',
	terminalUser: 'thanhbl',
	// Blog posts are written in Vietnamese; the rest of the site's text is English
	postLang: 'vi',
	repo: 'https://github.com/thanhbl-hust/personal-portfolio',
} as const;

export const NAV_LINKS = [
	{ label: 'cv', href: '/' },
	{ label: 'blog', href: '/blog/' },
] as const;
