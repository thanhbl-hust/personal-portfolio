/** Lowercases text and strips diacritics (including Vietnamese đ), so "Kiến trúc" and "kien truc" compare equal. */
export const foldText = (value: string) =>
	value
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[đĐ]/g, 'd')
		.toLowerCase();
