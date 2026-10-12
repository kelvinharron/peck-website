// Imports
// ------------
import Compare from './Compare';
import Composer from './Composer';
import Day from './Day';
import Faq from './Faq';
import Features from './Features';
import Hero from './Hero';
// Styles + Interfaces
// ------------
import type * as I from './interface';
import Letter from './Letter';
import Outro from './Outro';
import Plans from './Plans';
import Privacy from './Privacy';
import s from './styles.module.scss';

// Component
// ------------
// NOTE • The hero is sticky; everything after it is one sheet that slides up
// over it, with a grabber, like a sheet in the app
const Home = (_props: I.HomeProps) => (
	<div className={s.jacket}>
		<Hero />

		<div className={s.sheet}>
			<span className={s.grabber} aria-hidden='true' />
			<Letter />
			<Composer />
			<Day />
			<Features />
			<Compare />
			<Privacy />
			<Plans />
			<Faq />
			<Outro />
		</div>
	</div>
);

// Exports
// ------------
Home.displayName = 'Home';
export default Home;
