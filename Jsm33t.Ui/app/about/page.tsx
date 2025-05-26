import type { Metadata } from 'next';
import AboutHeroSection from './_client/AboutHeroSection';
import AboutGallery from './_client/AboutSite';
import AboutTheSpace from './_client/AboutTheSpace';

export const metadata: Metadata = {
	title: 'About',
	description: 'Get in touch with our support or sales team.',
};


export default function AboutPage() {
	return (
		<>
			<AboutHeroSection />
			<AboutTheSpace />
			<AboutGallery />
		</>
	);
}