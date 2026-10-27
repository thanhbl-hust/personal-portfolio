const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixes an absolute site path with the configured base (e.g. /personal-portfolio). */
export const withBase = (path: string) => `${base}${path.startsWith('/') ? path : `/${path}`}`;
