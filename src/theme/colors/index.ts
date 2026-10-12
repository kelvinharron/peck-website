// Property Documentation
// ------------

// NOTE • This file exports the colors object, the colors object is used to store all the colors for the application.
// NOTE • Values mirror AppColor / PeckPalette in the iOS app
// (peck-app-ios/prototype/PeckDay/PeckDay/Sources/DesignSystem.swift) — change them there first.

// REVIEW — Usage: color: var(--ui-ink);  or  alpha(--ui-accent, 50) for opacity (SCSS)

// Imports
// ------------
import { toVarRefs } from '@theme/cssVariables';

// SECTION • Raw Color Values
// NOTE • The single source of truth — emitted as CSS custom properties on
// :root in the generated src/css/tokens.css, named --{group}-{name} (e.g. --ui-canvas).
// darkColors below are emitted as the dark-mode override of the same names.
export const baseColors = {
	// NOTE • Tackl's own parts (CookieBar, StatusPage, focus ring) read brand-*
	brand: {
		c1: '#B84D26',
		c2: '#F08A5D',
		c3: '#2E2117',
		c4: '#FFF7F0',
		c5: '#6E5E53',
	},

	ui: {
		canvas: '#FFF7F0',
		card: '#FFFFFF',
		ink: '#2E2117',
		muted: '#6E5E53',
		faint: '#7A695E',
		accent: '#F08A5D',
		'accent-text': '#A6491F',
		button: '#B84D26',
		'on-button': '#FFFFFF',
		bubble: '#FFEDE4',
		'bubble-text': '#4A3528',
		thread: '#EFE3D6',
		hairline: '#F3E9DE',
		chip: '#F6EEE5',
		'chip-text': '#5E4E42',
		'chip-border': '#D9C9BB',
		track: '#F6E1D6',
		ring: '#C85A2E',
		success: '#3F6E3C',
		shadow: '#2E2117',
	},

	macro: {
		protein: '#D45C7A',
		carbs: '#5C8C59',
		fat: '#C9A83D',
		'protein-text': '#A33A55',
		'carbs-text': '#3F6E3C',
		'fat-text': '#7F6514',
		'protein-tile': '#FDF1F4',
		'carbs-tile': '#EDF5EC',
		'fat-tile': '#FFF6DC',
	},

	meal: {
		breakfast: '#F08A5D',
		snack: '#5C8C59',
		lunch: '#C9A83D',
		dinner: '#7B6FB0',
	},

	mascot: {
		head: '#FFDA4D',
		comb: '#F45125',
		cheeks: '#F3BA81',
		beak: '#F68A2C',
		eyes: '#39291E',
		sparkle: '#FFB43C',
	},

	global: {
		white: '#ffffff',
		black: '#000000',
	},

	feedback: {
		positive: '#3F6E3C',
		negative: '#C2185B',
		warning: '#C9A83D',
	},
};

// SECTION • Dark Mode Overrides
// NOTE • Only the tokens that change — emitted under prefers-color-scheme: dark
// and html[data-theme='dark'] by scripts/build-styles.ts
export const darkColors: { [G in keyof typeof baseColors]?: Partial<(typeof baseColors)[G]> } = {
	brand: {
		c1: '#E87A4F',
		c3: '#F3ECE3',
		c4: '#211915',
		c5: '#BBAA9C',
	},

	ui: {
		canvas: '#211915',
		card: '#2F2622',
		ink: '#F3ECE3',
		muted: '#BBAA9C',
		faint: '#AE9D90',
		'accent-text': '#F4A07A',
		bubble: '#47312A',
		'bubble-text': '#F6E3D8',
		thread: '#3D322C',
		hairline: '#3A2F29',
		chip: '#3A2F29',
		'chip-text': '#D9CABD',
		'chip-border': '#5E4F45',
		track: '#5A3F35',
		ring: '#F08A5D',
		success: '#86B582',
		shadow: '#000000',
	},

	macro: {
		protein: '#E77C96',
		carbs: '#86B582',
		fat: '#E0C35E',
		'protein-text': '#F4A3B7',
		'carbs-text': '#A6D3A2',
		'fat-text': '#E9CD75',
		'protein-tile': '#41262E',
		'carbs-tile': '#26362A',
		'fat-tile': '#3B3220',
	},
};

// Exports
// ------------
// SECTION • Color Tokens
// NOTE • Each color is a plain var() reference resolved by the browser.
// Need opacity? alpha(--ui-accent, 50) in SCSS, alpha('--ui-accent', 50) in JS —
// both emit color-mix(in srgb, var(--ui-accent) 50%, transparent)
export const colors = {
	brand: toVarRefs('brand', baseColors.brand),
	ui: toVarRefs('ui', baseColors.ui),
	macro: toVarRefs('macro', baseColors.macro),
	meal: toVarRefs('meal', baseColors.meal),
	mascot: toVarRefs('mascot', baseColors.mascot),
	global: toVarRefs('global', baseColors.global),
	feedback: toVarRefs('feedback', baseColors.feedback),
};
