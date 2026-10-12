// Imports
// ------------

import { cx } from '@utils/cx';
import { appStoreUrl, asset } from '@/config';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Component
// ------------
const StoreBadges = ({ className, isCentered = false }: I.StoreBadgesProps) => (
	<div className={cx(s.jacket, className)} data-centered={isCentered}>
		<a className={s.badge} href={appStoreUrl} aria-label='Download Peck on the App Store'>
			<picture>
				<source srcSet={asset('/app-store-badge-white.svg')} media='(prefers-color-scheme: dark)' />
				<img src={asset('/app-store-badge.svg')} alt='' width={150} height={50} />
			</picture>
		</a>

		{/* NOTE • A text chip, not a greyed-out Play badge — Google's badge rules don't allow recolouring it */}
		<span className={s.soon}>Android coming soon</span>
	</div>
);

// Exports
// ------------
StoreBadges.displayName = 'StoreBadges';
export default StoreBadges;
