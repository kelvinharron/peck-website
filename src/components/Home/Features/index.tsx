'use client';

// Imports
// ------------
import Mascot from '@parts/Mascot';
import { pageScroller } from '@utils/pageScroller';
import { useAnimation } from '@utils/useAnimation';
import { useReveal } from '@utils/useReveal';
import Grid, { Col } from '@waffl';
import gsap from 'gsap';
import { useRef } from 'react';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
// NOTE • The Today in numbers sheet from PeckDay, mid-afternoon
const TARGET_KCAL = 2217;
const EATEN_KCAL = 1035;
const MACROS = [
	{ key: 'protein', label: 'Protein', eaten: 77, target: 130 },
	{ key: 'carbs', label: 'Carbs', eaten: 104, target: 250 },
	{ key: 'fat', label: 'Fat', eaten: 34, target: 74 },
];

const WAYS = ['Favourites', 'Search foods', 'Scan a barcode', 'Snap a photo'];
const LANGUAGES = ['English', 'Español', 'Català', 'Français', 'Português'];
const RING_RADIUS = 52;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;
const MOTION_OK = { isMotionOk: '(prefers-reduced-motion: no-preference)' };

// Component
// ------------
const Features = () => {
	// Refs
	const jacketRef = useRef<HTMLElement>(null);
	const kcalRef = useRef<HTMLElement>(null);

	// Animations
	// NOTE • The ring, bars and counter fill once, when the numbers tile arrives
	useAnimation(
		({ isMotionOk }) => {
			if (!isMotionOk) return;

			const trigger = { trigger: '[data-numbers]', scroller: pageScroller(), start: 'top 75%', once: true };
			const counter = { value: TARGET_KCAL };

			gsap.from('[data-ring]', {
				strokeDashoffset: RING_LENGTH,
				duration: 1.6,
				ease: 'expo.out',
				scrollTrigger: trigger,
			});
			gsap.from('[data-bar]', {
				scaleX: 0,
				duration: 1.4,
				stagger: 0.12,
				ease: 'expo.out',
				scrollTrigger: trigger,
			});
			gsap.to(counter, {
				value: TARGET_KCAL - EATEN_KCAL,
				duration: 1.6,
				ease: 'expo.out',
				scrollTrigger: trigger,
				onUpdate: () => {
					if (kcalRef.current)
						kcalRef.current.textContent = Math.round(counter.value).toLocaleString('en-GB');
				},
			});
		},
		{ scope: jacketRef },
		MOTION_OK
	);

	useReveal(jacketRef);

	// Render
	return (
		<section ref={jacketRef} id='features' className={s.jacket} aria-labelledby='features-title'>
			<Grid $isFixed>
				<Col $m='1/7' $l='1/10' className={s.head}>
					<p className={s.eyebrow} data-reveal>
						Why Peck
					</p>
					<h2 id='features-title' className={s.title} data-reveal>
						Everything a pal should be. <em>Nothing a nag would.</em>
					</h2>
				</Col>
			</Grid>

			<Grid $isFixed className={s.bento}>
				<Col as='article' $m='1/7' $l='1/8' className={s.tile} data-tone='bubble' data-reveal>
					<h3 className={s.tileTitle}>Words first, numbers second.</h3>
					<p className={s.tileText}>
						Peck sums up your day in a sentence. The maths is there when you want it.
					</p>
					<div className={s.quote}>
						<span className={s.quoteMascot}>
							<Mascot mood='hello' />
						</span>
						<p>A steady morning. Protein is already ahead of where you usually are by lunch.</p>
					</div>
				</Col>

				<Col as='article' $m='1/7' $l='8/13' className={s.tile} data-numbers data-reveal='late'>
					<h3 className={s.tileTitle}>Today in numbers</h3>
					<div className={s.numbers}>
						<div className={s.ring}>
							<svg viewBox='0 0 120 120' aria-hidden='true'>
								<circle cx='60' cy='60' r={RING_RADIUS} className={s.ringTrack} />
								<circle
									cx='60'
									cy='60'
									r={RING_RADIUS}
									className={s.ringFill}
									data-ring
									style={{
										strokeDasharray: RING_LENGTH,
										strokeDashoffset: RING_LENGTH * (1 - EATEN_KCAL / TARGET_KCAL),
									}}
								/>
							</svg>
							<p>
								<strong ref={kcalRef}>{(TARGET_KCAL - EATEN_KCAL).toLocaleString('en-GB')}</strong>
								<span>kcal left</span>
							</p>
						</div>

						<ul className={s.bars}>
							{MACROS.map(macro => (
								<li key={macro.key} data-macro={macro.key}>
									<span>
										{macro.label}
										<b>
											{macro.eaten} / {macro.target} g
										</b>
									</span>
									<i>
										<em
											data-bar
											style={{ '--fill': macro.eaten / macro.target } as React.CSSProperties}
										/>
									</i>
								</li>
							))}
						</ul>
					</div>
				</Col>

				<Col as='article' $m='1/4' $l='1/5' className={s.tile} data-tone='mint' data-reveal>
					<span className={s.sleepy}>
						<Mascot mood='sleepy' />
					</span>
					<h3 className={s.tileTitle}>Never nags. Never shames.</h3>
					<p className={s.tileText}>
						No streak guilt, no warning lights. Had the whole pizza? It&rsquo;s logged, and tomorrow&rsquo;s
						a fresh page.
					</p>
				</Col>

				<Col as='article' $m='4/7' $l='5/9' className={s.tile} data-reveal='late'>
					<h3 className={s.tileTitle}>Say it, snap it, scan it.</h3>
					<p className={s.tileText}>Typing is fastest. Everything else is one tap behind the +.</p>
					<ul className={s.menu}>
						{WAYS.map(way => (
							<li key={way}>{way}</li>
						))}
					</ul>
				</Col>

				<Col as='article' $m='1/7' $l='9/13' className={s.tile} data-tone='health' data-reveal>
					<h3 className={s.tileTitle}>Apple Health, built in.</h3>
					<p className={s.tileText}>
						Sleep and steps arrive on their own, so Peck never asks what it already knows. &ldquo;Up after
						7h 20m in bed&rdquo; just appears.
					</p>
					<span className={s.pill}>Up after 7h 20m in bed</span>
				</Col>

				<Col as='article' $m='1/4' $l='1/7' className={s.tile} data-reveal>
					<h3 className={s.tileTitle}>Widgets for your Home Screen.</h3>
					<p className={s.tileText}>
						What&rsquo;s left and your last meal, right on your Home Screen and Lock Screen. A Plus perk.
					</p>
					<div className={s.widget} aria-hidden='true'>
						<strong>1,182</strong>
						<span>kcal left</span>
						<small>Last: salmon and new potatoes</small>
					</div>
				</Col>

				<Col as='article' $m='4/7' $l='7/13' className={s.tile} data-tone='bubble' data-reveal='late'>
					<h3 className={s.tileTitle}>Speaks your language.</h3>
					<p className={s.tileText}>Peck chats in five languages, inside the app as well as here.</p>
					<ul className={s.langs}>
						{LANGUAGES.map(language => (
							<li key={language}>{language}</li>
						))}
					</ul>
				</Col>
			</Grid>
		</section>
	);
};

// Exports
// ------------
Features.displayName = 'Features';
export default Features;
