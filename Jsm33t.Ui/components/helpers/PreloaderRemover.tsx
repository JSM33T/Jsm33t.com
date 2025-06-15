'use client';

import { useEffect } from 'react';

export default function PreloaderRemover() {
	useEffect(() => {
		const handleLoad = () => {
			const el = document.querySelector('.page-loading');
			if (!el) return;

			setTimeout(() => {
				el.classList.remove('active');
				setTimeout(() => el.remove(), 500);
			}, 2000);
		};

		if (document.readyState === 'complete') {
			handleLoad();
		} else {
			window.addEventListener('load', handleLoad);
			return () => window.removeEventListener('load', handleLoad);
		}
	}, []);

	return null;
}
