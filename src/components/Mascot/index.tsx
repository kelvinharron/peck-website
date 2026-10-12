'use client';

// Imports
// ------------
import { cx } from '@utils/cx';
import { useEffect, useRef, useState } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Constants
// ------------
// NOTE • Geometry is the iOS PeckMascot / design/peck-icon-v2 master, on a 1024 canvas
const EYES = [330, 694];
const EYE_Y = 530;
const MAX_LOOK = 22;
// NOTE • The app's blink: ease in 0.07s, hold, ease out 0.1s (CSS owns the easing)
const BLINK_HOLD_MS = 110;
const BLINK_GAP_MS = { min: 2800, spread: 2400 };
const DOUBLE_BLINK_CHANCE = 0.2;
const DOUBLE_BLINK_PAUSE_MS = 160;
const ROUND_EYED: I.PeckMood[] = ['hello', 'curious', 'thinking'];

const PUPIL: Record<
	'curious' | 'thinking' | 'default',
	{ dx: number; dy: number; r: number; hx: number; hy: number; hr: number }
> = {
	curious: { dx: 16, dy: -18, r: 66, hx: 20, hy: -22, hr: 20 },
	thinking: { dx: -18, dy: -22, r: 58, hx: -14, hy: -18, hr: 17 },
	default: { dx: 0, dy: 0, r: 61, hx: -16, hy: -17, hr: 17 },
};

const TILT: Partial<Record<I.PeckMood, number>> = { curious: -8, proud: 6, sleepy: 3 };

const arcPath = (baseY: number, lift: number) =>
	EYES.map(x => `M${x - 57} ${baseY} Q${x} ${baseY + lift} ${x + 57} ${baseY}`).join(' ');

const sparklePath = (cx: number, cy: number, r: number) => {
	const k = r * 0.22;
	return `M${cx} ${cy - r} Q${cx + k} ${cy - k} ${cx + r} ${cy} Q${cx + k} ${cy + k} ${cx} ${cy + r} Q${cx - k} ${cy + k} ${cx - r} ${cy} Q${cx - k} ${cy - k} ${cx} ${cy - r}Z`;
};

// Component
// ------------
const Mascot = ({ mood = 'hello', isLively = true, isWatching = false, className }: I.MascotProps) => {
	// Refs
	const svgRef = useRef<SVGSVGElement>(null);

	// State
	const [isBlinking, setIsBlinking] = useState(false);
	const [look, setLook] = useState({ x: 0, y: 0 });

	// Derived
	const isRoundEyed = ROUND_EYED.includes(mood);
	const pupil = PUPIL[mood === 'curious' || mood === 'thinking' ? mood : 'default'];
	const isSleepy = mood === 'sleepy';

	// Effects
	// NOTE • A blink every 2.8–5.2s, as in the app, now and then a double one.
	// Only round eyes blink. Unlike the app, it stays on under reduced motion —
	// a blink is tiny and non-vestibular — but snaps shut with no animation (CSS).
	useEffect(() => {
		if (!isLively || !isRoundEyed) return;

		let timer: number;
		const wait = (ms: number, then: () => void) => {
			timer = window.setTimeout(then, ms);
		};
		const blink = (then: () => void) => {
			setIsBlinking(true);
			wait(BLINK_HOLD_MS, () => {
				setIsBlinking(false);
				then();
			});
		};
		const schedule = () => {
			wait(BLINK_GAP_MS.min + Math.random() * BLINK_GAP_MS.spread, () =>
				blink(() =>
					Math.random() < DOUBLE_BLINK_CHANCE
						? wait(DOUBLE_BLINK_PAUSE_MS, () => blink(schedule))
						: schedule()
				)
			);
		};

		schedule();
		return () => {
			window.clearTimeout(timer);
			setIsBlinking(false);
		};
	}, [isLively, isRoundEyed]);

	useEffect(() => {
		if (!isWatching || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const handlePointer = (event: PointerEvent) => {
			const box = svgRef.current?.getBoundingClientRect();
			if (!box) return;

			const dx = event.clientX - (box.left + box.width / 2);
			const dy = event.clientY - (box.top + box.height * 0.52);
			const distance = Math.hypot(dx, dy) || 1;
			const reach = Math.min(1, distance / (box.width * 1.5));

			setLook({ x: (dx / distance) * MAX_LOOK * reach, y: (dy / distance) * MAX_LOOK * reach });
		};

		window.addEventListener('pointermove', handlePointer, { passive: true });
		return () => window.removeEventListener('pointermove', handlePointer);
	}, [isWatching]);

	// Render
	return (
		<svg
			ref={svgRef}
			className={cx(s.jacket, className)}
			viewBox='0 0 1024 1024'
			data-mood={mood}
			aria-hidden='true'
			focusable='false'
		>
			<g className={s.face} style={{ '--tilt': `${TILT[mood] ?? 0}deg` } as React.CSSProperties}>
				<g fill='var(--mascot-comb)'>
					<rect x='350' y='146' width='76' height='142' rx='38' />
					<rect x='474' y='106' width='76' height='166' rx='38' />
					<rect x='598' y='146' width='76' height='142' rx='38' />
				</g>
				<path
					d='M512 190 C292 190 108 350 108 578 C108 810 232 914 512 914 C792 914 916 810 916 578 C916 350 732 190 512 190Z'
					fill='var(--mascot-head)'
				/>
				<g fill='var(--mascot-cheeks)'>
					<ellipse cx='231' cy='604' rx='70' ry='39' />
					<ellipse cx='793' cy='604' rx='70' ry='39' />
				</g>

				<g
					className={s.roundEyes}
					data-open={isRoundEyed}
					data-blink={isBlinking}
					style={
						{
							'--look-x': `${look.x}px`,
							'--look-y': `${look.y}px`,
							transformOrigin: `512px ${EYE_Y + pupil.dy}px`,
						} as React.CSSProperties
					}
				>
					{EYES.map(x => (
						<g key={x}>
							<circle cx={x + pupil.dx} cy={EYE_Y + pupil.dy} r={pupil.r} fill='var(--mascot-eyes)' />
							<circle
								cx={x + pupil.dx + pupil.hx}
								cy={EYE_Y + pupil.dy + pupil.hy}
								r={pupil.hr}
								fill='#fff'
							/>
						</g>
					))}
				</g>

				<path
					className={s.arcEyes}
					data-open={!isRoundEyed}
					d={isSleepy ? arcPath(530, 50) : arcPath(548, -78)}
					stroke='var(--mascot-eyes)'
					strokeWidth={isSleepy ? 36 : 44}
					strokeLinecap='round'
					fill='none'
				/>

				<path
					d='M438 628 Q512 615 586 628 Q603 632 593 650 L528 746 Q512 769 496 746 L431 650 Q421 632 438 628Z'
					fill='var(--mascot-beak)'
				/>
			</g>

			<g className={s.sparkles} data-show={mood === 'proud'}>
				<path d={sparklePath(120, 230, 75)} fill='var(--mascot-sparkle)' />
				<path d={sparklePath(920, 330, 50)} fill='var(--ui-accent)' />
			</g>

			<g className={s.zs} data-show={isSleepy} fill='var(--ui-muted)'>
				<text x='800' y='300' fontSize='130'>
					z
				</text>
				<text x='880' y='170' fontSize='170'>
					z
				</text>
			</g>
		</svg>
	);
};

// Exports
// ------------
Mascot.displayName = 'Mascot';
export default Mascot;
