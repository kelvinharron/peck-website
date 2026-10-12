// Imports
// ------------
import { cx } from '@utils/cx';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Component
// ------------
// NOTE • An illustrated "photo" of a salmon dinner for the photo-logging demo —
// drawn rather than photographed so it sits with the mascot's flat style
const Plate = ({ className }: I.PlateProps) => (
	<svg className={cx(s.jacket, className)} viewBox='0 0 120 120' aria-hidden='true' focusable='false'>
		<rect width='120' height='120' fill='#6E5240' />
		<rect y='84' width='120' height='36' fill='#5E4535' />
		<ellipse cx='60' cy='63' rx='50' ry='46' fill='#F4EFE8' />
		<ellipse cx='60' cy='63' rx='39' ry='35' fill='#FFFFFF' />

		{/* Salmon fillet */}
		<path d='M38 44 C50 34 74 36 80 46 C84 54 76 62 62 62 C48 62 32 54 38 44Z' fill='#F28C5B' />
		<path
			d='M46 42 Q52 50 50 58 M56 39 Q62 48 60 61 M66 39 Q71 48 70 60'
			stroke='#FBC7A8'
			strokeWidth='2.4'
			fill='none'
			strokeLinecap='round'
		/>
		<path d='M38 44 C50 34 74 36 80 46' stroke='#C9653A' strokeWidth='2.4' fill='none' strokeLinecap='round' />

		{/* New potatoes */}
		<circle cx='44' cy='75' r='8' fill='#E9C46A' />
		<circle cx='58' cy='80' r='7.5' fill='#F0CF7A' />
		<circle cx='47' cy='88' r='6.5' fill='#E2BA5C' />
		<circle cx='42' cy='72' r='2' fill='#F7E2A6' />
		<circle cx='56' cy='77' r='2' fill='#F9E7B5' />

		{/* Green beans */}
		<g stroke='#5C8C59' strokeWidth='4' strokeLinecap='round'>
			<path d='M68 72 L88 66' />
			<path d='M70 79 L91 74' />
			<path d='M69 86 L88 83' />
		</g>
		<g stroke='#86B582' strokeWidth='1.4' strokeLinecap='round'>
			<path d='M72 70 L84 66.5' />
			<path d='M74 77 L87 74' />
		</g>

		{/* Butter */}
		<rect x='60' y='50' width='9' height='7' rx='2' fill='#FFE7A0' transform='rotate(-12 64 53)' />
	</svg>
);

// Exports
// ------------
Plate.displayName = 'Plate';
export default Plate;
