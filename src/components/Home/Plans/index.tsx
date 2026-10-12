'use client';

// Imports
// ------------
import { useReveal } from '@utils/useReveal';
import Grid, { Col } from '@waffl';
import { useRef } from 'react';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
// NOTE • Mirrors decision 8 in peck-app-ios docs/REDESIGN_DIRECTION.md
const FREE = [
	'Full logging, every meal, forever',
	'3 estimates a day from your own words, with macros',
	'A few questions to Peck each day',
	'One full coaching note a day',
	'Ads only inside sheets, never on Today',
];

const PLUS = [
	'Unlimited estimates from words and photos',
	'Every coaching note, in full',
	'Ask Peck anything, whenever you like',
	'No ads anywhere',
	'Home Screen and Lock Screen widgets',
];

// Component
// ------------
const Plans = () => {
	// Refs
	const jacketRef = useRef<HTMLElement>(null);

	// Animations
	useReveal(jacketRef);

	// Render
	return (
		<section ref={jacketRef} id='plus' className={s.jacket} aria-labelledby='plus-title'>
			<Grid $isFixed>
				<Col $m='1/7' $l='3/11' className={s.head}>
					<p className={s.eyebrow} data-reveal>
						Free and Plus
					</p>
					<h2 id='plus-title' className={s.title} data-reveal>
						Free to peck. <em>Plus for the full flock.</em>
					</h2>
					<p className={s.lede} data-reveal>
						Peck is properly useful for free. Plus is for when you want Peck in your corner all day long.
					</p>
				</Col>

				<Col as='article' $m='1/4' $l='2/7' className={s.plan} data-reveal>
					<h3 className={s.planName}>Free</h3>
					<p className={s.planNote}>Everything you need to log and learn.</p>
					<ul className={s.list}>
						{FREE.map(item => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</Col>

				<Col as='article' $m='4/7' $l='7/12' className={s.plan} data-plus data-reveal='late'>
					<span className={s.badge}>Try it free for a week</span>
					<h3 className={s.planName}>Plus</h3>
					<p className={s.planNote}>The whole coach, all day, no limits.</p>
					<ul className={s.list}>
						{PLUS.map(item => (
							<li key={item}>{item}</li>
						))}
					</ul>
					<p className={s.small}>
						Monthly or yearly. The free week ends by itself, so there&rsquo;s no surprise.
					</p>
				</Col>
			</Grid>
		</section>
	);
};

// Exports
// ------------
Plans.displayName = 'Plans';
export default Plans;
