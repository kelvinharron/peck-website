// NOTE • ScrollTriggers created in a section's first layout pass run before
// SmoothScroll's LenisGsapBridge sets the nested wrapper as the default
// scroller, so they'd watch `window` (which never scrolls here). Pass this as
// `scroller` instead — the bridge refreshes once its scrollerProxy is live.
// See skills/animation/gsap/gsap-tackl/SKILL.md.
export const pageScroller = (): HTMLElement | Window =>
	document.querySelector<HTMLElement>('[data-page-scroller]') ?? window;
