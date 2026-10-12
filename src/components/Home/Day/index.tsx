'use client';

// Imports
// ------------
import Phone from '@parts/Phone';
import Grid, { Col } from '@waffl';
import { useEffect, useRef, useState } from 'react';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
const STEPS = [
	{
		shot: 'midday',
		kicker: 'Morning',
		title: 'It notices.',
		text: 'Peck reads your day as it happens and only speaks up when there’s something worth saying. Protein ahead of your usual by lunch? You’ll hear about it.',
		alt: 'Peck’s Today screen at lunchtime: “A steady morning. Protein is already ahead of where you usually are by lunch.”',
	},
	{
		shot: 'logged',
		kicker: 'Breakfast',
		title: 'It keeps up.',
		text: 'Meals land on one living timeline in the order you ate them, with Peck’s short notes tucked in between. No tabs, no forms.',
		alt: 'Eggs on toast logged to breakfast on the Today timeline, with an Undo toast.',
	},
	{
		shot: 'numbers',
		kicker: 'Any time',
		title: 'Numbers, when you want them.',
		text: 'Calories and macros are always one tap away, there whenever you want them and quiet the rest of the time.',
		alt: 'The Today in numbers sheet: 1,182 kcal left, with protein, carbs and fat bars.',
	},
	{
		shot: 'trends',
		kicker: 'This week',
		title: 'It spots the pattern.',
		text: 'Steadier than last week? Protein landing five days out of seven? Peck puts it in a sentence, with the charts underneath.',
		alt: 'The Trends sheet: “Steadier than last week. Six days logged, and protein landed on five of them.”',
	},
	{
		shot: 'evening',
		kicker: 'Evening',
		title: 'It wraps up. Kindly.',
		text: 'One gentle summary closes the day. No streaks to break, no angry red numbers, and tomorrow is a fresh page.',
		alt: 'The evening wrap-up: “That’s a wrap. A really even day.”',
	},
];

// Component
// ------------
const Day = () => {
	// Refs
	const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

	// State
	const [active, setActive] = useState(0);

	// Effects
	// NOTE • The step crossing the middle of the screen drives the pinned phone
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				for (const entry of entries) {
					if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
				}
			},
			{ rootMargin: '-45% 0px -45% 0px' }
		);

		for (const step of stepRefs.current) if (step) observer.observe(step);
		return () => observer.disconnect();
	}, []);

	// Render
	return (
		<section id='day' className={s.jacket} aria-labelledby='day-title'>
			<Grid $isFixed>
				<Col $m='1/7' $l='1/9' className={s.head}>
					<p className={s.eyebrow}>A day with Peck</p>
					<h2 id='day-title' className={s.title}>
						A coach that walks your day <em>with you.</em>
					</h2>
				</Col>
			</Grid>

			<Grid $isFixed className={s.body}>
				<Col $m='1/7' $l='1/7' as='ol' className={s.steps}>
					{STEPS.map((step, index) => (
						<li
							key={step.shot}
							ref={element => {
								stepRefs.current[index] = element;
							}}
							className={s.step}
							data-step={index}
							data-active={index === active}
						>
							<span className={s.kicker}>
								<b>{String(index + 1).padStart(2, '0')}</b> {step.kicker}
							</span>
							<h3 className={s.stepTitle}>{step.title}</h3>
							<p className={s.stepText}>{step.text}</p>
							<Phone shot={step.shot} alt={step.alt} className={s.inlinePhone} />
						</li>
					))}
				</Col>

				<Col $l='8/12' className={s.pin}>
					<div className={s.phoneStack}>
						{STEPS.map((step, index) => (
							<div
								key={step.shot}
								className={s.phoneLayer}
								data-active={index === active}
								aria-hidden={index !== active}
							>
								<Phone shot={step.shot} alt={step.alt} />
							</div>
						))}
					</div>

					<ol className={s.dots} aria-hidden='true'>
						{STEPS.map((step, index) => (
							<li key={step.shot} data-active={index === active} />
						))}
					</ol>
				</Col>
			</Grid>
		</section>
	);
};

// Exports
// ------------
Day.displayName = 'Day';
export default Day;
