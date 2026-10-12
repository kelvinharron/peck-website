'use client';

// Imports
// ------------
import Mascot from '@parts/Mascot';
import { pageScroller } from '@utils/pageScroller';
import { useAnimation } from '@utils/useAnimation';
import Grid, { Col } from '@waffl';
import gsap from 'gsap';
import { Fragment, useRef } from 'react';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
// NOTE • Each line is a paragraph; words wrapped in *asterisks* get the accent
const LETTER = [
	'You made me weigh my rice. You made me choose between forty-seven kinds of chicken. You turned dinner into a maths test and lunch into a guilt trip.',
	"*It's not me. It's you.*",
];

const MOTION_OK = { isMotionOk: '(prefers-reduced-motion: no-preference)' };

// Helpers
// ------------
const splitWords = (line: string) => {
	let isAccent = false;

	return line.split(' ').map(raw => {
		const startsAccent = raw.startsWith('*');
		const endsAccent = raw.endsWith('*');
		if (startsAccent) isAccent = true;
		const word = { text: raw.replaceAll('*', ''), isAccent };
		if (endsAccent) isAccent = false;
		return word;
	});
};

// Component
// ------------
const Letter = () => {
	// Refs
	const jacketRef = useRef<HTMLElement>(null);

	// Animations
	// NOTE • Words ink in one by one as the letter scrolls through the middle of the screen
	useAnimation(
		({ isMotionOk }) => {
			if (!isMotionOk) return;

			gsap.fromTo(
				'[data-word]',
				{ opacity: 0.14 },
				{
					opacity: 1,
					stagger: 0.1,
					ease: 'none',
					scrollTrigger: {
						trigger: '[data-letter-body]',
						scroller: pageScroller(),
						start: 'top 75%',
						end: 'bottom 45%',
						scrub: 0.6,
					},
				}
			);

			gsap.from('[data-signoff]', {
				y: 40,
				autoAlpha: 0,
				duration: 1,
				ease: 'expo.out',
				scrollTrigger: { trigger: '[data-signoff]', scroller: pageScroller(), start: 'top 85%', once: true },
			});
		},
		{ scope: jacketRef },
		MOTION_OK
	);

	// Render
	return (
		<section ref={jacketRef} id='pal' className={s.jacket} aria-labelledby='pal-title'>
			<Grid $isFixed>
				<Col $m='1/7' $l='2/12' className={s.paper}>
					<p className={s.eyebrow}>An open letter</p>

					<h2 id='pal-title' className={s.salutation}>
						Dear MyFitnessPal,
						<br />
						<span>you ain&rsquo;t my pal.</span>
					</h2>

					<div className={s.body} data-letter-body>
						{LETTER.map(line => (
							<p key={line} className={s.line}>
								{splitWords(line).map((word, index) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: fixed copy, never reordered — position is the identity
									<Fragment key={index}>
										<span data-word data-accent={word.isAccent || undefined}>
											{word.text}
										</span>{' '}
									</Fragment>
								))}
							</p>
						))}
					</div>

					<div className={s.signoff} data-signoff>
						<div className={s.signMascot}>
							<Mascot mood='proud' />
						</div>
						<p>
							<span className={s.signName}>Signed, everyone who gave up on a food diary.</span>
							<span className={s.signNote}>So we hatched something friendlier.</span>
						</p>
					</div>
				</Col>
			</Grid>
		</section>
	);
};

// Exports
// ------------
Letter.displayName = 'Letter';
export default Letter;
