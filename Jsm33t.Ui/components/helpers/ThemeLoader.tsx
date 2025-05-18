'use client';

import { themes } from '@/lib/themes';
import { useEffect } from 'react';

const ThemeLoader = () => {
	useEffect(() => {
		const loadTheme = async () => {

			const themeName = localStorage.getItem('themeid') || 'La Lavande';
			const selected = themes.find(t => t.name === themeName);
			if (!selected) return;

			const res = await fetch(selected.css);
			const css = await res.text();

			let styleTag = document.getElementById('theme_custom_styles') as HTMLStyleElement;
			if (!styleTag) {
				styleTag = document.createElement('style');
				styleTag.id = 'theme_custom_styles';
				document.head.appendChild(styleTag);
			}
			styleTag.textContent = css;

			let fontTag = document.getElementById('theme_custom_font') as HTMLLinkElement;
			if (!fontTag) {
				fontTag = document.createElement('link');
				fontTag.id = 'theme_custom_font';
				fontTag.rel = 'stylesheet';
				document.head.appendChild(fontTag);
			}
			fontTag.href = selected.fontLink;
		};

		loadTheme();
	}, []);

	return null;
};

export default ThemeLoader;
