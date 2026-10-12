'use client';

// Imports
// ------------
import Mascot from '@parts/Mascot';
import StoreBadges from '@parts/StoreBadges';
import { useReveal } from '@utils/useReveal';
import Grid, { Col } from '@waffl';
import { useRef } from 'react';

// Styles
// ------------
import s from './styles.module.scss';

// Component
// ------------
const Outro = () => {
	// Refs
	const jacketRef = useRef<HTMLElement>(null);

	// Animations
	useReveal(jacketRef);

	// Render
	return (
		<section ref={jacketRef} id='download' className={s.jacket} aria-labelledby='download-title'>
			<Grid $isFixed>
				<Col $m='2/6' $l='3/11' className={s.inner}>
					<div className={s.mascot} data-reveal>
						<Mascot mood='hello' isWatching />
					</div>
					<h2 id='download-title' className={s.title} data-reveal>
						One small peck <em>at a time.</em>
					</h2>
					<p className={s.lede} data-reveal>
						Free to download. No account. Your new pal is waiting.
					</p>
					<div data-reveal>
						<StoreBadges isCentered />
					</div>
				</Col>
			</Grid>
		</section>
	);
};

// Exports
// ------------
Outro.displayName = 'Outro';
export default Outro;
