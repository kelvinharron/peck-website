'use client';

// Imports
// ------------
import { pageScroller } from '@utils/pageScroller';
import { useAnimation } from '@utils/useAnimation';
import gsap from 'gsap';
import type { RefObject } from 'react';

// Constants
// ------------
const MOTION_OK = { isMotionOk: '(prefers-reduced-motion: no-preference)' };

/**
 * Rises every `[data-reveal]` element inside `scope` into place as it scrolls
 * into view, in DOM order. `data-reveal='late'` waits a beat longer.
 * Reduced-motion visitors see everything in place from the start.
 */
export const useReveal = (scope: RefObject<HTMLElement | null>) => {
	useAnimation(
		({ isMotionOk }) => {
			if (!isMotionOk || !scope.current) return;

			const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope.current);

			for (const item of items) {
				gsap.from(item, {
					y: 48,
					autoAlpha: 0,
					duration: 1,
					delay: item.dataset.reveal === 'late' ? 0.15 : 0,
					ease: 'expo.out',
					scrollTrigger: { trigger: item, scroller: pageScroller(), start: 'top 88%', once: true },
				});
			}
		},
		{ scope },
		MOTION_OK
	);
};
