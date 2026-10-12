// Site Configuration
// ------------
// NOTE • The canonical site URL — single source for metadataBase (SEO),
// sitemap.xml and robots.txt. Defaults to the GitHub Pages home; set
// NEXT_PUBLIC_SITE_URL to move it (e.g. a custom domain).
const GITHUB_PAGES_URL = 'https://kelvinharron.github.io/peck-website';

export const isSiteUrlConfigured = true;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || GITHUB_PAGES_URL).replace(/\/+$/, '');

// NOTE • The path the static export is served under ('/peck-website' on
// GitHub Pages, '' locally). next.config.js applies it to routes and _next
// assets; files in public/ referenced by hand go through asset().
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const asset = (path: string) => `${basePath}${path}`;

// SECTION • Peck links
export const appStoreUrl = 'https://apps.apple.com/app/id6760778069';
