'use client';

import Mascot from '@parts/Mascot';
import { useEffect, useState } from 'react';
// Imports
// ------------
import { appStoreUrl } from '@/config';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Constants
// ------------
const LINKS = [
	{ href: '#how', label: 'How it works' },
	{ href: '#compare', label: 'Why Peck' },
	{ href: '#plus', label: 'Plus' },
	{ href: '#faq', label: 'FAQ' },
];

const SCROLLED_PX = 24;

// Component
// ------------
const Header = (_props: I.HeaderProps) => {
	// State
	const [isScrolled, setIsScrolled] = useState(false);

	// Effects
	// NOTE • Lenis scrolls #page's wrapper, not the window — listen in the capture phase to catch it
	useEffect(() => {
		const handleScroll = (event: Event) => {
			const target = event.target instanceof HTMLElement ? event.target : document.documentElement;
			setIsScrolled(target.scrollTop > SCROLLED_PX);
		};

		document.addEventListener('scroll', handleScroll, { capture: true, passive: true });
		return () => document.removeEventListener('scroll', handleScroll, { capture: true });
	}, []);

	// Render
	return (
		<header className={s.jacket} data-scrolled={isScrolled}>
			<nav className={s.bar} aria-label='Main'>
				<a className={s.brand} href='#top' aria-label='Peck, back to top'>
					<span className={s.logo}>
						<Mascot mood='hello' />
					</span>
					<span>Peck</span>
				</a>

				<ul className={s.links}>
					{LINKS.map(link => (
						<li key={link.href}>
							<a href={link.href}>{link.label}</a>
						</li>
					))}
				</ul>

				<a className={s.cta} href={appStoreUrl}>
					Get Peck
				</a>
			</nav>
		</header>
	);
};

// Exports
// ------------
Header.displayName = 'Header';
export default Header;
