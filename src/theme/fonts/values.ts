// Font Values
// ------------
// NOTE • Raw values only, kept free of next/font so the style build script
// (scripts/build-styles.ts) can import them outside Next.

export const fontVariables = {
	fredoka: '--fredoka',
	nunito: '--nunito',
};

// NOTE • The same pairing as the iOS app: Fredoka for display, Nunito for reading
export const fontFamilies = {
	heading: `var(--fredoka), ui-rounded, 'Arial Rounded MT Bold', sans-serif`,
	body: `var(--nunito), ui-rounded, -apple-system, 'Segoe UI', sans-serif`,
	mono: `ui-monospace, 'SF Mono', Menlo, monospace`,
	script: `var(--fredoka), ui-rounded, sans-serif`,
	// NOTE • A system stack — no font download (used by the CookieBar heading)
	serif: `Georgia, 'Times New Roman', serif`,
};

export const fontWeights = {
	light: 300,
	regular: 400,
	medium: 500,
	semi: 600,
	bold: 700,
	heavy: 800,
	black: 900,
};
