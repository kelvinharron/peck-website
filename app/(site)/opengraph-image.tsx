// Imports
// ------------
import { createOgImage, ogImageSize } from '@utils/ogImage';

// Image metadata
// ------------
// NOTE • The default share card for every page in the site — a page with its
// own opengraph-image.tsx overrides it (see src/utils/ogImage.tsx)
export const alt = 'Peck: calorie counting, minus the counting';
export const size = ogImageSize;
export const contentType = 'image/png';

// Image
// ------------
const Image = () => createOgImage({ title: 'Calorie counting, minus the counting.' });

// Exports
// ------------
export default Image;

// NOTE • Written to a file by the static export
export const dynamic = 'force-static';
