'use client';

import { useEffect } from 'react';
import { PlayerUI, usePlayer } from '@/context/PlayerContext';
import { useRef } from 'react';
import ChatOffcanvas, { ChatOffcanvasRef } from './ChatOffcanvas';
import { themes } from '@/lib/themes';


const applyTheme = async (themeName: string) => {
	const selectedTheme = themes.find((t) => t.name === themeName);
	if (!selectedTheme) return;

	try {
		const res = await fetch(selectedTheme.css);
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
		fontTag.href = selectedTheme.fontLink;

		localStorage.setItem('themeid', selectedTheme.name);
	} catch (err) {
		console.error('Theme load error:', err);
	}
};

const SidePanel = () => {
	const { currentTrack } = usePlayer();
	const chatRef = useRef<ChatOffcanvasRef>(null);

	useEffect(() => {
		const savedTheme = localStorage.getItem('themeid');
		if (savedTheme) applyTheme(savedTheme);
		else applyTheme('La Lavande');
	}, []);

	return (
		<>
			<a
				className="position-fixed top-50 bg-light text-dark fw-medium border rounded-pill shadow text-decoration-none"
				href="#customizer"
				data-bs-toggle="offcanvas"
				style={{
					right: '-1.75rem',
					marginTop: '-1rem',
					padding: '.25rem .75rem',
					transform: 'rotate(-90deg)',
					fontSize: '0.8125rem',
					letterSpacing: '.075rem',
					zIndex: 1030,
				}}
			>
				<i className="ai-settings text-primary fs-base me-1 ms-n1"></i>
				&nbsp;Panel&nbsp;
			</a>

			<div
				className="offcanvas offcanvas-end"
				id="customizer"
				data-bs-scroll="true"
				data-bs-backdrop="false"
				tabIndex={-1}
			>
				<div className="offcanvas-header border-bottom">
					<h4 className="offcanvas-title">Customize theme</h4>
					<button className="btn-close" type="button" data-bs-dismiss="offcanvas" />
				</div>

				<div className="offcanvas-body">
					<div className="d-flex align-items-center mb-3">
						<i className="ai-paint-roll text-body-secondary fs-4 me-2"></i>
						<h5 className="mb-0">Themes</h5>
					</div>

					<div className="row row-cols-2 g-2 mb-5" id="theme-colors">
						{themes.map((theme, index) => (
							<figure
								className="figure"
								key={index}
								onClick={() => applyTheme(theme.name)}
								style={{ cursor: 'pointer' }}
							>
								<img
									src={theme.image}
									className="figure-img rounded-5"
									alt={`${theme.name} thumbnail`}
									width={200}
									height={200}
								/>
								<figcaption className="figure-caption text-start">{theme.name}</figcaption>
							</figure>
						))}
					</div>

					{currentTrack && (
						<div className="border-top pt-3 mt-3">
							<PlayerUI track={currentTrack} />
						</div>
					)}
				</div>
				<button
					className="btn btn-primary"
					onClick={() => chatRef.current?.openOffcanvas()}
				>
					Open Chat
				</button>
				<ChatOffcanvas ref={chatRef} />
			</div>
		</>
	);
};

export default SidePanel;
