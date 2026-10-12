// Imports
// ------------
import { baseColors } from '@theme/colors';
import { ImageResponse } from 'next/og';

// Exports
// ------------
// NOTE • The share card behind app/(site)/opengraph-image.tsx. Give a page
// its own card by adding an opengraph-image.tsx next to its page.tsx:
//
// import { createOgImage, ogImageSize } from '@utils/ogImage';
// export const size = ogImageSize;
// export const contentType = 'image/png';
// export default async function Image() {
// 	const data = await fetchContent(GET_PROJECT);
// 	return createOgImage({ title: data?.title ?? 'Project' });
// }
//
// NOTE • Rendered by Satori, not a browser: inline styles only, flexbox
// layout, and raw colour values (CSS variables don't exist here). The font
// is Next's built-in default — pass `fonts` to ImageResponse for your own.
export const ogImageSize = { width: 1200, height: 630 };

type OgImageProps = {
	title: string;
	eyebrow?: string;
};

const { ui, mascot } = baseColors;

export const createOgImage = ({ title, eyebrow = 'Peck' }: OgImageProps) =>
	new ImageResponse(
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				width: '100%',
				height: '100%',
				padding: 80,
				color: ui.ink,
				background: `radial-gradient(70% 90% at 85% 40%, ${mascot.head}66, ${ui.canvas} 70%)`,
			}}
		>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 680 }}>
				<div style={{ display: 'flex', fontSize: 32, color: ui['accent-text'] }}>{eyebrow}</div>
				<div style={{ display: 'flex', fontSize: 84, lineHeight: 1.02, letterSpacing: -2 }}>{title}</div>
			</div>
			{/* NOTE • The flat mascot, as in public/mascot.svg */}
			<svg width='360' height='360' viewBox='0 0 1024 1024' role='img' aria-label='Peck'>
				<g fill={mascot.comb}>
					<rect x='350' y='146' width='76' height='142' rx='38' />
					<rect x='474' y='106' width='76' height='166' rx='38' />
					<rect x='598' y='146' width='76' height='142' rx='38' />
				</g>
				<path
					d='M512 190 C292 190 108 350 108 578 C108 810 232 914 512 914 C792 914 916 810 916 578 C916 350 732 190 512 190Z'
					fill={mascot.head}
				/>
				<ellipse cx='231' cy='604' rx='70' ry='39' fill={mascot.cheeks} />
				<ellipse cx='793' cy='604' rx='70' ry='39' fill={mascot.cheeks} />
				<circle cx='330' cy='530' r='61' fill={mascot.eyes} />
				<circle cx='694' cy='530' r='61' fill={mascot.eyes} />
				<circle cx='314' cy='513' r='17' fill='#fff' />
				<circle cx='678' cy='513' r='17' fill='#fff' />
				<path
					d='M438 628 Q512 615 586 628 Q603 632 593 650 L528 746 Q512 769 496 746 L431 650 Q421 632 438 628Z'
					fill={mascot.beak}
				/>
			</svg>
		</div>,
		ogImageSize
	);
