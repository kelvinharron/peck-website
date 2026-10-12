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
const QUESTIONS = [
	{
		q: 'Do I need to weigh everything?',
		a: 'No. Describe it roughly, like “chicken salad with olive oil dressing”, or snap a photo, and Peck estimates. Weigh things when you want precision, and stay consistent the rest of the time.',
	},
	{
		q: 'What if Peck’s estimate is off?',
		a: 'Tell Peck what to change, like “it was one slice, not two”, or nudge each item with Less, More and Remove. Peck keeps your version.',
	},
	{
		q: 'Do I need an account?',
		a: 'No. There’s nothing to sign up for. Open Peck and start logging.',
	},
	{
		q: 'Where is my data kept?',
		a: 'In your own iCloud, so it follows you to a new iPhone. Progress photos stay on your device, and you can export everything as a CSV.',
	},
	{
		q: 'Is Peck free?',
		a: 'Yes. Logging is free for good. Peck Plus adds unlimited estimates from words and photos, every coaching note, no adverts and widgets.',
	},
	{
		q: 'Which languages does Peck speak?',
		a: 'English, Español, Català, Français and Português, inside the app as well as here.',
	},
	{
		q: 'Is there an Android version?',
		a: 'Not yet. iPhone comes first, and Google Play is on the way.',
	},
	{
		q: 'Is Peck medical advice?',
		a: 'No. Peck is a friendly guide for everyday eating. If you have a medical condition, are pregnant or have a history of disordered eating, please talk to a professional first.',
	},
];

// Component
// ------------
const Faq = () => {
	// Refs
	const jacketRef = useRef<HTMLElement>(null);

	// Animations
	useReveal(jacketRef);

	// Render
	return (
		<section ref={jacketRef} id='faq' className={s.jacket} aria-labelledby='faq-title'>
			<Grid $isFixed>
				<Col $m='1/7' $l='1/5' className={s.head}>
					<p className={s.eyebrow} data-reveal>
						FAQ
					</p>
					<h2 id='faq-title' className={s.title} data-reveal>
						Questions? <em>Peck&rsquo;s all ears.</em>
					</h2>
				</Col>

				<Col $m='1/7' $l='6/13' className={s.list}>
					{QUESTIONS.map(item => (
						<details key={item.q} className={s.item} data-reveal>
							<summary>
								{item.q}
								<i aria-hidden='true' />
							</summary>
							<p>{item.a}</p>
						</details>
					))}
				</Col>
			</Grid>
		</section>
	);
};

// Exports
// ------------
Faq.displayName = 'Faq';
export default Faq;
