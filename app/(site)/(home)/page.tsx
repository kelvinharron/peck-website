// Imports
// ------------
import Footer from '@parts/Footer';
import Home from '@parts/Home';
import PageTransition from '@parts/PageTransition';

// Component
// ------------
const Page = () => (
	<PageTransition>
		<Home />
		<Footer />
	</PageTransition>
);

// Exports
// ------------
export default Page;
