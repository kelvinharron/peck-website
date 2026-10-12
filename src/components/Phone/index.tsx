// Imports
// ------------

import { cx } from '@utils/cx';
import { asset } from '@/config';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Constants
// ------------
// NOTE • PeckDay screenshots are iPhone 17 Pro captures (1206 × 2622), resized
const SHOT_WIDTH = 780;
const SHOT_HEIGHT = 1696;

// Component
// ------------
const Phone = ({ shot, alt, className, isEager = false }: I.PhoneProps) => (
	<figure className={cx(s.jacket, className)}>
		<picture className={s.screen}>
			<source srcSet={asset(`/app/${shot}-dark.webp`)} media='(prefers-color-scheme: dark)' />
			<img
				src={asset(`/app/${shot}-light.webp`)}
				alt={alt}
				width={SHOT_WIDTH}
				height={SHOT_HEIGHT}
				loading={isEager ? 'eager' : 'lazy'}
				decoding='async'
			/>
		</picture>
	</figure>
);

// Exports
// ------------
Phone.displayName = 'Phone';
export default Phone;
