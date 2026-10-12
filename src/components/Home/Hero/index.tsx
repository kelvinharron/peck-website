'use client';

// Imports
// ------------
import Mascot from '@parts/Mascot';
import type { PeckMood } from '@parts/Mascot/interface';
import Plate from '@parts/Plate';
import StoreBadges from '@parts/StoreBadges';
import { pageScroller } from '@utils/pageScroller';
import { useAnimation } from '@utils/useAnimation';
import Grid, { Col } from '@waffl';
import gsap from 'gsap';
import { useRef, useState } from 'react';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
// NOTE • Things people actually type into Peck — each drifts at its own pace
// NOTE • Specific on purpose: the more people say, the better Peck's estimate
const THOUGHTS = [
	{ text: 'scrambled eggs on toasted granary', meal: 'breakfast' },
	{ text: 'oat flat white', meal: 'snack' },
	{ text: 'roast chicken thigh, basmati rice', meal: 'lunch' },
	{ text: 'one milk chocolate digestive', meal: 'snack' },
	{ text: 'snapped: salmon dinner', meal: 'dinner', isPhoto: true },
	{ text: 'Greek yogurt, blueberries, honey', meal: 'breakfast' },
];

const MOTION_OK = { isMotionOk: '(prefers-reduced-motion: no-preference)' };

// Component
// ------------
const Hero = () => {
	// Refs
	const jacketRef = useRef<HTMLElement>(null);

	// State
	const [mood, setMood] = useState<PeckMood>('hello');

	// Handlers
	const handlePoke = () => setMood(current => (current === 'proud' ? 'hello' : 'proud'));

	// Animations
	// NOTE • The hero is sticky and the page slides over it like a sheet —
	// as it does, Peck sinks back and the thoughts drift apart
	useAnimation(
		({ isMotionOk }) => {
			if (!isMotionOk) return;

			const scrub = {
				trigger: jacketRef.current,
				scroller: pageScroller(),
				start: 'top top',
				end: 'bottom top',
				scrub: true,
			};

			gsap.to('[data-hero-stage]', {
				scale: 0.82,
				yPercent: 12,
				autoAlpha: 0.2,
				ease: 'none',
				scrollTrigger: scrub,
			});
			gsap.to('[data-hero-copy]', { yPercent: -18, autoAlpha: 0, ease: 'none', scrollTrigger: scrub });
			gsap.utils.toArray<HTMLElement>('[data-thought]').forEach((thought, index) => {
				gsap.to(thought, {
					x: (index % 2 ? 1 : -1) * (80 + index * 18),
					y: -60 - index * 14,
					autoAlpha: 0,
					ease: 'none',
					scrollTrigger: scrub,
				});
			});

			gsap.from('[data-hero-in]', {
				y: 40,
				autoAlpha: 0,
				duration: 1.2,
				stagger: 0.08,
				ease: 'expo.out',
				delay: 0.1,
			});
			gsap.from('[data-hero-stage]', {
				scale: 0.6,
				autoAlpha: 0,
				duration: 1.4,
				ease: 'elastic.out(1, 0.7)',
				delay: 0.2,
			});
			gsap.from('[data-thought]', {
				scale: 0,
				autoAlpha: 0,
				duration: 0.9,
				stagger: 0.09,
				ease: 'back.out(2)',
				delay: 0.6,
			});
		},
		{ scope: jacketRef },
		MOTION_OK
	);

	// Render
	return (
		<header ref={jacketRef} id='top' className={s.jacket}>
			<Grid $isFixed className={s.grid}>
				<Col $m='1/7' $l='1/8' className={s.copy} data-hero-copy>
					<p className={s.eyebrow} data-hero-in>
						<span className={s.dot} /> Meet Peck, for iPhone
					</p>

					<h1 className={s.title} data-hero-in>
						Calorie counting, <em>minus the counting.</em>
					</h1>

					<p className={s.lede} data-hero-in>
						Tell Peck what you ate in your own words, or snap the plate. It works out the numbers, notices
						the patterns and talks you through your day. A coach, not a spreadsheet.
					</p>

					<div className={s.actions} data-hero-in>
						<StoreBadges />
					</div>
				</Col>

				<Col $m='2/6' $l='8/13' className={s.stage}>
					<div className={s.stageInner} data-hero-stage>
						<span className={s.glow} />

						<button
							type='button'
							className={s.poke}
							onClick={handlePoke}
							onPointerEnter={() => setMood(current => (current === 'proud' ? current : 'curious'))}
							onPointerLeave={() => setMood(current => (current === 'proud' ? current : 'hello'))}
							aria-label='Say hello to Peck'
						>
							<Mascot mood={mood} isWatching />
						</button>

						<ul className={s.thoughts} aria-hidden='true'>
							{THOUGHTS.map((thought, index) => (
								<li
									key={thought.text}
									className={s.thought}
									data-thought
									data-meal={thought.meal}
									style={{ '--i': index } as React.CSSProperties}
								>
									<span>
										{thought.isPhoto && (
											<i className={s.thoughtPhoto}>
												<Plate />
											</i>
										)}
										{thought.text}
									</span>
								</li>
							))}
						</ul>
					</div>
				</Col>
			</Grid>

			<a className={s.scrollCue} href='#pal'>
				<span>Scroll, there's a letter for you</span>
				<i aria-hidden='true' />
			</a>
		</header>
	);
};

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;
