'use client';

// Imports
// ------------
import Mascot from '@parts/Mascot';
import type { PeckMood } from '@parts/Mascot/interface';
import Plate from '@parts/Plate';
import { useReveal } from '@utils/useReveal';
import Grid, { Col } from '@waffl';
import { useEffect, useRef, useState } from 'react';
import { EXAMPLES, type Example, SLOT_LABEL } from './data';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
type Phase = 'typing' | 'thinking' | 'estimate' | 'logging' | 'logged';

const TYPE_MS = 45;
const SNAP_MS = 1100;
const FLASH_MS = 260;
const PHASE_MS: Record<Exclude<Phase, 'typing'>, number> = {
	thinking: 1400,
	estimate: 2600,
	logging: 350,
	logged: 2600,
};

const MOOD: Record<Phase, PeckMood> = {
	typing: 'curious',
	thinking: 'thinking',
	estimate: 'hello',
	logging: 'pleased',
	logged: 'pleased',
};

const OTHER_WAYS = [
	{ title: 'Snap the plate', text: 'Peck spots each item on it and estimates them one by one.', tag: 'Plus' },
	{ title: 'Scan a barcode', text: 'For the packet stuff, when you want it exact.' },
	{ title: 'Your usuals', text: 'Start typing “overnight oats” and it’s already there.' },
	{ title: 'Fix it by talking', text: '“It was one slice, not two.” Peck redoes the maths.' },
];

const MAX_LOGGED = 2;

