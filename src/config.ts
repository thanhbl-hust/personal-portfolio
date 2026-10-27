export const SITE = {
	title: 'Lam Thanh Bui',
	initials: 'LTB',
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
