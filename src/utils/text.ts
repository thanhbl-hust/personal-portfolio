/** Lowercases text and strips diacritics (including Vietnamese đ), so "Kiến trúc" and "kien truc" compare equal. */
export const foldText = (value: string) =>
	value
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[đĐ]/g, 'd')
		.toLowerCase();

/** Rough plain text of a Markdown body for search: drops link and image targets and HTML tags, collapses whitespace. */
export const markdownToText = (markdown: string) =>
	markdown
		.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
