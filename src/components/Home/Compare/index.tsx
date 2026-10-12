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
// NOTE • Deliberately about "the usual food diary", not any one app's features
const ROWS = [
	{
		topic: 'Logging lunch',
		them: 'Weigh it, search it, pick one of forty chicken entries, adjust the grams.',
		peck: 'Type “roast chicken thigh, basmati, broccoli”, or snap the plate. Done.',
	},
	{
		topic: 'Getting started',
		them: 'Sign up, verify your email, untick the newsletter.',
		peck: 'No account. Open it and start.',
	},
	{
		topic: 'Tone of voice',
		them: 'Red numbers, broken streaks, “You’re over!”',
		peck: 'Gentle notes, and only when they’re worth saying.',
	},
	{
		topic: 'Adverts',
		them: 'Wherever they fit, usually right on top of your food.',
		peck: 'Never on your Today. None at all with Plus.',
	},
	{
		topic: 'Your data',
		them: 'Lives on their servers, under their account.',
		peck: 'Lives in your own iCloud. Progress photos never leave your phone.',
	},
];

// Component
// ------------
const Compare = () => {
	// Refs
	const jacketRef = useRef<HTMLElement>(null);

	// Animations
	useReveal(jacketRef);

	// Render
	return (
		<section ref={jacketRef} id='compare' className={s.jacket} aria-labelledby='compare-title'>
			<Grid $isFixed>
				<Col $m='1/7' $l='1/10' className={s.head}>
					<p className={s.eyebrow} data-reveal>
						Spot the difference
					</p>
					<h2 id='compare-title' className={s.title} data-reveal>
						Other apps call themselves your pal. <em>Peck just acts like one.</em>
					</h2>
				</Col>

				<Col $m='1/7' $l='1/13'>
					<table className={s.table}>
						<thead>
							<tr data-reveal>
								<th scope='col'>
									<span className={s.srOnly}>Topic</span>
								</th>
								<th scope='col' className={s.them}>
									The usual food diary
								</th>
								<th scope='col' className={s.peck}>
									Peck
								</th>
							</tr>
						</thead>
						<tbody>
							{ROWS.map(row => (
								<tr key={row.topic} data-reveal>
									<th scope='row'>{row.topic}</th>
									<td className={s.them}>
										<span className={s.mark} data-kind='no' aria-hidden='true' />
										{row.them}
									</td>
									<td className={s.peck}>
										<span className={s.mark} data-kind='yes' aria-hidden='true' />
										{row.peck}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</Col>
			</Grid>
		</section>
	);
};

// Exports
// ------------
Compare.displayName = 'Compare';
export default Compare;
