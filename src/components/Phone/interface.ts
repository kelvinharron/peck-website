// Phone Types
// ------------
export interface PhoneProps {
	/** Screenshot name in public/app — `{shot}-light.webp` and `{shot}-dark.webp` */
	shot: string;
	alt: string;
	className?: string;
	isEager?: boolean;
}