// Component
// ------------
const Composer = () => {
	// Refs
	const jacketRef = useRef<HTMLElement>(null);
	const stageRef = useRef<HTMLDivElement>(null);
	const logCountRef = useRef(0);
	const fieldRef = useRef<HTMLSpanElement>(null);

	// State
	const [index, setIndex] = useState(0);
	const [phase, setPhase] = useState<Phase>('typing');
	const [typedLength, setTypedLength] = useState(0);
	const [logged, setLogged] = useState<(Example & { id: number })[]>([]);
	const [isInView, setIsInView] = useState(false);
	const [isStill, setIsStill] = useState(false);
	const [isFlashing, setIsFlashing] = useState(false);

	// Derived
	const example = EXAMPLES[index];
	const typed = example.typed.slice(0, typedLength);
	const isCardShown = phase === 'estimate' || phase === 'logging';
	const isPhoto = example.source === 'photo';
	const hasInput = typedLength > 0;

	// Effects
	// NOTE • Reduced motion: no typing loop — show the first estimate, still
	useEffect(() => {
		const query = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (query.matches) {
			setIsStill(true);
			setTypedLength(EXAMPLES[0].typed.length);
			setPhase('estimate');
		}
	}, []);

	useEffect(() => {
		const stage = stageRef.current;
		if (!stage) return;

		const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.35 });
		observer.observe(stage);
		return () => observer.disconnect();
	}, []);

	// NOTE • One small state machine: type → think → estimate → log → next
	useEffect(() => {
		if (!isInView || isStill) return;

		if (phase === 'typing') {
			// NOTE • A photo arrives all at once: a beat, the shutter, then the shot
			if (isPhoto && typedLength === 0) {
				const timer = window.setTimeout(() => {
					setIsFlashing(true);
					setTypedLength(example.typed.length);
				}, SNAP_MS);
				return () => window.clearTimeout(timer);
			}

			if (typedLength < example.typed.length) {
				const timer = window.setTimeout(
					() => setTypedLength(length => length + 1),
					TYPE_MS + Math.random() * 40
				);
				return () => window.clearTimeout(timer);
			}

			const timer = window.setTimeout(() => setPhase('thinking'), 450);
			return () => window.clearTimeout(timer);
		}

		const next: Record<Exclude<Phase, 'typing'>, () => void> = {
			thinking: () => setPhase('estimate'),
			estimate: () => setPhase('logging'),
			logging: () => {
				logCountRef.current += 1;
				setLogged(current => [...current, { ...example, id: logCountRef.current }].slice(-MAX_LOGGED));
				setTypedLength(0);
				setPhase('logged');
			},
			logged: () => {
				setIndex(current => (current + 1) % EXAMPLES.length);
				setPhase('typing');
			},
		};

		const timer = window.setTimeout(next[phase], PHASE_MS[phase]);
		return () => window.clearTimeout(timer);
	}, [isInView, isStill, phase, typedLength, example, isPhoto]);

	useEffect(() => {
		if (!isFlashing) return;
		const timer = window.setTimeout(() => setIsFlashing(false), FLASH_MS);
		return () => window.clearTimeout(timer);
	}, [isFlashing]);

	// NOTE • Long descriptions scroll the bar so the newest words stay in view
	useEffect(() => {
		const field = fieldRef.current;
		if (field) field.scrollLeft = isPhoto || !typed ? 0 : field.scrollWidth;
	}, [typed, isPhoto]);

	useReveal(jacketRef);

	// Render
	return (
		<section ref={jacketRef} id='how' className={s.jacket} aria-labelledby='how-title'>
			<Grid $isFixed className={s.grid}>
				<Col $m='1/7' $l='1/6' className={s.copy}>
					<p className={s.eyebrow} data-reveal>
						How it works
					</p>
					<h2 id='how-title' className={s.title} data-reveal>
						Wing it. <em>Peck does the maths.</em>
					</h2>
					<p className={s.lede} data-reveal>
						No scales, no barcode hunts, no scrolling through forty search results. Describe it the way
						you&rsquo;d text a friend, or just snap the plate, and Peck&rsquo;s estimate grows right out of
						the bar.
					</p>

					<p className={s.tip} data-reveal>
						<strong>Say more, get more.</strong> &ldquo;Two eggs scrambled in butter on toasted
						granary&rdquo; beats &ldquo;eggs on toast&rdquo;. Peck weighs up every word, item by item.
					</p>

					<ul className={s.ways}>
						{OTHER_WAYS.map(way => (
							<li key={way.title} data-reveal>
								<strong>
									{way.title}
									{way.tag && <em className={s.plusTag}>{way.tag}</em>}
								</strong>
								<span>{way.text}</span>
							</li>
						))}
					</ul>
				</Col>

				<Col $m='1/7' $l='7/13'>
					<figure className={s.demo} data-reveal='late'>
						<figcaption className={s.srOnly}>
							A looping demo. Typing &ldquo;two eggs scrambled in butter on toasted granary bread&rdquo;
							into Peck gives an estimate of about 405 calories, broken down into eggs, butter and bread,
							with protein, carbs and fat. Later, a photo of a salmon dinner is snapped and Peck estimates
							each item on the plate.
						</figcaption>

						<div ref={stageRef} className={s.screen} data-phase={phase} aria-hidden='true'>
							<span className={s.flash} data-show={isFlashing} />

							<div className={s.dayHead}>
								<span>Today</span>
								<strong>Wednesday 7 October</strong>
							</div>

							<ol className={s.timeline}>
								<li className={s.peckLine}>
									<span className={s.tiny}>
										<Mascot mood='hello' />
									</span>
									<p>Morning. You slept well and feel steady. A calm start.</p>
								</li>

								{logged.map(meal => (
									<li key={meal.id} className={s.mealGroup}>
										<div className={s.meal} data-slot={meal.slot}>
											<span className={s.mealTime}>{meal.time}</span>
											{meal.source === 'photo' ? (
												<span className={s.mealPhoto}>
													<Plate />
												</span>
											) : (
												<span className={s.mealIcon} />
											)}
											<span className={s.mealText}>
												<strong>{meal.title}</strong>
												<small>{meal.detail}</small>
											</span>
											<span className={s.mealKcal}>{meal.kcal}</span>
										</div>
										<div className={s.peckLine}>
											<span className={s.tiny}>
												<Mascot mood='pleased' />
											</span>
											<p>{meal.note}</p>
										</div>
									</li>
								))}
							</ol>

							<div className={s.dock}>
								<div className={s.card} data-show={isCardShown}>
									<div className={s.cardHead}>
										{isPhoto ? (
											<span className={s.snapshot}>
												<Plate />
											</span>
										) : (
											<span className={s.cardMascot}>
												<Mascot mood='hello' />
											</span>
										)}
										<div>
											{isPhoto ? (
												<small>
													From your photo
													<em className={s.plusTag}>Plus</em>
												</small>
											) : (
												<small>&ldquo;{example.typed}&rdquo;</small>
											)}
											<strong>About {example.kcal} kcal</strong>
										</div>
									</div>

									<ul className={s.items}>
										{example.items.map(item => (
											<li key={item.name}>
												<span>{item.name}</span>
												<small>{item.amount}</small>
												<b>{item.kcal}</b>
											</li>
										))}
									</ul>

									<div className={s.macros}>
										<span data-macro='protein'>P {example.protein} g</span>
										<span data-macro='carbs'>C {example.carbs} g</span>
										<span data-macro='fat'>F {example.fat} g</span>
									</div>

									<div className={s.cardActions}>
										<span className={s.chip}>{SLOT_LABEL[example.slot]}</span>
										<span className={s.chip}>{example.time}</span>

										<span className={s.logButton} data-pressed={phase === 'logging'}>
											Log it
										</span>
									</div>
								</div>

								<div className={s.thinking} data-show={phase === 'thinking'}>
									{isPhoto ? (
										<span className={s.snapshot} data-scanning>
											<Plate />
										</span>
									) : (
										<span className={s.cardMascot}>
											<Mascot mood='thinking' />
										</span>
									)}
									<span>
										<small>{isPhoto ? 'Your photo' : <>&ldquo;{example.typed}&rdquo;</>}</small>
										<strong>
											{isPhoto ? 'Reading the plate' : 'Working it out'}
											<i>.</i>
											<i>.</i>
											<i>.</i>
										</strong>
									</span>
								</div>

								<div className={s.toast} data-show={phase === 'logged'}>
									<span className={s.tick} /> Logged to{' '}
									{SLOT_LABEL[logged.at(-1)?.slot ?? 'breakfast'].toLowerCase()}
								</div>

								<div className={s.bar}>
									<span className={s.barMascot}>
										<Mascot mood={MOOD[phase]} />
									</span>
									<span ref={fieldRef} className={s.field}>
										{isPhoto && hasInput ? (
											<span className={s.photoChip}>
												<span className={s.thumb}>
													<Plate />
												</span>
												Photo of your plate
											</span>
										) : typed ? (
											<>
												{typed}
												<i className={s.caret} />
											</>
										) : (
											<span className={s.placeholder}>What did you eat?</span>
										)}
									</span>
									{!hasInput && (
										<span className={s.camera} data-active={isPhoto && phase === 'typing'} />
									)}
									<span className={s.send} data-ready={hasInput && phase === 'typing'} />
								</div>
							</div>
						</div>
					</figure>
				</Col>
			</Grid>
		</section>
	);
};

// Exports
// ------------
Composer.displayName = 'Composer';
export default Composer;
