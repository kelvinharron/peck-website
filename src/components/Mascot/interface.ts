// Mascot Types
// ------------
// NOTE • The same moods as PeckMood in the iOS app
export type PeckMood = 'hello' | 'curious' | 'thinking' | 'pleased' | 'proud' | 'sleepy';

export interface MascotProps {
	mood?: PeckMood;
	/** Blinks now and then, like `lively` in the app. On by default; round-eyed moods only */
	isLively?: boolean;
	/** Eyes follow the pointer anywhere on the page */
	isWatching?: boolean;
	className?: string;
}
