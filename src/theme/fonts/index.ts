// Imports
// ------------
import { toVarRefs } from '@theme/cssVariables';
import { Fredoka, Nunito } from 'next/font/google';
import { fontFamilies, fontWeights } from './values';

// SECTION • Fredoka (display) and Nunito (body), the same pairing as the iOS app
// NOTE • Both are variable fonts — one file each covers every weight, served
// from this origin by next/font (no Google Fonts request at runtime)
export const fredoka = Fredoka({
	subsets: ['latin'],
	display: 'swap',
	variable: '--fredoka',
	preload: true,
});

export const nunito = Nunito({
	subsets: ['latin'],
	display: 'swap',
	variable: '--nunito',
	preload: true,
});

// NOTE • Put on <html> so --fredoka / --nunito resolve everywhere
export const fontClassNames = `${fredoka.variable} ${nunito.variable}`;

// SECTION • Raw Values
// NOTE • Re-exported so existing @theme/fonts imports keep working
export { fontFamilies, fontVariables, fontWeights } from './values';

// Exports
// ------------
export const fonts = {
	family: toVarRefs('font', fontFamilies),
	weight: fontWeights,
};
