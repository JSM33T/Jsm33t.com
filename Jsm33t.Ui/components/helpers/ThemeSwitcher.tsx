'use client';

import { useEffect, useState } from 'react';

const getStoredTheme = () => localStorage.getItem('theme');
const setStoredTheme = (theme: string) => localStorage.setItem('theme', theme);

const getPreferredTheme = () => {
	const storedTheme = getStoredTheme();
	if (storedTheme) return storedTheme;
	return 'light';
};

const setTheme = (theme: string) => {
	if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		document.documentElement.setAttribute('data-bs-theme', 'dark');
	} else {
		document.documentElement.setAttribute('data-bs-theme', theme);
	}
};

export default function ThemeSwitcher() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const preferred = getPreferredTheme();
		setTheme(preferred);
		setIsDark(preferred === 'dark');

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleSystemChange = () => {
			if (getStoredTheme() === 'auto') {
				setTheme('auto');
				setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
			}
		};

		mediaQuery.addEventListener('change', handleSystemChange);
		return () => mediaQuery.removeEventListener('change', handleSystemChange);
	}, []);

	const handleToggle = () => {
		const nextTheme = isDark ? 'light' : 'dark';
		setStoredTheme(nextTheme);
		setTheme(nextTheme);
		setIsDark(!isDark);
	};

	return (
		<input
			type="checkbox"
			className="form-check-input"
			checked={isDark}
			onChange={handleToggle}
		/>
	);
}
