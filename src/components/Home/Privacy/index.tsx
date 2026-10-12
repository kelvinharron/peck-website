'use client';

import { useReveal } from '@utils/useReveal';
import Grid, { Col } from '@waffl';
import { useRef } from 'react';
// Imports
// ------------
import { asset } from '@/config';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
const POINTS = [
	{ title: 'No sign-in. Ever.', text: 'No account to make, no password to forget, nothing to leak.' },
	{ title: 'Your iCloud, not ours.', text: 'Your meals and notes sync through your own iCloud. We never see them.' },
	{ title: 'Photos stay put.', text: 'Progress photos live on your iPhone and nowhere else.' },
	{ title: 'Yours to take.', text: 'Export everything as a CSV whenever you like. Delete it and it’s gone.' },
];

// Component
// ------------
const Privacy = () => {
	// Refs
	const jacketRef = useRef<HTMLElement>(null);

	// Animations
	useReveal(jacketRef);

	// Render
	return (
		<section ref={jacketRef} id='privacy' className={s.jacket} aria-labelledby='privacy-title'>
			<Grid $isFixed className={s.grid}>
				<Col $m='1/7' $l='1/6' className={s.head}>
					<p className={s.eyebrow} data-reveal>
						Privacy
					</p>
					<h2 id='privacy-title' className={s.title} data-reveal>
						What you eat is nobody&rsquo;s business <em>but yours.</em>
					</h2>
					<a className={s.link} href={asset('/privacy-policy.html')} data-reveal>
						Read the privacy policy
					</a>
				</Col>

				<Col as='ul' $m='1/7' $l='7/13' className={s.points}>
					{POINTS.map((point, index) => (
						<li key={point.title} data-reveal>
							<span className={s.number}>{index + 1}</span>
							<div>
								<h3>{point.title}</h3>
								<p>{point.text}</p>
							</div>
						</li>
					))}
				</Col>
			</Grid>
		</section>
	);
};

// Exports
// ------------
Privacy.displayName = 'Privacy';
export default Privacy;
