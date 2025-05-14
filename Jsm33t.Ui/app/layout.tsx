import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/style.css';
import './globals.css';
import '../icons/around-icons.min.css';

import Navbar from '@/sections/navbar';
import BootstrapClient from '@/components/helpers/BootstrapClient';
import RouteProgress from '@/components/helpers/RouteProgress';
import SidePanel from '@/sections/SidePanel';
import Providers from './providers';
import { UserProvider } from '@/context/UserContext';
// import ChatOffcanvas from '@/sections/ChatOffcanvas';

export const metadata = {
	title: {
		default: 'Jsm33t',
		template: '%s | Jsm33t',
	},
	description: 'Welcome to JSM33T – a creative platform.',
	keywords: ['Jsm33t', 'music', 'blogs', 'code', 'design', 'art', 'web development'],
	authors: [{ name: 'Jasmeet Singh', url: 'https://jsm33t.com' }],
	creator: 'Jasmeet Singh',
	robots: 'index, follow',
	metadataBase: new URL('https://jsm33t.com'),
	openGraph: {
		title: 'Jsm33t',
		description: 'Explore music, blogs, and creative content from Jasmeet Singh.',
		url: 'https://jsm33t.com',
		siteName: 'Jsm33t',
		images: [
			{
				url: 'https://jsm33t.com/og-banner.jpg',
				width: 1200,
				height: 630,
				alt: 'Jsm33t Banner',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Jsm33t',
		description: 'Explore music, blogs, and creative content from Jasmeet Singh.',
		creator: '@jsm33t',
		images: ['https://jsm33t.com/twitter-banner.jpg'],
	},
	icons: {
		icon: '/favicon.ico',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" data-bs-theme="light">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet" id="theme_custom_font"></link>
				<style id="theme_custom_theme"></style>

			</head>
			<body>
				<RouteProgress />
				<BootstrapClient />
				<SidePanel />
				 <Providers>
					<UserProvider>
						<main className="page-wrapper">
							<Navbar />
					
							{/* <ChatOffcanvas/> */}
							{children}
						</main>
					</UserProvider>
				</Providers>
			</body>
		</html>
	);
}
