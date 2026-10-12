// Imports
// ------------
import { asset } from '@/config';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Constants
// ------------
const POLICIES = [
	{ href: '/privacy-policy.html', label: 'English', lang: 'en' },
	{ href: '/privacy-policy-es.html', label: 'Español', lang: 'es' },
	{ href: '/privacy-policy-ca.html', label: 'Català', lang: 'ca' },
	{ href: '/privacy-policy-fr.html', label: 'Français', lang: 'fr' },
	{ href: '/privacy-policy-pt.html', label: 'Português', lang: 'pt' },
];

// Component
// ------------
const Footer = (_props: I.FooterProps) => (
	<footer className={s.jacket}>
		<div className={s.inner}>
			<nav aria-label='Privacy policy'>
				<p className={s.label}>Privacy policy</p>
				<ul className={s.links}>
					{POLICIES.map(policy => (
						<li key={policy.href}>
							<a href={asset(policy.href)} hrefLang={policy.lang}>
								{policy.label}
							</a>
						</li>
					))}
				</ul>
			</nav>

			<p className={s.legal}>
				&copy; 2026 Kelvin Harron. MyFitnessPal is a trademark of its owner. Peck isn&rsquo;t affiliated with
				it, we just think you deserve a better pal.
			</p>
		</div>
	</footer>
);

// Exports
// ------------
Footer.displayName = 'Footer';
export default Footer;
