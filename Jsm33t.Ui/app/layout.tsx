//import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/style.css';
import './globals.css';
import '../icons/around-icons.min.css';

import BootstrapClient from '@/components/helpers/BootstrapClient';
import RouteProgress from '@/components/helpers/RouteProgress';
import SidePanel from '@/components/sections/SidePanel';
import Providers from './providers';
import NavbarWrapper from '@/components/ui/NavBarWrapper';
import ClientTokenProvider from '@/components/helpers/ClientTokenProvider';
import ModalRenderer from '@/components/helpers/ModalRenderer';
import PreloaderRemover from '@/components/helpers/PreloaderRemover';
import { PlayerProvider } from '@/context/PlayerContext';
import ChatOffcanvas from '@/components/sections/ChatOffcanvas';
import ThemeLoader from '@/components/helpers/ThemeLoader';


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

export default function RootLayout({ children }: { children: React.ReactNode }) {

	return (
		<html lang="en" data-bs-theme="dark">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap"
					rel="stylesheet"
					id="theme_custom_font"
				/>
				<style id="theme_custom_theme"></style>
			</head>
			<body className=''>
				<div className="page-loading active">
					<div className="page-loading-inner">
						<div className="page-spinner"></div>
						<span>Loading...</span>
					</div>
				</div>
				<PreloaderRemover />
				<ChatOffcanvas />
				<Providers>
					<ThemeLoader />
					<PlayerProvider>
						<SidePanel />
						<ClientTokenProvider />
						<main className=''><NavbarWrapper />{children}</main>
						<ModalRenderer />
					</PlayerProvider>
				</Providers>
				<RouteProgress />
				<BootstrapClient />

			</body>
		</html>
	);
}