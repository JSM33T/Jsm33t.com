import type { Metadata } from 'next';
import HomeTopSection from './_client/HomeTopSection';

export const metadata: Metadata = {
	title: 'Home',
	description: 'JSM33T.',
};

export default function HomePage() {
	return (
		<>
			<HomeTopSection	/>
		</>
	);
}
